import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import AdminMenu from '../../components/AdminMenu'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const reducer = (action, state) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, carousel: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export default function CarouselController() {

    const navigate = useNavigate()
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

    const [{ loading, error, carousel }, dispatch] = useReducer(reducer, {
        carousel: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const carousel = await axios.get('/api/carousel');
                dispatch({ type: 'FETCH_SUCCESS', payload: carousel.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch('/admin/delete-carousel', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (res.status === 200) {
            window.location.reload(true)
            toast.success('Carousel deleted successfully.')
        } else if (res.status === 500) {
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
                    <h1>Carousel</h1>
                    <hr />
                    {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                        <div>
                            <Link to='/dashboard/create_carousel' className='btn btn-primary'><i className='fa-solid fa-plus'></i></Link>{' '}
                            {
                                carousel.map((carousel, i) => (
                                    <div key={i}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <h2>{carousel.name}</h2>
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <Link to={`/dashboard/update_carousel/${carousel._id}`} className='btn btn-primary'><i className="fa-solid fa-pen"></i></Link>{' '}
                                                        <Button className='btn btn-danger' onClick={() => handleDelete(carousel._id)}><i className="fa-solid fa-trash"></i></Button>{' '}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export const CreateCarousel = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [story, setStory] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const carouselData = new FormData();
            carouselData.append('name', name);
            carouselData.append('image', image);
            carouselData.append('story', story);
            carouselData.append('link', link);

            const res = await axios.post('/admin/create-carousel', carouselData);
            if (res.status === 201) {
                toast.success('Carousel Added Successfully')
                navigate('/dashboard/carousel')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container m-3 p-3'>
            <Row className='container-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Create Carousel</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <input type='text' name='name' value={name} className='input' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
                        <input type='file' name='image' className='input' placeholder='Name' onChange={(e) => setImage(e.target.files[0])} /><br />
                        {image && (
                            <div className="text-center">
                                <img src={URL.createObjectURL(image)} alt='carousel' height={'200px'} />
                            </div>
                        )}
                        <input type='text' name='story' value={story} className='input' placeholder='Story' onChange={(e) => setStory(e.target.value)} /><br />
                        <input type='text' name='link' value={link} className='input' placeholder='link' onChange={(e) => setLink(e.target.value)} /><br /><br />

                        <Button type='submit'>Create Carousel</Button>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export const UpdateCarousel = () => {
    const [{ loading, error, carousel }, dispatch] = useReducer(reducer, {
        loading: true,
        carousel: [],
        error: ""
    })

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [link, setLink] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const carousel = await axios.get('/api/carousel');
                dispatch({ type: 'FETCH_SUCCESS', payload: carousel.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (id) => {
        try {
            const carouselData = new FormData();
            carouselData.append('name', name);
            carouselData.append('image', image);
            carouselData.append('story', story);
            carouselData.append('link', link);
            carouselData.append('id', id);

            const res = await axios.put('/admin/update-carousel', carouselData)
            if(res.status === 200) {
                toast.success('Carousel updated successfully.')
                navigate('/dashboard/carousel')
            } else if (res.status === 401) {
                toast.error('Carousel not found.')
            } else {
                toast.error('err in updating')
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <div className="container p-3 m-3">
                <Row className='container-fluid'>
                    <Col md={3}>
                        <AdminMenu />
                    </Col>
                    <Col md={9}>
                        <h1>Carousel</h1>
                        <hr />
                        {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                            <div>
                                {carousel.map((carousel) => (
                                    <div>
                                        {id === carousel._id && (
                                            <Form onSubmit={() => handleSubmit(carousel._id)}>
                                                <img src={`/admin/get-carousel-image/${carousel._id}`} alt="carousel-img" height={200} /><br /><br />

                                                <label>Image : </label>
                                                <input type="file" name='image' className='admin-input' onChange={(e) => setImage(e.target.files[0])} /><br /><br />

                                                <input type='text' defaultValue={carousel.name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='admin-input' /><br /><br />

                                                <input type='text' defaultValue={carousel.story} onChange={(e) => setStory(e.target.value)} placeholder='Story' className='admin-input' /><br /><br />
                                                <input type='text' defaultValue={carousel.link} onChange={(e) => setLink(e.target.value)} placeholder='Link' className='admin-input' /><br /><br />

                                                <Button type="submit">Update Carousel</Button>
                                            </Form>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    )
}