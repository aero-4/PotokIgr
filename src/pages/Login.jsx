import React, {useState, useRef} from 'react';
import {CONFIG} from "../../config.js";
import {onLogin} from "../utils/onLogin.jsx";
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
    const [loginData, setLoginData] =
        useState({'username': '', 'password': ''})
    const [error, setError] = useState("")
    const recaptchaRef = useRef(null)
    const [token, setToken] = useState(null)

    async function loginHandler() {
        if (loginData.username.trim().length <= 0 && loginData.password.trim().length <= 0) {
            setError("Поля не все заполнены")
            return
        }

        try {
            recaptchaRef.current.reset();
            loginData["captcha"] = token

            const res = await fetch(`${CONFIG.API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginData),
            });
            const data = await res.json();

            if (!res.ok) {
                console.error('Login failed:', res.status);
                if (data.detail === "Fail captcha") {
                    setError("Попробуйте еще раз")
                }
                else {
                    setError("Неверный логин или пароль")
                }
                return;
            }

            if (data.token_type !== 'Bearer') {
                console.error('Unexpected token type:', data.token_type);
                return;
            }

            onLogin(data)
        }
        catch (err) {
            console.error('Network or parsing error:', err);
        }
        finally {
            setToken(null)
        }

    }

    function changeData(event) {
        setLoginData(prevState =>
            ({...prevState, [event.target.name]: event.target.value})
        )
    }


    return (
        <div className="flex flex-col gap-3 mx-auto items-center p-7">

            <input type="text" name="username" placeholder="Логин" className="input_data" onChange={changeData}/>
            <input type="password" name="password" placeholder="Пароль" className="input_data" onChange={changeData}/>

            <ReCAPTCHA ref={recaptchaRef}
                       sitekey={CONFIG.SITE_KEY}
                       size="normal"
                       onChange={setToken}
            />

            {error && <span>{error}</span>}

            <a className="link" href="/signup">Регистрация</a>

            <button className="big_buttons bg-green-600 w-50 justify-center" onClick={loginHandler}>Войти</button>
        </div>

    );
}

export default Login;