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
import AllSeries from './AllSeries';


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

export default function IndexScreen() {

    const [{ loading, error, movies }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        movies: []
    })

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
                <h4 className='titles'> &nbsp;Popular movies on Movieflix</h4>
                <Slider className='slider' {...settings}>
                    {
                        loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                            movies.map((movie) => (
                                <Link className='overlay1' key={movie._id} to={`/movie/${movie._id}`}>
                                    <img src={movie.image} alt={movie.title} className='slider_img' />
                                    <div className='overlay'>{movie.name}<br />{movie.year}</div>
                                </Link>
                            )))}
                </Slider>

                <h4 className='titles'>&nbsp;Popular series on Movieflix</h4>
                <Slider className='slider' {...settings}>
                    <AllSeries />
                </Slider>
            </div>
        </div>
    )
}
