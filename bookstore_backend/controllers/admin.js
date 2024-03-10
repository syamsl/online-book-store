const User = require("../models/user");
const Order = require("../models/order");

//orders, orderStatus

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(updated);
};

exports.getUsers = async (req, res) => {
  const users = await User.find({}).exec()
  // console.log(users);
  res.json(users)
};

exports.userManage = async (req, res) => {
  const { userId, userStatus } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { status: userStatus },
    { new: true }).exec();
  res.json(user)
}

exports.weeklyReport = async (req, res) => {
  const weeklyReport = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: 'Cancelled' },
        createdAt: {
          $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        }
      }
    },
      {
        $lookup: {
        from: 'users',
        localField: 'orderedBy',
        foreignField: '_id',
        as: 'user',
      }
      },
  ])

  // console.log(weeklyReport);
  res.json(weeklyReport);
};

exports.monthlyReport = async (req, res) => {
  const monthlyReport = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: 'Cancelled' },
        createdAt: {
          $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000),
        },
      },
    },
    {
      $lookup: {
      from: 'users',
      localField: 'orderedBy',
      foreignField: '_id',
      as: 'user',
    }
    },
  ]);
  res.json(monthlyReport);
};

exports.yearlyReport = async (req, res) => {
  const yearlyReport = await Order.aggregate([
    {
      $match: {
        orderStatus: { $ne: 'Cancelled' },
        createdAt: {
          $gte: new Date(new Date() - 365 * 60 * 60 * 24 * 1000),
        },
      },
    },
    {
      $lookup: {
      from: 'users',
      localField: 'orderedBy',
      foreignField: '_id',
      as: 'user',
    }
    },
  ]);
  res.json(yearlyReport);
}

exports.customReport = async (req, res) => {
  const { startDate, endDate } = req.params

  const salesData = await Order.aggregate([
    {
      $match: {
        status: { $ne: 'Cancelled' },
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $lookup: {
      from: 'users',
      localField: 'orderedBy',
      foreignField: '_id',
      as: 'user',
    }
    },
  ])
  res.json(salesData)
}
