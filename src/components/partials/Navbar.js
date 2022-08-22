import React from "react";
import { Link } from "react-router-dom";

function Navbar({ logoutHandler }) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link
                    className="btn btn-ghost normal-case text-xl italic"
                    to="/"
                >
                    Bloggie
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered"
                    />
                </div>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex="0"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src="https://placeimg.com/80/80/people"
                                alt=""
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex="0"
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        {localStorage.hasOwnProperty("token") ? (
                            <>
                                <li>
                                    <a className="justify-between" href="#0">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <Link to="/add-post">Add Post</Link>
                                </li>
                                <li>
                                    <button onClick={logoutHandler}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
