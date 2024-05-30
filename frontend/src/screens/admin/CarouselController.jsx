import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import AdminMenu from '../../components/AdminMenu'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const reducer = (state, action) => {
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
            const res = await axios.get('https://movieflix-lyart.vercel.app/admin', { withCredentials: true });
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

    const [{ loading, error, carousel }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        carousel: []
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('https://movieflix-lyart.vercel.app/api/carousel');
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch('https://movieflix-lyart.vercel.app/admin/delete-carousel', {
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
                        <>
                            <Link to='/dashboard/create_carousel' style={{width: "50px"}} className='btn icons btn-primary'><i className='fa-solid fa-plus'></i></Link>{' '}
                            {
                                carousel.map((slider) => (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'left' }}>
                                                    <h2>{slider.name}</h2>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <Link to={`/dashboard/update_carousel/${slider._id}`} className='btn icons btn-primary'><i className="fa-solid fa-pen"></i></Link>{' '}
                                                    <Button className='btn icons btn-danger' onClick={() => handleDelete(slider._id)}><i className="fa-solid fa-trash"></i></Button>{' '}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))
                            }
                        </>
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

            const res = await axios.post('https://movieflix-lyart.vercel.app/admin/create-carousel', carouselData);
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
                        <input type='text' name='name' value={name} className='admin-input' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
                        <input type='file' name='image' className='admin-input' placeholder='Name' onChange={(e) => setImage(e.target.files[0])} /><br />
                        {image && (
                            <div className="text-center">
                                <img src={URL.createObjectURL(image)} alt='carousel' height={'200px'} />
                            </div>
                        )}
                        <input type='text' name='story' value={story} className='admin-input' placeholder='Story' onChange={(e) => setStory(e.target.value)} /><br />
                        <input type='text' name='link' value={link} className='admin-input' placeholder='link' onChange={(e) => setLink(e.target.value)} /><br /><br />

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
        error: "",
        carousel: []
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
                const carousel = await axios.get('https://movieflix-lyart.vercel.app/api/carousel');
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

            const res = await axios.put('https://movieflix-lyart.vercel.app/admin/update-carousel', carouselData)
            if (res.status === 200) {
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