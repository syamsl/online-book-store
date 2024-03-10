import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import BarChart from "../../components/charts/Bar"
import PieChart from "../../components/charts/PieChart"
import { getUserCount, getProductSold, getOrderCount, getTotalRevenue, weekOrders, paymentMethods, getWeekSales, getMonthSales, getYearSales, getCustomSales } from "../../functions/dashboard"
import { useSelector } from 'react-redux'


const AdminDashboard = () => {

	const [users, setUsers] = useState("")
	const [products, setProducts] = useState("")
	const [orders, setOrders] = useState("")
	const [revenue, setRevenue] = useState("")
	const [weekOrderData, setWeekOrderData] = useState([])
	const [paymentData, setPaymentData] = useState([])
	const [loading, setLoading] = useState(true)

	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		loadData();
	}, [])

	const loadData = () => {
		getUserCount(user.token)
			.then(res => {
				// console.log(res)
				setUsers(res.data)
			})
			.catch((err) => console.log(err))

		getProductSold(user.token)
			.then(res => {
				// console.log(res)
				setProducts(res.data)
			})
			.catch((err) => console.log(err))

		getOrderCount(user.token)
			.then(res => {
				// console.log(res)
				setOrders(res.data[0].count)
			})
			.catch((err) => console.log(err))

		getTotalRevenue(user.token)
			.then(res => {
				// console.log(res)
				setRevenue(res.data[0].totalPrice)
			})
			.catch((err) => console.log(err))

		weekOrders(user.token)
			.then(res => {
				// console.log("Res from back--->",res.data);
				setWeekOrderData(res.data)
				// console.log(weekOrderData)
			})
			.catch((err) => console.log(err))

		paymentMethods(user.token)
			.then(res => {
				setPaymentData(res.data)
			})
			.catch((err) => console.log(err))

	}

	return (
		<div className="container-fluid mt-5">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className=" col-md-10 text-center">
					<h2 className="shaw text-secondary mt-3">AdminDashboard</h2>

					<div className="row d-flex justify-content-center">

						<div className=" shadowCom col-md-2 m-2 p-4" style={{ borderRadius: "10px" }}>
							<span className="textlg text-secondary"><b>Users</b></span>
							<br />
							<span>{users}</span>
						</div>

						<div className=" shadowCom  col-md-2  m-2 p-4" style={{ borderRadius: "10px" }}>
							<span className="textlg text-secondary"><b>Sold</b></span>
							<br />
							<span>{products}</span>
						</div>

						<div className=" shadowCom col-md-2 m-2  p-4" style={{ borderRadius: "10px" }}>
							<span className="textlg text-secondary"><b>Orders</b></span>
							<br />
							<span>{orders}</span>
						</div>

						<div className=" shadowCom col-md-2  m-2  p-4" style={{ borderRadius: "10px" }}>
							<span className="textlg text-secondary"><b>Revenue</b></span>
							<br />
							<span>Rs. {revenue}</span>
						</div>

					</div>



					<div className="row">
						<div className="col-md-6 p-5">
							<h4 className="text-dark">Week Revenue</h4>
							<BarChart weekOrderData={weekOrderData} />
						</div>

						<div className="col-md-6 p-5">
							<h4 className="text-dark">Payment methods</h4>
							<PieChart paymentData={paymentData} />
						</div>
					</div>
					<div className="rowd-flex justify-content-center">
						<div className="col-md-6">
							{/* <h4 className="text-dark">Blah blah</h4> */}
							{/* <LineChart weekOrderData={weekOrderData} /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
