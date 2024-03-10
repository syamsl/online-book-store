import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="mt-4"><h2 className="text-secondary text-center shaw">Orders</h2>
          <h4 className=" d-flex justify-content-center">
            <div className="">
              <div className="m-4">
             
              </div>
            </div>
            
            {/* {JSON.stringify(orders)} */}
            <div className="text-center">
              <div>
              <Orders orders={orders} handleStatusChange={handleStatusChange} />
              </div>
            </div>
            
          </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderManagement;
