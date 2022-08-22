import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddPost({ getPosts }) {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        description: "",
    });

    const onChangeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: true,
                    timer: 4000,
                });
                getPosts();
                navigate("/");
                e.target.reset();
            });
    };

    return (
        <form onSubmit={onSubmitHandler} method="POST">
            <label className="text-4xl font-medium grid justify-center mb-6">
                Blog
            </label>
            <div className="flex justify-center">
                <input
                    type="text"
                    name="title"
                    onChange={onChangeHandler}
                    className="border-2 border-slate-400 rounded-lg w-4/5 p-2 m-3 text-black"
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="description"
                    onChange={onChangeHandler}
                    className="border-2 border-slate-400 rounded-lg w-4/5 p-2 m-3 text-black"
                    placeholder="Description"
                />
            </div>
            <div className="flex justify-center">
                <button className="border border-blue-200 hover:border-yellow-400 hover:text-yellow-400 text-slate-600 text-lg rounded-lg font-medium px-6 py-2">
                    Add Post
                </button>
            </div>
        </form>
    );
}
export default AddPost;
