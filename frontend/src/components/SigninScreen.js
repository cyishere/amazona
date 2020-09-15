/*
 * @Author: chen yang
 * @Date: 2020-09-15 13:18:09
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 14:08:05
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo]);

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
            <Link to="/register" className="button secondary text-center">
              Create your own Amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SigninScreen;
