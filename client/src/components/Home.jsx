import "../styles/index.scss"
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <header className="header">
            <div className="logo">
                <div className="logo__image">
                    <div className="logo1">
                        <span className="logo1-1"></span>
                        <span className="logo1-2"></span>
                    </div>
                    <span className="logo2"></span>
                    <div className="logo3">
                        <span className="logo3-1"></span>
                    </div>
                </div>
                <div className="logo__title">
                    crowdme
                </div>
            </div>
            <div className="menu">
                <div className="menu__icon">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <nav className="menu__nav">
                    <ul className="menu__list">
                        <li className="menu__link"><a href="#">home</a></li>
                        <li className="menu__link"><a href="#">how it works</a></li>
                        <li className="menu__link"><a href="#">discover a project</a></li>
                        <li className="menu__link"><a href="#">blog</a></li>
                        <li className="menu__link"><a href="#">find out more</a></li>
                    </ul>
                </nav>
            </div>
            <div className="login">
                <Link to="/login">Логин</Link>
            </div>
        </header>
    );
};

export default Home;
