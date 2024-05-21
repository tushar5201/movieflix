// import React, { useEffect, useReducer, useState } from 'react'
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// import { getError } from '../utils';
// import axios from 'axios';
// import { Button, Col, Row, Toast } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'FETCH_REQUEST':
//             return { ...state, loading: true };
//         case 'FETCH_SUCCESS':
//             return {
//                 ...state,
//                 movies: action.payload.movies,
//                 countMovies: action.payload.countMovies,
//                 loading: false
//             };
//         case 'FETCH_FAIL':
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// }

// export default function FilterScreen() {

//     const navigate = useNavigate();
//     const { search } = useLocation();
//     const sp = new URLSearchParams(search);
//     const category = sp.get('category') || 'all';

//     const [{ loading, error, movies, countMovies }, dispatch] = useReducer(reducer, {
//         loading: true,
//         error: ''
//     })

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const { data } = await axios.get(`/api/movies/search?category=${category}`)
//                 dispatch({ type: 'FETCH_SUCCESS', payload: data })
//             } catch (error) {
//                 dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
//             }
//         }
//         fetchData()
//     }, [category])

//     const [categories, setCategories] = useState([]);
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const { data } = await axios.get(`/api/movies/categories`)
//                 setCategories(data)
//             } catch (error) {
//                 toast.error(getError(error));
//             }
//         }
//         fetchCategories();
//     }, [dispatch]);

//     const getFilterUrl = (filter) => {
//         const filterCategory = filter.category || category;
//         return `/search?category=${filterCategory}`
//     }
//     return (
//         <div>
//             <Row>
//                 <Col md={3}>
//                     <h3>Department</h3>
//                     <div>
//                         <ul>
//                             <li>
//                                 <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl({ category: 'all' })}>Any</Link>
//                             </li>
//                             {categories.map((c) => (
//                                 <li key={c}>
//                                     <Link className={c === category ? 'text-bold' : ''} to={getFilterUrl({ category: c })}>{c}</Link>
//                                 </li>

//                             ))}
//                         </ul>
//                     </div>
//                 </Col>
//                 <Col md={9}>
//                     {loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
//                         <>
//                             <Row className='justify-content-between mb-3'>
//                                 <Col md={6}>
//                                     <div>
//                                         {countMovies === 0 ? 'No' : countMovies}Results
//                                         {category !== 'all' && ':' + category}
//                                         {category !== 'all' ? <Button variant='light' onClick={() => navigate('/search0')}>
//                                             <i className='fas fa-times-circle' />
//                                         </Button>
//                                             : null}
//                                     </div>
//                                 </Col>
//                             </Row>
//                             {movies.length === 0 && (
//                                 <MessageBox>No Movies Found</MessageBox>
//                             )}
//                             <Row>
//                                 {
//                                     movies.slice(0).reverse().map((movie) => (
//                                         <Link key={movie._id} to={`/movie/${movie.slug}`} >
//                                             <img src={`/admin/get-movie-image/${movie._id}`} alt={movie.name} className='slider_img' />
//                                         </Link>
//                                     ))}
//                             </Row>
//                         </>
//                     )}
//                 </Col>
//             </Row>
//         </div>
//     )
// }
import React, { useEffect, useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { getError } from '../utils';
import Slider from 'react-slick';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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

const reducer1 = (action, state) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading1: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading1: false, series: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading1: false, error: action.payload }
        default:
            return state;
    }
}

export default function FilterScreen() {
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const category = sp.get('category') || 'all';

    const [{ loading, error, movies }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        movies: []
    })

    const [{ loading1, error1, series }, dispatch1] = useReducer((reducer1), {
        loading1: true,
        error1: '',
        series: []
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get('https://movieflix-lyart.vercel.app/api/movies');
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchData();

        const fetchSeries = async () => {
            dispatch1({ type: 'FETCH_REQUEST' });
            try {
                const series = await axios.get('https://movieflix-lyart.vercel.app/api/series');
                dispatch1({ type: 'FETCH_SUCCESS', payload: series.data })
            } catch (error) {
                dispatch1({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchSeries();
    }, []);

    let settings;

    let width = window.innerWidth;
    if (width < 450) {
        settings = {
            className: "center",
            infinite: true,
            centerPadding: '100px',
            slidesToShow: 3,
            swipeToSlide: true,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        }
    } else {
        settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        }
    }

    return (
        <div className='body'>
            <Header />
            <div className="container">
                <h4 className='titles'>&nbsp;{category} Movies</h4>
                <Slider className='slider' {...settings}>
                    {
                        loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                            movies.slice(0).reverse()
                                .map((movie) =>
                                (
                                    movie.category === category && (
                                        <Link key={movie._id} to={`/movie/${movie._id}`} >
                                            <img src={`/admin/get-movie-image/${movie._id}`} alt={movie.name} className='slider_img' />
                                        </Link>
                                    )
                                ))
                        )
                    }
                </Slider>

                <h4 className='titles'>&nbsp;{category} Series</h4>
                <Slider className='slider' {...settings}>
                    {
                        loading1 ? <LoadingBox /> : error1 ? <MessageBox variant='danger'>{error1}</MessageBox> : (
                            series.slice(0).reverse().map((ser) =>
                            (
                                ser.category === category && (
                                    <Link key={ser._id} to={`/series/${ser._id}`} >
                                        <img src={`/admin/get-series-image/${ser._id}`} alt={ser.name} className='slider_img' />
                                    </Link>
                                )
                            ))
                        )
                    }
                </Slider>
            </div>
        </div>
    )
}
