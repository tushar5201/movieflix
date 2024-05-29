import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AdminMenu from '../../components/AdminMenu';

export default function AdminView() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState("");

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
                <p>Log Out</p>
            </div>
            <Row className='container-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <Card style={{backgroundColor:"#000"}}>
                        <h1>Welcome {userData.name}</h1>
                        <h1>Email: {userData.email}</h1>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
