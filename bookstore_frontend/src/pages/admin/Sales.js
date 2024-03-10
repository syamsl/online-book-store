import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import {  getWeekSales, getMonthSales, getYearSales, getCustomSales } from "../../functions/dashboard"
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesReportPdf from "../../components/order/SalesReportPdf";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";




const Sales = () => {
    const [report, setReport] = useState("")
    const [loading, setLoading] = useState(true)
    const [salesReport, setSalesReport] = useState(
        { week: [], month: [], year: [], custom: [] }
    )
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [optionData, setOptionData] = useState([])


    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadSales();
    }, [report, startDate, endDate])


    const optionHandler = (e) => {
        setReport(e.target.value)
    }

    const loadSales = () => {
        if (report === "week") {

            // console.log("This is Week")

            getWeekSales(user.token)
                .then(res => {
                    // console.log(res)
                    setSalesReport({ ...salesReport, week: res.data })
                    // console.log(salesReport)
                    setOptionData(res.data)
                })
        }

        if (report === "month") {
            //  console.log("This is Month")
            getMonthSales(user.token)
                .then(res => {
                    // console.log(res)
                    setSalesReport({ ...salesReport, month: res.data })
                    setOptionData(res.data)
                })
        }

        if (report === "year") {
            // console.log("This is Year")
            getYearSales(user.token)
                .then(res => {
                    // console.log(res)
                    setSalesReport({ ...salesReport, year: res.data })
                    setOptionData(res.data)
                })
        }

        if (startDate !== "" && endDate !== "") {
            // console.log("This is custom")
            getCustomSales(user.token, startDate, endDate)
                .then(res => {
                    // console.log(res)
                    setSalesReport({ ...salesReport, custom: res.data })
                    setOptionData(res.data)
                })
        }
    }

    const showDownloadLink = (salesReport) => {

        if (report == "week") {
            // console.log(salesReport.week)
            if (salesReport.week.length > 0) {
                return (
                    <PDFDownloadLink
                        document={<SalesReportPdf salesReport={salesReport.week} />}
                        fileName="sales_report.pdf"
                        className="btn btn-outline-info"
                    >
                        Download Report
                    </PDFDownloadLink>)
            }
        }

        if (report == "month") {
            if (salesReport.month.length > 0) {
                return (
                    <PDFDownloadLink
                        document={<SalesReportPdf salesReport={salesReport.month} />}
                        fileName="sales_report.pdf"
                        className="btn btn-outline-info"
                    >
                        Download Report
                    </PDFDownloadLink>)
            }
        }

        if (report == "year") {
            if (salesReport.year.length > 0) {
                return (
                    <PDFDownloadLink
                        document={<SalesReportPdf salesReport={salesReport.year} />}
                        fileName="sales_report.pdf"
                        className="btn btn-outline-info"
                    >
                        Download Report
                    </PDFDownloadLink>)
            }
        }

        if (report == "custom") {
            if (salesReport.custom.length > 0) {
                return (
                    <PDFDownloadLink
                        document={<SalesReportPdf salesReport={salesReport.custom} />}
                        fileName="sales_report.pdf"
                        className="btn btn-outline-info"
                    >
                        Download Report
                    </PDFDownloadLink>)
            }
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row" >
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className=" col-md-10 text-center">
                    <h2 className="shaw text-secondary mt-3">Sales</h2>
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className=" col-md-2  m-2  p-4" style={{ borderRadius: "10px" }}>
                                    <span className="textlg text-secondary"><b>Sales Report</b></span>
                                    <br />
                                    <span>
                                        <select className="text-dark grad-input" onChange={optionHandler}>
                                            <option >Select Report</option>
                                            <option value="custom">Custom</option>
                                            <option value="week">Weekly</option>
                                            <option value="month" >Monthly</option>
                                            <option value="year" >Yearly</option>
                                        </select>
                                        {report == "custom" ?
                                            <>
                                                <div>
                                                    <label>From</label>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        className="text-dark grad-input"
                                                        maxDate={new Date(Date.now())}
                                                    />
                                                    <label>To</label>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        className="text-dark grad-input"
                                                        minDate={startDate}
                                                        maxDate={new Date(Date.now())}
                                                    />
                                                </div>
                                            </>
                                            : null}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-dark">Sales</h4>

                                    <div className="row d-flex justify-content-center">
                                        {showDownloadLink(salesReport)}
                                    </div>
                                    <div className="table-responsive-sm">
                                    <table className="table table-sm table-bordered table-hover">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Price</th>
                                                <th>Payment Method</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {optionData && optionData.map((order, i) => (
                                                <tr key={i}>
                                                    <td>{order._id}</td>
                                                    <td>{order.user[0].email}</td>
                                                    <td>{new Date(order.createdAt).toISOString().split('T')[0]}</td>
                                                    <td>{order.paymentIntent.amount}</td>
                                                    <td>{order.paymentIntent.payment_method_types[0]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sales;
