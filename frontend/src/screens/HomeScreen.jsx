import React, { useEffect, useReducer } from 'react'
import Header from '../components/Header'
import { Carousel } from 'react-bootstrap'
// import data from '../data'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, carousel: action.payload };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function HomeScreen() {
  const [{ loading, error, carousel }, dispatch] = useReducer((reducer), {
    loading: true,
    error: '',
    carousel: []
  })

  // const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get('/api/carousel');
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <Carousel className='background_img'>
        {
          loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
            carousel.map((carousel) => (
              <Carousel.Item>
                <img src={`/admin/get-carousel-image/${carousel._id}`} alt='background' width='100%'  className='carousel-image' />
                <Carousel.Caption className='inner_content'>
                  <h1>{carousel.name}</h1>
                  <h5>{carousel.story}</h5>
                  <p>Ready to watch ? click below button </p>
                  <Link to='/index' className='start_btn'> Get Started <i className="fa-solid fa-chevron-right"></i></Link>
                </Carousel.Caption>
              </Carousel.Item>
            )))}
      </Carousel>
    </div>
  )
}
