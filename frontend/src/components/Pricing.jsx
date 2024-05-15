import { Button } from "react-bootstrap";

export default function Pricing() {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>Choose the plan that’s right for you</h1>
            <div className="card">
                <div className="header">
                    <h4 style={{ color: '#fff' }}>Most Popular</h4>
                </div>

                <div className="body">
                    <h6 style={{marginTop: '1rem'}}>Monthly Price</h6>
                    <h5 style={{color: '#fff'}}>₹ 199</h5>
                    <hr />

                    <h6 style={{marginTop: '1rem'}}>Video & sound quality</h6>
                    <h5 style={{color: '#fff'}}>Good</h5>
                    <hr />

                    <h6 style={{marginTop: '1rem'}}>Access of Content</h6>
                    <h5 style={{color: '#fff'}}>All</h5>
                    <hr />

                    <h6 style={{marginTop: '1rem'}}>Resolution</h6>
                    <h5 style={{color: '#fff'}}>1080p</h5>
                    <hr />

                    <h6 style={{marginTop: '1rem'}}>Supported Devices</h6>
                    <h5 style={{color: '#fff'}}>Mobile, Tablet, TV</h5><br />

                    <Button href="/signup" className="btn btn-danger">Next</Button>
                </div>
            </div>
        </div>
    )
}