import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../../components/order/Orders";
import { Link } from "react-router-dom";
import { getOffers,removeOffer } from "../../../functions/offer";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd';

const OfferManagement = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state)=>({...state}))


    useEffect(() =>{
      loadOffers();
    },[])

    const loadOffers = () =>{
      getOffers()
      .then((res)=>{
        console.log("OFFER LIST--->", res)
        setOffers(res.data);
      })
    }

    const handleRemove = (offerId) =>{
      if (window.confirm("Delete?")) {
        setLoading(true);
        removeOffer(offerId, user.token)
          .then((res) => {
            loadOffers();
            setLoading(false);
            toast.info(`Offer  deleted`);
          })
          .catch((err) => console.log(err));
      }
    }


  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className=" col-md-10 text-center">
               <h2 className="shaw text-secondary mt-3 mb-4">Offer Management - <Link to="/admin/create-product-offer" className="btn btn-raised grad-button text-white">Create Product Offer</Link>  <Link to="/admin/create-category-offer" className="btn btn-raised grad-button text-white">Create Category  Offer</Link></h2>
               <div>
                 
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="text-center" scope="col">
                  Offer Name
                </th>
                <th className="text-center" scope="col">
                  Offer Type
                </th>
                <th className="text-center" scope="col">
                  Offer Category/Product
                </th>
                <th className="text-center" scope="col">
                  Expiry
                </th>
                <th className="text-center" scope="col">
                  Discount
                </th>
                <th className="text-center" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            {/* {JSON.stringify(coupons)} */}
            <tbody>
              {offers.map((f) => (
                <tr key={f._id}>
                  <td className="text-center">{f.name}</td>
                  <td className="text-center">{f.offerType}</td>
                  <td className="text-center">{f.offerDetail}</td>
                  <td className="text-center">
                    {new Date(f.expiry).toLocaleDateString()}
                  </td>
                  <td className="text-center">{f.discount}%</td>
                  <td className="text-center">
                    <DeleteOutlined
                      onClick={() => handleRemove(f._id)}
                      className="text-danger btn-lg pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
               </div>
        </div>
      
      </div>
    </div>
  );
};
export default OfferManagement;
