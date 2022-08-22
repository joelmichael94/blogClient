import React, { useState } from "react";

function AddComment({ data, getPosts, decoded }) {
    const [comment, setComment] = useState(data.comments);

    const onChangeHandler = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}comments/` + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(comment),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                getPosts();
            });
    };

    return (
        <form
            method="POST"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler(data._id);
                e.target.reset();
            }}
        >
            <div className="flex justify-center items-center">
                <textarea
                    type="text"
                    name="description"
                    rows="2"
                    cols="30"
                    className="rounded-md px-2 py-1"
                    onChange={onChangeHandler}
                ></textarea>
                <button
                    className="text-sm rounded-lg px-4 py-2 ml-2"
                    data-theme="night"
                >
                    Comment
                </button>
            </div>
        </form>
    );
}

export default AddComment;
