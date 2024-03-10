import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUsers = async (authtoken) =>
  await axios.get(
    `${process.env.REACT_APP_API}/admin/get-users`,
    {
      headers: {
        authtoken,
      },
    }

  )

export const userManage = async (authtoken, userId, userStatus) =>
  await axios.post(
    `${process.env.REACT_APP_API}/admin/user-manage`,
    { userId, userStatus },
    {
      headers: {
        authtoken,
      },
    }
  )
