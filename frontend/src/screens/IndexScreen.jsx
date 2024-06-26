import React, { useEffect, useReducer } from 'react'
import Header from '../components/Header'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import 'react-lazy-load-image-component/src/effects/blur.css';


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
            return { ...state, loading1: true }
        case 'FETCH_SUCCESS':
            return { ...state, loading1: false, series: action.payload }
        case 'FETCH_FAIL':
            return { ...state, loading1: false, error1: action.payload }
        default:
            return state;
    }
}

export default function IndexScreen() {

    const [{ loading, error, movies }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        movies: []
    })

    const [{ loading1, error1, series }, dispatch1] = useReducer((reducer1), {
        loading1: true,
        error1: '',
        series: [],
    });

    // const path = "https://movieflix-lyart.vercel.app";

    useEffect(() => {
        const fetchMovie = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get("https://movieflix-lyart.vercel.app/api/movies");
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchMovie();

        const fetchSeries = async () => {
            dispatch1({ type: 'FETCH_REQUEST' });
            try {
                const series = await axios.get(`https://movieflix-lyart.vercel.app/api/series`);
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
    } else if (width < 990 && width > 450) {
        settings = {
            className: "center",
            infinite: true,
            centerPadding: '100px',
            slidesToShow: 4,
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
                <h4 className='titles'> &nbsp;Popular movies on Movieflix</h4>
                <Slider className='slider' {...settings}>
                    {
                        loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                            movies.slice(0).reverse().map((movie) => (
                                <Link className='overlay1' key={movie._id} to={`/movie/${movie._id}`}>
                                    <img src={movie.image} alt={movie.title} className='slider_img' />
                                    <div className='overlay'>{movie.name}<br />{movie.year}</div>
                                </Link>
                            )))}
                </Slider>

                <h4 className='titles'>&nbsp;Popular series on Movieflix</h4>
                <Slider className='slider' {...settings}>
                    {
                        loading1 ? <LoadingBox /> : error1 ? <MessageBox variant='danger'>{error1}</MessageBox> : (
                            series.slice(0).reverse().map((ser) => (
                                <Link key={ser._id} to={`/series/${ser._id}`}>
                                    <img src={ser.image} alt={ser.name} className='slider_img' />
                                    <div className='overlay'>{ser.name}<br />{ser.year}</div>
                                </Link>
                            )))
                    }
                </Slider>

            </div>
        </div>
    )
}
