import axios from 'axios';

export const getUserCount = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/dashboard-users`, {
        headers: {
            authtoken,
        }
    });

export const getProductSold = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/dashboard-sold`, {
        headers: {
            authtoken,
        }
    });

export const getOrderCount = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/dashboard-orders`, {
        headers: {
            authtoken,
        }
    })

export const getTotalRevenue = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/dashboard-revenue`, {
        headers: {
            authtoken,
        }
    })

export const weekOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/dashboard-weekorders`, {
        headers: {
            authtoken,
        }
    })

export const paymentMethods = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/dashboard-payment`, {
        headers: {
            authtoken,
        }
    })


export const getWeekSales = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/admin/weekly-report`,
        {
            headers: {
                authtoken,
            },
        }
    )

export const getMonthSales = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/admin/monthly-report`,
        {
            headers: {
                authtoken,
            },
        }
    )

export const getYearSales = async (authtoken) =>
    await axios.get(
        `${process.env.REACT_APP_API}/admin/yearly-report`,
        {
            headers: {
                authtoken,
            },
        }
    )

export const getCustomSales = async (authtoken,startDate,endDate) =>
    await axios.get(
        `${process.env.REACT_APP_API}/admin/custom-report/${startDate}/${endDate}`,
        {
            headers: {
                authtoken,
            },
        }
    )
