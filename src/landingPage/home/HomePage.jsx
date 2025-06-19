import {Link} from 'react-router-dom'

// HomePage component displays the landing page with navigation links
export default function HomePage ({darkMode}) {
    const buttonClass = darkMode ? 'btn-light text-dark' : 'btn-dark text-light';
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-12 col-lg-8">
                    <h1>Welcome! CGS to</h1>
                    <h2 className="d-flex justify-content-center">Hogwards.com</h2>
                    <Link to="/signup" className={`btn ${buttonClass} m-2`}>SignUp</Link>
                    <Link to="/login" className={`btn ${buttonClass} m-2`}>Login</Link>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
    )
};