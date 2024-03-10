import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    { headers: { authtoken } }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: { authtoken },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/cart`,
    {},
    {
      headers: { authtoken },
    }
  );

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    { headers: { authtoken } }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    { headers: { authtoken } }
  );

export const createOrder = async (stripeResponse, authtoken, deliverAddress) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse, deliverAddress },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders `, {
    headers: { authtoken },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist `, {
    headers: { authtoken },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId} `,
    {},
    {
      headers: { authtoken },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist `,
    { productId },
    {
      headers: { authtoken },
    }
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse,
  deliverAddress
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD, deliverAddress },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const createPaypalOrderForUser = async (
    authtoken,
    paymentId,
    couponTrueOrFalse,
    deliverAddress
  ) =>
    await axios.post(
      `${process.env.REACT_APP_API}/user/paypal-order`,
      { couponApplied: couponTrueOrFalse, paymentId, deliverAddress},
      {
        headers: {
          authtoken,
        },
      }
    );
  

export const addUserImage = async (authtoken, image) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/imageupload`,
    { image },
    {
      headers: {
        authtoken,
      },
    }
  );

export const deleteUserImage = async (authtoken, image) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/imageupload`,
    { image },
    {
      headers: {
        authtoken,
      },
    }
  )


export const getUserDetails = async (authtoken) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/details`,
    {
      headers: {
        authtoken,
      }
    }
  )

export const editUserDetails = async (authtoken, name, mobile, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/details`,
    { name, mobile, address },
    {
      headers: {
        authtoken,
      }
    }
  )

export const deleteUserAddress = async (authtoken, id) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/delete-address`,
    { id },
    {
      headers: {
        authtoken,
      }
    }

  )

  export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
