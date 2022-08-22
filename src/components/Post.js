import React, { useState } from "react";
import Swal from "sweetalert2";
import EditPost from "./forms/EditPost";
import Comment from "./Comment";

function Post({ data, decoded, getPosts }) {
    const [editing, setEditing] = useState(false);

    const likeHandler = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}likes/` + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: true,
                    timer: 1000,
                });
                getPosts();
            });
    };

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This post will be gone forever!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}posts/` + id, {
                    method: "DELETE",
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                    },
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
                    });
            }
        });
    };

    let liked =
        decoded && data.likes.length > 0
            ? data.likes.find((data) => data.userId == decoded.data._id)
            : null;

    return (
        <div className="card w-96 bg-primary text-primary-content my-10">
            <div className="card-body">
                <div>
                    {editing ? (
                        <EditPost
                            data={data}
                            setEditing={setEditing}
                            getPosts={getPosts}
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-2 mb-5">
                                <h2 className="card-title">{data.title}</h2>
                                {/* <div className="grid grid-cols-2 my-4">
                                    <p>{comment.description}</p>
                                    <span className="flex justify-end text-xs">
                                        posted by {decoded.data.name}
                                    </span>
                                </div> */}
                                <div className="flex justify-end items-center">
                                    <span>
                                        {data.likes.length != 1
                                            ? data.likes.length + " likes"
                                            : data.likes.length + " like"}
                                    </span>
                                    <span
                                        className="mx-2 text-2xl"
                                        onClick={() => likeHandler(data._id)}
                                    >
                                        {decoded && !liked ? (
                                            "👍🏼"
                                        ) : decoded && liked ? (
                                            "👎🏼"
                                        ) : (
                                            <></>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p>{data.description}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="card-actions justify-end mt-7">
                    {decoded && data.author == decoded.data._id ? (
                        <>
                            <button
                                className="rounded-lg py-1 px-4"
                                onClick={() => setEditing(!editing)}
                                data-theme="night"
                            >
                                {editing ? "Cancel" : "Edit"}
                            </button>
                            <button
                                className="rounded-lg py-1 px-4 bg-rose-500 text-white"
                                onClick={() => deleteHandler(data._id)}
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <h1 className="card-title underline border-t flex justify-center pt-5">
                Comments
            </h1>
            <div>
                <Comment data={data} decoded={decoded} getPosts={getPosts} />
            </div>
        </div>
    );
}

export default Post;
