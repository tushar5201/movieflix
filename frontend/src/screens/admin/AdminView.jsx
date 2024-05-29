import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-toastify';

export default function AdminView() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState("");

    const logoutHandler = async () => {
        try {
            const logout = await axios.get("https://movieflix-lyart.vercel.app/logout", { withCredentials: true });
            if(logout.status === 200) {
                localStorage.removeItem('userInfo');
                navigate("/signin")
                toast.success("Logout Successfully.")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const callAdminPage = async () => {
        try {
            const res = await axios.get('https://movieflix-lyart.vercel.app/admin', { withCredentials: true });
            const data = await res.data;
            setUserData(data);
            if (!res.status === 200) {
                const err = new Error(res.err)
                throw err;
            }
        } catch (err) {
            console.log(err);
            navigate('/signin')
        }
    }
    useEffect(() => {
        callAdminPage();
    })

    return (
        <div className='container'>
            <div>
                <p><Link to='/signup'>Create Account</Link></p>
                <p onClick={logoutHandler}>Logout Out</p>
            </div>
            <Row className='container-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <Card style={{ backgroundColor: "#000", width: "90%" }}>
                        <h1>Welcome {userData.name}</h1>
                        <h1>Email: {userData.email}</h1>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
