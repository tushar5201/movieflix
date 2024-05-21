import React, { useEffect, useReducer } from 'react'
import Header from '../components/Header'
// import data from '../data'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

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

export default function MovieScreen() {
    const params = useParams();
    const { id } = params;

    const [{ loading, error, movies }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        movies: []
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get(`https://movieflix-lyart.vercel.app/api/movies/${id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchData();

    }, [id]);

    return (
        <div>
            <Header />
            <hr />
            <div className="container">
                {loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                    <Row>
                        <Col md={3}>
                            <img className='main_image' src={movies.image} alt={movies.slug} width={300} />
                        </Col>
                        <Col md={9}>
                            <h1>{movies.name}</h1><br />
                            <h2 style={{ color: '#fff' }}>{movies.year}</h2><h5>{movies.rated}{"     "}{movies.duration}</h5>
                            <h6>Genre : {movies.genre}</h6>
                            <h6>IMDB : <i className='fa-solid fa-star' />{'  '}{movies.imdb}</h6>
                            <h6>Release Date : {movies.release}</h6>
                            <h6>Director     : {movies.director}</h6>
                            <h6>Distributor  : {movies.distributor}</h6>
                            <h6>Storyline    : <p style={{ textAlign: 'justify' }}>{movies.story}</p></h6>
                            <h6>Cast         : {movies.cast}</h6>

                            {loading ? <LoadingBox /> : error ? <MessageBox>{error}</MessageBox> : (
                                <div>
                                    <Link target="_blank" className='btn btn-danger watch' to={`/videoplayer/movie/${movies.tmdb}`}>
                                        Watch Movie &nbsp;
                                        <i className='fa-solid fa-play' />
                                    </Link>
                                </div>
                            )}
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    )
}
