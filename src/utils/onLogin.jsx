import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {CONFIG} from "../../config.js";

export function scheduledRefresh() {
    const token = Cookies.get('access_token')
    if (!token) return
    const {exp} = jwtDecode(token)
    const msUntil = exp * 1000 - Date.now()
    const ahead = 60 * 1000

    setTimeout(async () => {
        const res = await fetch(CONFIG.API_URL + "/auth/token/refresh", {
            method: "POST", credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        if (!res.ok) {
            location.href = "/login"
            return
        }
        scheduledRefresh()
    }, Math.max(msUntil - ahead, 0))

}

export function onLogin(data) {
    Cookies.set('refresh_token', data.refresh_token, {
        path: '/',
        expires: 90,
        secure: true,
        sameSite: 'Lax',
    });
    Cookies.set('access_token', data.access_token, {
        path: '/',
        expires: 1/24,
        secure: true,
        sameSite: 'Lax',
    });
    location.href = '/';
}