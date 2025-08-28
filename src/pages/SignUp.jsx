import React, {useState, useRef} from 'react';
import {CONFIG} from "../../config.js";
import {onLogin} from "../utils/onLogin.jsx";
import ReCAPTCHA from "react-google-recaptcha";

function SignUp() {
    const [data, setData] = useState({
        username: '', password: '', repeatPassword: '', email: ''
    })
    const [error, setError] = useState('')
    const recaptchaRef = useRef(null)
    const [token, setToken] = useState(null)

    function validate() {
        if (!data.username.trim() &&
            !data.password.trim() &&
            !data.repeatPassword.trim() &&
            !data.password.trim() &&
            !data.email.trim()) {
            setError('Поля не все заполнены')
            return false;
        }

        if (!token) {
            setError('Капча не решена')
            return false;
        }


        if (data.username.length < 5) {
            setError('Логин должен быть больше 5 символов')
            return false;
        }

        if (data.password !== data.repeatPassword) {
            setError('Пароли не совпадают')
            return false;
        }

        if (!validateEmail(data.email)) {
            setError('Формат почты неправильный')
            return false;
        }
        return true
    }

    function changeData(event) {
        setData(prevState =>
            ({...prevState, [event.target.name]: event.target.value})
        )
    }

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    async function handleSignUp() {
        const val = validate()
        if (!val) return

        try {
            data["captcha"] = token

            const res = await fetch(`${CONFIG.API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.status === 403) {
                setError("Такой пользователь уже есть")
                return;
            }

            else if (res.status === 400) {
                setError("Попробуйте еще раз")
                return;
            }

            const d = await res.json();
            onLogin(d)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col gap-3 mx-auto items-center p-7">
            <input name='username' type="text" placeholder="Логин" className="input_data" onChange={changeData}/>
            <input name='email' type="email" placeholder="Email" className="input_data" onChange={changeData}/>
            <input name='password' type="password" placeholder="Пароль" className="input_data" onChange={changeData}/>
            <input name='repeatPassword' type="password" placeholder="Повторите пароль" className="input_data" onChange={changeData}/>
            <ReCAPTCHA ref={recaptchaRef}
                       sitekey={CONFIG.SITE_KEY}
                       size="normal"
                       onChange={setToken}
            />
            {error && <p>{error}</p>}

            <a className="link" href="/login">Вход</a>

            <button className="big_buttons bg-red-600 justify-center" onClick={handleSignUp}>Продолжить</button>

        </div>

    );
}

export default SignUp;