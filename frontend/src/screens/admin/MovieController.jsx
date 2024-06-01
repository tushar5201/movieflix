import React, { useEffect, useReducer, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { toast } from 'react-toastify'
import { getError } from '../../utils'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, movies: action.payload }
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

const reducer1 = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, categories: action.payload };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function MovieController() {
    const [{ loading, error, movies }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        movies: []
    });

    const navigate = useNavigate();
    const callAdminPage = async (req, res) => {
        try {
            const res = await axios.get('https://movieflix-lyart.vercel.app/admin', { withCredentials: true });
            if (!res.status === 200) {
                navigate('/signin')
                alert('Unauthorized User')
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
                const movies = await axios.get('https://movieflix-lyart.vercel.app/api/movies');
                dispatch({ type: 'FETCH_SUCCESS', payload: movies.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        const res = await fetch('https://movieflix-lyart.vercel.app/admin/delete-movie', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (res.status === 200) {
            toast.success('Movie deleted successfully.');
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
                    <h1>Movies</h1>
                    <hr />
                    {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                        <div>
                            <Link to='/dashboard/create_movie' className='btn btn-primary'><i className='fa-solid fa-plus'></i></Link>{' '}
                            {movies.slice(0).reverse().map((movie, i) => (
                                <div key={i}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'left' }}>
                                                    <h2>{movie.name}</h2>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <Link to={`/dashboard/update_movie/${movie._id}`} className='btn btn-primary'><i className="fa-solid fa-pen"></i></Link>{' '}
                                                    <Button className='btn btn-danger' onClick={() => handleDelete(movie._id)}><i className="fa-solid fa-trash"></i></Button>{' '}
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

export function CreateMovie() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [story, setStory] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [release, setRelease] = useState('');
    const [distributor, setDistributor] = useState('');
    const [rated, setRated] = useState('');
    const [duration, setDuration] = useState('');
    const [genre, setGenre] = useState('');
    const [imdb, setImdb] = useState('');
    const [year, setYear] = useState('');
    const [category, setCategory] = useState('');
    const [tmdb, setTmdb] = useState('');

    const [uploaded, setUploaded] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const movieData = new FormData();
            movieData.append('tmdb', tmdb);
            movieData.append('name', name);
            movieData.append('image', image);
            movieData.append('story', story);
            movieData.append('cast', cast);
            movieData.append('director', director);
            movieData.append('release', release);
            movieData.append('distributor', distributor);
            movieData.append('rated', rated);
            movieData.append('duration', duration);
            movieData.append('genre', genre);
            movieData.append('imdb', imdb);
            movieData.append('year', year);
            movieData.append('category', category);

            const res = await axios.post('https://movieflix-lyart.vercel.app/admin/create-movie', movieData, {
                onUploadProgress: (data) => {
                    setUploaded(Math.round((data.loaded / data.total) * 100))
                }
            });
            if (res.status === 200) {
                toast.success('Movie added successfully.')
                navigate('/dashboard/movies')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const callAdminPage = async (req, res) => {
        try {
            const res = await axios.get('https://movieflix-lyart.vercel.app/admin', { withCredentials: true });
            if (!res.status === 200) {
                navigate('/signin')
                alert('Unauthorized User')
            }
        } catch (err) {
            console.log(err);
            navigate('/signin')
        }
    }
    useEffect(() => {
        callAdminPage();
    })

    const [{ categories }, dispatch1] = useReducer((reducer1), {
        categories: []
    })

    useEffect(() => {
        const fetchCategories = async () => {
            dispatch1({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('https://movieflix-lyart.vercel.app/api/categories');
                dispatch1({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch1({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchCategories();
    }, [])

    return (
        <div className='container m-3 p-3'>
            <Row className='conatiner-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Create Movie</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <input type="text" name='name' value={name} className='admin-input' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
                        <input type="text" name='image' value={image} className='admin-input' placeholder='Image' onChange={(e) => setImage(e.target.value)} /><br />
                        {/* {image && (
                            <div className="text-center">
                                <img src={URL.createObjectURL(image)} alt='carousel' height={'200px'} />
                            </div>
                        )} */}
                        <input type="text" name='story' value={story} className='admin-input' placeholder='Story' onChange={(e) => setStory(e.target.value)} /><br />
                        <input type="text" name='cast' value={cast} className='admin-input' placeholder='Cast' onChange={(e) => setCast(e.target.value)} /><br />
                        <input type="text" name='director' value={director} className='admin-input' placeholder='Director' onChange={(e) => setDirector(e.target.value)} /><br />
                        <input type="text" name='release' value={release} className='admin-input' placeholder='Release' onChange={(e) => setRelease(e.target.value)} /><br />
                        <input type="text" name='distributor' value={distributor} className='admin-input' placeholder='Distributor' onChange={(e) => setDistributor(e.target.value)} /><br />
                        <input type="text" name='rated' value={rated} className='admin-input' placeholder='Rated' onChange={(e) => setRated(e.target.value)} /><br />
                        <input type="text" name='duration' value={duration} className='admin-input' placeholder='Duration' onChange={(e) => setDuration(e.target.value)} /><br />
                        <input type="text" name='genre' value={genre} className='admin-input' placeholder='Genre' onChange={(e) => setGenre(e.target.value)} /><br />
                        <input type="text" name='imdb' value={imdb} className='admin-input' placeholder='Imdb' onChange={(e) => setImdb(e.target.value)} /><br />
                        <input type="text" name='year' value={year} className='admin-input' placeholder='Year' onChange={(e) => setYear(e.target.value)} /><br />
                        <input type="text" name='tmdb' value={tmdb} className='admin-input' placeholder='TMDB' onChange={(e) => setTmdb(e.target.value)} /><br />

                        <select onChange={(e) => setCategory(e.target.selectedOptions[0].innerText)} className='admin-input'>
                            {
                                categories.map((cat) => (
                                    <option value={cat.name}>{cat.name}</option>
                                ))
                            }

                        </select>

                        {uploaded && (
                            <div className="progress mt-2">
                                <div className="progress-bar" aria-valuenow={uploaded} aria-valuemin='0' aria-valuemax='100' style={{ width: `${uploaded}%` }}>{`${uploaded}%`}</div>
                            </div>
                        )}
                        <Button type='submit'>Create Movie</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export function UpdateMovie() {

    const [{ loading, error, movies }, dispatch] = useReducer((reducer), {
        loading: true,
        error: "",
        movies: []
    })

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [slug, setSlug] = useState('');
    const [story, setStory] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [release, setRelease] = useState('');
    const [distributor, setDistributor] = useState('');
    const [rated, setRated] = useState('');
    const [duration, setDuration] = useState('');
    const [genre, setGenre] = useState('');
    const [imdb, setImdb] = useState('');
    const [year, setYear] = useState('');
    const [category, setCategory] = useState('');
    const [tmdb, setTmdb] = useState('');

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const movieData = new FormData();
            movieData.append('id', id)
            movieData.append('tmdb', tmdb);
            movieData.append('name', name);
            movieData.append('image', image);
            movieData.append('slug', slug);
            movieData.append('story', story);
            movieData.append('cast', cast);
            movieData.append('director', director);
            movieData.append('release', release);
            movieData.append('distributor', distributor);
            movieData.append('rated', rated);
            movieData.append('duration', duration);
            movieData.append('genre', genre);
            movieData.append('imdb', imdb);
            movieData.append('year', year);
            movieData.append('category', category);

            const res = await axios.put('https://movieflix-lyart.vercel.app/admin/update-movie', movieData);
            if (res.status === 201) {
                toast.success('Movie updated successfully.');
                navigate('/dashboard/movies');
            } else if (res.status === 405) {
                toast.error("Movie doesn't Exist");
            } else if (res.status === 401) {
                toast.error("Error in updating.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const callAdminPage = async (req, res) => {
        try {
            const res = await axios.get('https://movieflix-lyart.vercel.app/admin', { withCredentials: true });
            if (!res.status === 200) {
                navigate('/signin')
                alert('Unauthorized User')
            } 
        } catch (err) {
            console.log(err);
            navigate('/signin')
        }
    }
    useEffect(() => {
        callAdminPage();
    })

    const [{ categories }, dispatch1] = useReducer((reducer1), {
        categories: []
    })

    useEffect(() => {
        const fetchCategories = async () => {
            dispatch1({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('https://movieflix-lyart.vercel.app/api/categories');
                dispatch1({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch1({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchCategories();

        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const about = await axios.get('https://movieflix-lyart.vercel.app/api/movies');
                dispatch({ type: 'FETCH_SUCCESS', payload: about.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, [])

    return (
        <div className='container m-3 p-3'>
            <Row className='conatiner-fluid'>
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Update Movie</h1>
                    <hr />
                    {loading ? (<LoadingBox />) : error ? (<MessageBox>{error.message}</MessageBox>) : (
                        movies.map((movie) => (
                            movie._id === id && (
                                <Form onSubmit={handleSubmit}>
                                    <input type="text" name='name' defaultValue={movie.name} className='admin-input' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
                                    <input type="text" name='image' defaultValue={movie.image} className='admin-input' placeholder='Image' onChange={(e) => setImage(e.target.value)} /><br />
                                    {/* {image && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(image)} alt='carousel' height={'200px'} />
                                        </div>
                                    )} */}
                                    <input type="text" name='slug' defaultValue={movie.slug} className='admin-input' placeholder='Slug' onChange={(e) => setSlug(e.target.value)} /><br />
                                    <input type="text" name='story' defaultValue={movie.story} className='admin-input' placeholder='Story' onChange={(e) => setStory(e.target.value)} /><br />
                                    <input type="text" name='cast' defaultValue={movie.cast} className='admin-input' placeholder='Cast' onChange={(e) => setCast(e.target.value)} /><br />
                                    <input type="text" name='director' defaultValue={movie.director} className='admin-input' placeholder='Director' onChange={(e) => setDirector(e.target.value)} /><br />
                                    <input type="text" name='release' defaultValue={movie.release} className='admin-input' placeholder='Release' onChange={(e) => setRelease(e.target.value)} /><br />
                                    <input type="text" name='distributor' defaultValue={movie.distributor} className='admin-input' placeholder='Distributor' onChange={(e) => setDistributor(e.target.value)} /><br />
                                    <input type="text" name='rated' defaultValue={movie.rated} className='admin-input' placeholder='Rated' onChange={(e) => setRated(e.target.value)} /><br />
                                    <input type="text" name='duration' defaultValue={movie.duration} className='admin-input' placeholder='Duration' onChange={(e) => setDuration(e.target.value)} /><br />
                                    <input type="text" name='genre' defaultValue={movie.genre} className='admin-input' placeholder='Genre' onChange={(e) => setGenre(e.target.value)} /><br />
                                    <input type="text" name='imdb' defaultValue={movie.imdb} className='admin-input' placeholder='Imdb' onChange={(e) => setImdb(e.target.value)} /><br />
                                    <input type="text" name='year' defaultValue={movie.year} className='admin-input' placeholder='Year' onChange={(e) => setYear(e.target.value)} /><br />
                                    <input type="text" name='tmdb' defaultValue={movie.tmdb} className='admin-input' placeholder='TMDB' onChange={(e) => setTmdb(e.target.value)} /><br />

                                    <select onChange={(e) => setCategory(e.target.selectedOptions[0].innerText)} className='admin-input'>
                                        {
                                            categories.map((cat) => (
                                                <option defaultValue={movie.category} value={cat.name}>{cat.name}</option>
                                            ))
                                        }

                                    </select>

                                    <Button type='submit'>Update Movie</Button>
                                </Form>
                            )
                        ))
                    )}
                </Col>
            </Row>
        </div>

    )
}