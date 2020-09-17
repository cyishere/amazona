/*
 * @Author: chen yang
 * @Date: 2020-09-15 13:18:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-17 16:58:32
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";

const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    props.history.push("/");
  };

  useEffect(() => {
    // console.log("userInfo in sigin page:", userInfo);
    if (userInfo.hasOwnProperty("name")) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center red">{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button className="button primary" type="submit">
              Signin
            </button>
          </li>
          <li>New to Amazona?</li>
          <li>
            <Link
              to={
                redirect === "/"
                  ? "/register"
                  : `/register?redirect=${redirect}`
              }
              className="button secondary text-center"
            >
              Create your own Amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SigninScreen;
