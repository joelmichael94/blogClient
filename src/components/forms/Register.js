import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register({ setAuth, getPosts }) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        password2: "",
    });

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (user.password !== user.password2)
            toast.error("Passwords do not match!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                icon: "🐲",
            });
        fetch(`${process.env.REACT_APP_API_URL}users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                var type = data.code == 400 ? toast.error : toast.success;
                type(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon: "🐲",
                });
                if (!data.code) {
                    localStorage.setItem("users", data.user);
                    setAuth(true);
                    getPosts();
                    navigate("/");
                }
            });
    };

    return (
        <div className="flex justify-center w-100 my-28">
            <form onSubmit={onSubmitHandler} method="POST">
                <div className="form-control mb-6">
                    <label className="text-lg font-medium grid justify-center">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="rounded p-1 text-black"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-control mb-6">
                    <label className="text-lg font-medium grid justify-center">
                        Username
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
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="rounded p-1 text-black"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-control mb-6">
                    <label className="text-lg font-medium grid justify-center">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password2"
                        className="rounded p-1 text-black"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="flex justify-end">
                    <button className="py-1 px-4 mt-5 rounded font-medium text-lg border-2 border-blue-200 hover:border-yellow-400 hover:text-yellow-400">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
