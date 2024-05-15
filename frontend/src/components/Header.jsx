import { Link } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, movies: action.payload };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
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

const reducer2 = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, series: action.payload };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function Header1() {
    const [{ movies }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: '',
        movies: []
    })

    const [{ categories }, dispatch1] = useReducer((reducer1), {
        categories: []
    });

    const [{ series }, dispatch2] = useReducer((reducer2), {
        series: []
    });

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('/api/movies');
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchData();

        const fetchCategories = async () => {
            dispatch1({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('/api/categories');
                dispatch1({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch1({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchCategories();

        const fetchSeries = async () => {
            dispatch2({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('/api/series');
                dispatch2({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch2({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchSeries();
    }, []);

    const uname = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-black">
            <div className="container header">
                <Link className="navbar-brand">
                    <img src='/images/movieflix_logo-trans.png' className='logo' alt='logo' />
                </Link>

                <div className="collapse r-header justify-content-end navbar-collapse" id="collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/index' className="r_link">Home</Link>
                        </li>

                        {uname ? (
                            <li className="nav-item">
                                <Link to='/admin/profile' className='r_link'><strong> {uname.data.name}{" "}</strong></Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to='/signin' className='s-out_btn'><b> Sign In </b></Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link className="r_link dropdown-toggle" id="drp" data-bs-toggle="dropdown">Category</Link>
                            <ul className="dropdown-menu" aria-labelledby="drp">
                                {
                                    categories.map((category) => (
                                        <li><Link className="dropdown-item" to={`/search?category=${category.name}`}>{category.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </li>

                        <input className="input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className="dropdown">
                            {movies
                                .filter((item) => {
                                    const searchTerm = search.toLowerCase();
                                    const name = item.name.toLowerCase();

                                    return searchTerm && name.startsWith(searchTerm)
                                })
                                .map((movie) => (
                                    <Link to={`/movie/${movie._id}`} className='r_link'>
                                        <img src={`/admin/get-movie-image/${movie._id}`} alt={movie._id} width={50} /> {' '}
                                        {movie.name}
                                    </Link>
                                ))
                            }
                            {series
                                .filter((item) => {
                                    const searchTerm = search.toLowerCase();
                                    const name = item.name.toLowerCase();

                                    return searchTerm && name.startsWith(searchTerm)
                                })
                                .map((ser) => (
                                    <Link to={`/series/${ser._id}`} className='r_link'>
                                        <img src={`/admin/get-series-image/${ser._id}`} alt={ser._id} width={50} /> {' '}
                                        {ser.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </ul>
                </div>

                <button className="navbar-toggler mt-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div >
        </nav >
    )
}