import { Button, Col, Form, Row } from "react-bootstrap";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useReducer, useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../../utils";
import { toast } from "react-toastify";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, series: action.payload }
        case 'FETCH_FAIL':
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

export default function SeriesController() {
    const [{ loading, error, series }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        series: []
    });

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("https://movieflix-lyart.vercel.app/admin/delete-series", id, { withCredentials: true });
            if (res.status === 200) {
                toast.success("Series Deleted Successfully");
                window.location.reload();
            } else if (res.status === 401) {
                toast.error("Couldn't be deleted");
            } else if (res.status === 404) {
                toast.error("Series not found");
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

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const series = await axios.get('https://movieflix-lyart.vercel.app/api/series');
                dispatch({ type: 'FETCH_SUCCESS', payload: series.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);
    return (
        <div className="container">
            <Row className="container-fluid">
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Series</h1>
                    <hr />
                    {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                        <div>
                            <Link to='/dashboard/create_series' className='btn btn-primary'><i className='fa-solid fa-plus'></i></Link>{' '}
                            {series.slice(0).reverse().map((ser, i) => (
                                <div key={i}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'left' }}>
                                                    <h2>{ser.name}</h2>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <Link to={`/dashboard/update_series/${ser._id}`} className="btn btn-primary"><i className="fa-solid fa-pen"></i></Link> {' '}
                                                    <Button onClick={() => handleDelete(ser._id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></Button>
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

export function CreateSeries() {

    const navigate = useNavigate();

    const [tmdb, setTmdb] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [story, setStory] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [release, setRelease] = useState('');
    const [distributor, setDistributor] = useState('');
    const [rated, setRated] = useState('');
    const [genre, setGenre] = useState('');
    const [imdb, setImdb] = useState('');
    const [year, setYear] = useState('');
    const [category, setCategory] = useState('');
    const [sande, setSande] = useState([{
        sno: null,
        eno: null
    }])

    const [{ categories }, dispatch1] = useReducer((reducer1), {
        categories: []
    })

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

    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const changeVal = [...sande];
        changeVal[i][name] = value;
        setSande(changeVal);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sande1 = JSON.stringify(sande);

            // const seriesForm = new FormData();
            // seriesForm.append("tmdb", tmdb);
            // seriesForm.append("name", name);
            // seriesForm.append("story", story);
            // seriesForm.append("cast", cast);
            // seriesForm.append("director", director);
            // seriesForm.append("release", release);
            // seriesForm.append("image", image);
            // seriesForm.append("distributor", distributor);
            // seriesForm.append("rated", rated);
            // seriesForm.append("genre", genre);
            // seriesForm.append("imdb", imdb);
            // seriesForm.append("year", year);
            // seriesForm.append("category", category);
            // seriesForm.append("sande", sande1);

            const res = await axios.post("https://movieflix-lyart.vercel.app/admin/create-series", { tmdb, name, story, cast, director, release, image, distributor, rated, genre, imdb, year, category, sande1 }, { withCredentials: true });
            if (res.status === 200) {
                toast.success("Series Added Successfully.");
                navigate("/dashboard/series");
            }
        } catch (error) {
            toast.error("Error in Creating Series");
            console.log(error);
        }
    }

    return (
        <div className="container m-3 p-3">
            <Row className="container-fluid">
                <Col md={3}>
                    <AdminMenu />
                </Col>
                <Col md={9}>
                    <h1>Create Series</h1>
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

                        {sande.map((val, i) => (
                            <div>
                                <input key={i} type="number" name="sno" id="sno" className="admin-input" placeholder="Season No" value={val.sno} onChange={(e) => handleChange(e, i)} />
                                <input key={i} type="number" name="eno" id="eno" className="admin-input" placeholder="Total Episodes" value={val.eno} onChange={(e) => handleChange(e, i)} />
                            </div>
                        ))}
                        <Button className="btn btn-primary" onClick={() => setSande([...sande, { sno: null, eno: null }])}>
                            <i className="fa fa-plus"></i>
                        </Button>
                        <br /><br />

                        <Button type='submit'>Create Series</Button>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export function UpdateSeries() {

    const [{ loading, error, series }, dispatch] = useReducer((reducer), {
        loading: true,
        error: "",
        series: []
    })

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [story, setStory] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [release, setRelease] = useState('');
    const [distributor, setDistributor] = useState('');
    const [rated, setRated] = useState('');
    const [genre, setGenre] = useState('');
    const [imdb, setImdb] = useState('');
    const [year, setYear] = useState();
    const [category, setCategory] = useState('');
    const [tmdb, setTmdb] = useState('');
    const [seasonsandepisodes, setSeasonsandepisodes] = useState([{
        sno: null,
        eno: null
    }])

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const res = await fetch('https://movieflix-lyart.vercel.app/admin/update-series', {
            //     method: "PUT",
            //     headers: { 'content-type': 'application/json' },
            //     body: JSON.stringify({ id, tmdb, name, image, story, cast, director, release, distributor, rated, genre, imdb, year, category, seasonsandepisodes })
            // });

            const res = await axios.put("https://movieflix-lyart.vercel.app/admin/update-series", { id, tmdb, name, image, story, cast, director, release, distributor, rated, genre, imdb, year, category, seasonsandepisodes }, { withCredentials: true })
            if (res.status === 201) {
                toast.success('Series updated successfully.');
                navigate('/dashboard/series');
            } else if (res.status === 405) {
                toast.error("Series doesn't Exist");
            } else if (res.status === 401) {
                toast.error("Error in updating.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [{ categories }, dispatch1] = useReducer((reducer1), {
        categories: []
    });

    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const changeVal = [...seasonsandepisodes];
        changeVal[i][name] = value;
        setSeasonsandepisodes(changeVal);
    }

    const handleDelete = async (id, menuId) => {
        const res = await fetch('https://movieflix-lyart.vercel.app/admin/delete-sande', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id, menuId })
        });
        if (res.status === 200) {
            console.log('li deleted');
            window.location.reload(true)
        } else {
            console.log('not Deleted');
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
                const about = await axios.get('https://movieflix-lyart.vercel.app/api/series');
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
                    <h1>Update Series</h1>
                    <hr />
                    {loading ? (<LoadingBox />) : error ? (<MessageBox>{error.message}</MessageBox>) : (
                        series.map((series) => (
                            series._id === id && (
                                <Form onSubmit={handleSubmit}>
                                    <input type="text" name='name' defaultValue={series.name} className='admin-input' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
                                    <input type="text" name='image' defaultValue={series.image} className='admin-input' placeholder='Image' onChange={(e) => setImage(e.target.value)} /><br />
                                    <input type="text" name='story' defaultValue={series.story} className='admin-input' placeholder='Story' onChange={(e) => setStory(e.target.value)} /><br />
                                    <input type="text" name='cast' defaultValue={series.cast} className='admin-input' placeholder='Cast' onChange={(e) => setCast(e.target.value)} /><br />
                                    <input type="text" name='director' defaultValue={series.director} className='admin-input' placeholder='Director' onChange={(e) => setDirector(e.target.value)} /><br />
                                    <input type="text" name='release' defaultValue={series.release} className='admin-input' placeholder='Release' onChange={(e) => setRelease(e.target.value)} /><br />
                                    <input type="text" name='distributor' defaultValue={series.distributor} className='admin-input' placeholder='Distributor' onChange={(e) => setDistributor(e.target.value)} /><br />
                                    <input type="text" name='rated' defaultValue={series.rated} className='admin-input' placeholder='Rated' onChange={(e) => setRated(e.target.value)} /><br />
                                    <input type="text" name='genre' defaultValue={series.genre} className='admin-input' placeholder='Genre' onChange={(e) => setGenre(e.target.value)} /><br />
                                    <input type="text" name='imdb' defaultValue={series.imdb} className='admin-input' placeholder='Imdb' onChange={(e) => setImdb(e.target.value)} /><br />
                                    <input type="number" name='year' defaultValue={series.year} className='admin-input' placeholder='Year' onChange={(e) => setYear(e.target.value)} /><br />
                                    <input type="text" name='tmdb' defaultValue={series.tmdb} className='admin-input' placeholder='TMDB' onChange={(e) => setTmdb(e.target.value)} /><br />

                                    <select onChange={(e) => setCategory(e.target.selectedOptions[0].innerText)} className='admin-input'>
                                        {
                                            categories.map((cat) => (
                                                <option defaultValue={series.category} value={cat.name}>{cat.name}</option>
                                            ))
                                        }
                                    </select>

                                    {
                                        series.seasonsandepisodes.map((sande, i) => (
                                            <div key={i}>
                                                <Row>
                                                    <Col md={11}>
                                                        <input name="sno" value={sande.sno} onChange={(e) => handleChange(e, i)} placeholder='Season No' className="admin-input" />
                                                        <input name="eno" value={sande.eno} onChange={(e) => handleChange(e, i)} placeholder='Total Episodes' className="admin-input" /><br />
                                                    </Col>
                                                    <Col md={1}>
                                                        <Button className='btn btn-danger' style={{ marginTop: "50px" }} onClick={() => handleDelete(sande._id, series._id)}><i className="fa-solid fa-trash"></i></Button>{' '}<br />
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))
                                    }

                                    {seasonsandepisodes.map((val, i) => (
                                        <div>
                                            <input key={i} value={val.sno} type="number" name="sno" id="sno" className="admin-input" placeholder="Season No" onChange={(e) => handleChange(e, i)} />
                                            <input key={i} value={val.eno} type="number" name="eno" id="eno" className="admin-input" placeholder="Total Episodes" onChange={(e) => handleChange(e, i)} />
                                        </div>
                                    ))}
                                    <Button className="btn btn-primary" onClick={() => setSeasonsandepisodes([...seasonsandepisodes, { sno: null, eno: null }])}>
                                        <i className="fa fa-plus"></i>
                                    </Button>
                                    <br /><br />

                                    <Button type='submit'>Update Series</Button>
                                </Form>
                            )
                        ))
                    )}
                </Col>
            </Row>
        </div>

    )
}