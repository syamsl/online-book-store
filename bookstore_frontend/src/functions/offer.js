import axios from "axios";

export const getOffers = async () =>
  await axios.get(`${process.env.REACT_APP_API}/offers`);

export const removeOffer = async (offerId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/offer/${offerId}`, {
    headers: {
      authtoken,
    },
  });

export const createCategoryOffer = async (offer, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/offer/category`,
    { offer },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const createProductOffer = async (offer, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/offer/product`,
    { offer },
    {
      headers: {
        authtoken,
      },
    }
  );

  export const getProducts = async(authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/offer/products`,
        {
            headers:{
                authtoken,
            }
        }
    )