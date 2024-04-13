import {Link} from "react-router-dom";
import UserIcon from "../../assets/main/user-icon.png";
const Header = () => {
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
                    LingyX
                </div>
            </div>
            <div className="login">
                <Link to="/app">
                    <img className="login__icon" src={UserIcon} alt=""/>
                </Link>
            </div>
        </header>
    )
};

export default Header;