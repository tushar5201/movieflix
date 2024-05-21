import { Link, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { getError } from "../utils";
import { Accordion, AccordionHeader, AccordionItem, Col, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import Header1 from "../components/Header";

const reducer = (state, action) => {
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

export function SeriesScreen() {
    const params = useParams();
    const { id } = params;

    // const [season, setSeason] = useState();

    const [{ loading, error, series }, dispatch] = useReducer((reducer), {
        loading: true,
        error: '',
        series: []
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const res = await axios.get(`https://movieflix-lyart.vercel.app/api/series/${id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
            }
        }
        fetchData();

    }, [id]);

    let eps = [];

    function getdata(sno, eno) {
        eps = [];
        for (let i = 1; i <= eno; i++) {
            eps.push(i);
        }
    }
    return (
        <div>
            <Header1 />
            <div className="container">
                {loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> : (
                    <Row>
                        <Col md={3}>
                            <img className="main_image" src={`https://movieflix-lyart.vercel.app/admin/get-series-image/${series._id}`} alt={series.slug} width={300} />
                        </Col>
                        <Col md={9}>
                            <h1>{series.name}</h1><br />
                            <h2 style={{ color: '#fff' }}>{series.year}</h2><h5>{series.rated}{"     "}{series.duration}</h5>
                            <h6>Genre : {series.genre}</h6>
                            <h6>IMDB : <i className='fa-solid fa-star' />{'  '}{series.imdb}</h6>
                            <h6>Release Date : {series.release}</h6>
                            <h6>Director     : {series.director}</h6>
                            <h6>Distributor  : {series.distributor}</h6>
                            <h6>Storyline    : <p style={{ textAlign: 'justify' }}>{series.story}</p></h6>
                            <h6>Cast         : {series.cast}</h6>

                            <h1>Seasons & Episodes</h1>
                            <div>
                                {
                                    series.seasonsandepisodes.map((sande) => (
                                        <Accordion className="accordian" key={sande._id}>
                                            <AccordionItem eventKey={sande._id}>
                                                <AccordionHeader>Season {sande.sno}</AccordionHeader>
                                                <AccordionBody>
                                                    {getdata(sande.sno, sande.eno)}
                                                    {eps.map((ep) => (
                                                        <div>
                                                            <Link target="_blank" to={`/videoplayer/tv/${series.tmdb}&season=${sande.sno}&episode=${ep}`}>
                                                                <h5 className="ep-nm">{ep}</h5>
                                                            </Link>
                                                            {/* <iframe src={`https://moviesapi.club/tv/${series.tmdb}-${sande.sno}-${ep}`} title={series.name} width='100%' height='600px' allowfullscreen={true}></iframe> */}
                                                        </div>
                                                    ))}
                                                </AccordionBody>
                                            </AccordionItem>
                                        </Accordion>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    )
}