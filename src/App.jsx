import Layout from "./layouts/Layout.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Search from "./pages/Search.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Logout from "./pages/Logout.jsx";
import {useEffect} from "react";
import {scheduledRefresh} from "./utils/onLogin.jsx";

function App() {

    useEffect(() => {
        scheduledRefresh()
    }, []);

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="search" element={<Search/>}></Route>
                <Route path="games/:plug" element={<Game/>}></Route>
                <Route path="cat/:cat" element={<Home/>}></Route>
                <Route path="signup" element={<SignUp/>}></Route>
                <Route path="logout" element={<Logout/>}></Route>
                <Route path="login" element={<Login/>}></Route>
            </Route>
            <Route path="*" element={<h1 className="text-xl">Страница не найдена / Page not found</h1>}/>
        </Routes>
    )
}

export default App
