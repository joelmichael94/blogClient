import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                var type = data.code == 400 ? toast.error : toast.success;
                type(data.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon: "🐉",
                });
                if (!data.code) {
                    localStorage.setItem("token", data.token);
                    setAuth(true);
                    navigate("/");
                }
            });
    };

    return (
        <div className="flex justify-center w-100 my-48">
            <form onSubmit={onSubmitHandler} method="POST">
                <div className="form-control mb-6">
                    <label className="text-lg font-medium grid justify-center">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="rounded p-1 text-black"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-control mb-6">
                    <label className="text-lg font-medium grid justify-center">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="rounded p-1 text-black"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="flex justify-end">
                    <button className="py-1 px-4 mt-5 rounded font-medium text-lg border-2 border-blue-200 hover:border-yellow-400 hover:text-yellow-400">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
