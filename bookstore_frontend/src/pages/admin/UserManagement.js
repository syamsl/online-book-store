import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getUsers, userManage } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false)
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUsers();
    }, [status]);

    const loadUsers = () => {
        getUsers(user.token)
            .then((res) => {
                // console.log('loadusers',res)
                setUsers(res.data);
                // console.log(users)
            })
            .catch((err) => {
                console.log("LOAD ERR--->", err)
            })
    }

    const handleChangeStatus = (userId, userStatus) => {
        userManage(user.token, userId, userStatus)
            .then((res) => {
                console.log("BLOCK RES --->", res)
            })
            .catch((err) => {
                console.log("BLOCK ERR--->", err)
            })
            toast.info("Status changed");
           setStatus(!status)

    }


    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <div className="mt-4"><h2 className="text-secondary text-center shaw">User Management</h2>
                        <div className="">
                            <div className="m-4 text-center">
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">
                                                Name
                                            </th>
                                            <th scope="col">
                                                Email
                                            </th>
                                            <th scope="col">
                                                Mobile
                                            </th>
                                            <th scope="col">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {u.name}
                                                </td>
                                                <td>{u.email}</td>
                                                <td>{u.mobile}</td>
                                                <td>{u.status} - {(u.status !== "active") ? (<button className="btn btn-sm btn-raised grad-button text-success" onClick={() => { handleChangeStatus(u._id, "active") }}>Unblock</button>) : (<button className="btn btn-sm btn-raised grad-button text-danger" onClick={() => { handleChangeStatus(u._id, "blocked") }}>Block</button>)}</td>
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
    );
};
export default UserManagement;
