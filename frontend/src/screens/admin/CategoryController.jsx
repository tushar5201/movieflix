import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AdminMenu from '../../components/AdminMenu'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { toast } from 'react-toastify'

const reducer = (action, state) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, categories: action.payload }
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}
export default function CategoryController() {
    const [{ loading, error, categories }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        categories: []
    });

    const navigate = useNavigate();
    const callAdminPage = async (req, res) => {
        try {
            const res = await axios.get('/admin', { credentials: 'include' });
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

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const categories = await axios.get('/api/categories');
                dispatch({ type: 'FETCH_SUCCESS', payload: categories.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        const res = await fetch('/admin/delete-category', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (res.status === 200) {
            toast.success('Category deleted successfully.');
            window.location.reload(true)
        } else if (res.status === 401) {
            toast.error('Error in deleting.')
        }
    }

    return (
        <div className='container'>
            <Row className='container-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Categories</h1>
                    <hr />
                    {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                        <div>
                            <Link to='/dashboard/create_category' className='btn btn-primary'><i className='fa-solid fa-plus'></i></Link>{' '}
                            {categories.map((category, i) => (
                                <div key={i}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'left' }}>
                                                    <h2>{category.name}</h2>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <Link to={`/dashboard/update_category/${category._id}`} className='btn btn-primary'><i className="fa-solid fa-pen"></i></Link>{' '}
                                                    <Button className='btn btn-danger' onClick={() => handleDelete(category._id)}><i className="fa-solid fa-trash"></i></Button>{' '}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export function CreateCategory () {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/admin/create-category', {name});
            if (res.status === 200) {
                toast.success('Category added successfully.')
                navigate('/dashboard/categories')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='container m-3 p-3'>
            <Row className='conatiner-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Create Movie</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <input type="text" name='name' value={name} className='admin-input' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br /><br />
                        <Button type='submit'>Create Category</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
