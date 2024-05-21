import React, { useState } from 'react'
import Header from '../components/Header'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignupScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const navigate = useNavigate();

    const [display, setDisplay] = useState('d-none')

    const sendMail = async (e) => {
        axios.post('https://movieflix-lyart.vercel.app/send-otp', { email }).then((res) => {
            // console.log(res);
            alert("Mail sent");
            setDisplay('input d-block');
    }).catch((err) => {
        console.log(err);
        alert('Mail sent failed')
    });
}

const submitHandler = async (e) => {
    e.preventDefault();

    // const res = await axios.post('/signup', { name,email, password, isAdmin });
    const res = await fetch('https://movieflix-lyart.vercel.app/sign_up', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password, isAdmin, otp })
    })
    if (res.status === 422) {
        toast.error("User already exists.")
    } else if (res.status === 201) {
        toast.success("User Created.");
        navigate('/signin');
    } else {
        toast.error("Error in creating User.")
    }

    // const res2 = await fetch('/verifyOtp', {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify({ email, otp })
    // });
    // if(res2.status===200)
}
return (
    <div>
        <Header />
        <div className="container">
            <Form className='login_form' onSubmit={submitHandler}>
                <input type='name' name='name' value={name} className='signin_input' placeholder='Name' onChange={(e) => setName(e.target.value)} required/><br />
                <input type='email' name='mail' value={email} className='signin_input' placeholder='E mail' onChange={(e) => setEmail(e.target.value)} required/><br />
                <input type='password' name='password' value={password} className='signin_input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/><br />
                <label>Is admin : </label>
                <input type='radio' name='isAdmin' id='true' value="true" onChange={(e) => setIsAdmin(e.target.value)} />True
                <input type='radio' name='isAdmin' id='false' value="false" onChange={(e) => setIsAdmin(e.target.value)} />False<br /><br />

                <Link onClick={sendMail}>Click here to Verify E Mail</Link><br />
                <input type="number" id='otp' name='otp' className={display} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' required /><br />
                <Button type='submit' className='btn btn-danger'>SIGN Up</Button>
            </Form>
        </div>
    </div>
)
}
