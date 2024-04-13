import MainImage from "../../assets/main/main-image.PNG";
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <section className="main">
            <h1>тренировки английского языка<br></br>по грамматике и лексике</h1>
            <h2>Для начинающих изучать английский с нуля и продолжающих</h2>
            <div className="main-block">
                <img src={MainImage} alt=""/>
                <div className="main-buttons">
                    <Link to="/register" className="main-buttons__register-link">
                        <button className="main-buttons__register main-buttons__common">
                            начать
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="main-buttons__login main-buttons__common">
                            у меня уже есть аккаунт
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
};

export default Main;