import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditPost({ data, setEditing, getPosts }) {
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: data.title,
        description: data.description,
    });

    const onChangeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}posts/` + id, {
            method: "PUT",
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
                setEditing(false);
            });
    };

    return (
        <form
            method="POST"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler(data._id);
                // e.target.reset();
            }}
        >
            <label className="font-medium mx-2">Update Post: </label>
            <input
                type="text"
                value={post.title}
                name="title"
                onChange={onChangeHandler}
                className="mx-2 rounded-lg px-4 py-2 my-2 w-72"
            ></input>
            <input
                type="text"
                value={post.description}
                name="description"
                onChange={onChangeHandler}
                className="mx-2 rounded-lg px-4 py-2 my-2 w-72"
            ></input>
            <button className="rounded-lg bg-secondary-content text-white py-2 px-4 mx-2 my-2">
                Confirm
            </button>
        </form>
    );
}

export default EditPost;
