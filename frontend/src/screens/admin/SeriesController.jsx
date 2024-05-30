import { Button, Col, Form, Row } from "react-bootstrap";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useReducer, useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
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
    }, [])
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
                                                    <Button className="btn btn-danger"><i className="fa-solid fa-trash"></i></Button>
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

    const [uploaded, setUploaded] = useState();

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

            const res = await axios.post("https://movieflix-lyart.vercel.app/admin/create-series", { tmdb, name, story, cast, director, release, image, distributor, rated, genre, imdb, year, category, sande1 });
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
                        {uploaded && (
                            <div className="progress mt-2">
                                <div className="progress-bar" aria-valuenow={uploaded} aria-valuemin='0' aria-valuemax='100' style={{ width: `${uploaded}%` }}>{`${uploaded}%`}</div>
                            </div>
                        )}
                        <Button type='submit'>Create Series</Button>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}