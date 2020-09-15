/*
 * @Author: Chen Yang
 * @Date: 2020-09-15 14:37:13
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-15 15:07:22
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passconf, setPassconf] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
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
            <h2>Register</h2>
          </li>
          <li>
            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-center red">{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="passconf">Password Confirm</label>
            <input
              type="password"
              name="passconf"
              id="passconf"
              value={passconf}
              onChange={(e) => setPassconf(e.target.value)}
            />
          </li>
          <li>
            <button className="button primary" type="submit">
              Create an Amazona account
            </button>
          </li>
          <li>Already have one?</li>
          <li>
            <Link to="/signin" className="button secondary text-center">
              Sign In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterScreen;
