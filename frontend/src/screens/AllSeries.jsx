import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reducer = (action, state) => {
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

export default function AllSeries() {

    const [{ loading, error, series }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        series: []
    })

    useEffect(() => {

        const fetchSeries = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const series = await axios.get(`https://movieflix-lyart.vercel.app/api/series`);
                dispatch({ type: 'FETCH_SUCCESS', payload: series.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
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
        <Slider className='slider' {...settings}>
            {
                loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                    series.map((ser) => (
                        <Link key={ser._id} to={`/series/${ser._id}`}>
                            <img src={`https://movieflix-lyart.vercel.app/admin/get-series-image/${ser._id}`} alt={ser.name} className='slider_img' />
                            <div className='overlay'>{ser.name}<br />{ser.year}</div>
                        </Link>
                    )))
            }
        </Slider>
    )
}
