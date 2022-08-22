import React, { useState, useEffect } from "react";
import Navbar from "./components/partials/Navbar";
import Post from "./components/Post";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import { ToastContainer } from "react-toastify";
import AddPost from "./components/forms/AddPost";
import jwt_decode from "jwt-decode";

function App() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [auth, setAuth] = useState(false);

    const getPosts = async () => {
        let res = await fetch(`${process.env.REACT_APP_API_URL}posts`);
        let data = await res.json();
        setPosts(data);
    };

    const decoded = localStorage.getItem("token")
        ? jwt_decode(localStorage.getItem("token"))
        : null;

    useEffect(() => {
        getPosts();
    }, []);

    let showPosts = (
        <div className="grid grid-cols-2 justify-center items-center ml-60">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        data={post}
                        decoded={decoded}
                        getPosts={getPosts}
                    />
                ))
            ) : (
                <h1>No Posts to Show</h1>
            )}
        </div>
    );

    let addPost = (
        <div className="flex justify-center my-5">
            <AddPost getPosts={getPosts} />
        </div>
    );

    let logoutHandler = () => {
        setAuth(false);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <Navbar logoutHandler={logoutHandler} setAuth={setAuth} />
            <ToastContainer />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        posts ? (
                            <>{showPosts}</>
                        ) : (
                            <>
                                <h2>No Posts to Show</h2>
                            </>
                        )
                    }
                />
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route
                    path="/register"
                    element={<Register setAuth={setAuth} getPosts={getPosts} />}
                />
                <Route path="/add-post" element={addPost} />
            </Routes>
        </div>
    );
}

export default App;
