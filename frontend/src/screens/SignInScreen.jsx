import React, { useState } from 'react';
import Header from '../components/Header'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignInScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const randomString = Math.random().toString(36).slice(8);
    const [captcha, setCaptcha] = useState(randomString);
    const [text, setText] = useState('')

    const refreshString = () => {
        setCaptcha(Math.random().toString(36).slice(8));
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            if (text === captcha) {
                const res = await axios.post('https://movieflix-lyart.vercel.app/sign_in', { email, password })
                toast.success("Signin Successful.");
                localStorage.setItem('userInfo', JSON.stringify(res));
                navigate(redirect || '/index');
            } else {
                toast.error('Invalid captcha')
            }

        } catch (error) {
            toast.error("Invalid Credentials.");
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <Form className='login_form' onSubmit={submitHandler}>
                    <input type='email' name='mail' value={email} className='signin_input' placeholder='E mail' onChange={(e) => setEmail(e.target.value)} /><br />
                    <input type='password' name='password' value={password} className='signin_input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                    <h3>Captcha : {captcha}<i className='fa-solid fa-refresh' onClick={refreshString} /></h3>
                    <input type='text' name='password' value={text} className='signin_input' placeholder='Captcha' onChange={(e) => setText(e.target.value)} /><br />

                    <Button type='submit' className='btn btn-danger'>LOG IN</Button>
                </Form>
            </div>
        </div>
    )
}
