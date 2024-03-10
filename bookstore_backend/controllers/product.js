const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("offer")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("offer")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

//  WITHOUT PAGINATION
// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

//  WITH PAGINATION
exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("offer")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({})
    .estimatedDocumentCount()
    .populate("offer")
    .exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  //who is updating?
  //check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  //if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("RATING ADDED AT BACKEND--->", ratingAdded);
    res.json(ratingAdded);
  } else {
    //if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("RATING UPDATED AT BACKEND--->", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("offer")
    .populate("subs")
    // .populate("postedBy")
    .exec();

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  if (query == '') {
    let products = await Product.find({})
      .populate("category")
      .populate("offer")
      .populate("subs")
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(products)
  } else {
    const products = await Product.find({ $text: { $search: query } })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      // .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  }

};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      // .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    console.log("ERROR --->", err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      // .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
};

//3.33 floor 3
const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        // description: "$description",
        // averageRating:"$averageRating",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        // .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleAuthor = async (req, res, author) => {
  const products = await Product.find({ author })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, shipping, author, brand } =
    req.body;
  try {
    if (query || query == '') {
      // console.log("QUERY--->", query);
      await handleQuery(req, res, query);
      return
    }


    if (price !== undefined) {
      // console.log("PRICE--->", price);
      await handlePrice(req, res, price);
      return
    }

    if (category) {
      // console.log("category --->", category);
      await handleCategory(req, res, category);
      return
    }

    if (stars) {
      // console.log("stars---> ", stars);
      await handleStar(req, res, stars);
      return
    }

    if (sub) {
      // console.log("sub ---> ", sub);
      await handleSub(req, res, sub);
      return
    }

    if (shipping) {
      // console.log("shipping ---> ", shipping);
      await handleShipping(req, res, shipping);
      reurn
    }

    // if (color) {
    //   // console.log("color ---> ", color);
    //   await handleAuthor(req, res, color);
    // }

    if (author) {
      // console.log("color ---> ", color);
      await handleAuthor(req, res, author);
    }

    if (brand) {
      // console.log("brand ---> ", brand);
      await handleBrand(req, res, brand);
    }
  } catch (err) {
    res.status(400).send(err);
  }

};
