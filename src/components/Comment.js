import React, { useState } from "react";
import AddComment from "./forms/AddComment";

function Comment({ data, decoded, getPosts }) {
    const [comments, setComments] = useState({
        comment: data.comments,
    });

    let showComments = (
        <>
            {comments.comment.length > 0
                ? comments.comment.map((comment) => (
                      <div
                          className="grid grid-cols-2 my-3 border-b"
                          key={comment._id}
                      >
                          <p>{comment.description}</p>
                          <span className="flex justify-end text-2xs">
                              author
                              {/* need to map the users to match user._id == comment.userId */}
                          </span>
                          {/* {decoded && decoded.data._id == data.comment.userId} */}
                      </div>
                  ))
                : null}
        </>
    );

    const deleteHandler = (e) => {};

    return (
        <div>
            <div className="card-body">
                {showComments ? (
                    <>{showComments}</>
                ) : (
                    <h1>No comments yet! Be the first to comment!</h1>
                )}
            </div>
            <div className="card-actions flex justify-center mb-5">
                {decoded ? (
                    <AddComment
                        data={data}
                        getPosts={getPosts}
                        decoded={decoded}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Comment;
