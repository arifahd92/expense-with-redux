import React, { Fragment, useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../storeRedux/authReducer";
//import AuthContext from "./auth-context";
import classes from "./Authentication.module.css";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isCursorAllow, SetisCursorAllow] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confPass, setconfPass] = useState("");
  const history = useNavigate();
  //Redux
  const dispatch = useDispatch();

  // const ctx=useContext(AuthContext)

  const emailChangeHandler = (e) => {
    setemail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setpassword(e.target.value);
    SetisCursorAllow(false);
  };

  const confPassChangeHandler = (e) => {
    setconfPass(e.target.value);
    SetisCursorAllow(false);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  let url;

  const AuthRequest = async () => {
    try {
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCd6ahJjYNQaAxx13PKKsZcxp4-0dqhnjs";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCd6ahJjYNQaAxx13PKKsZcxp4-0dqhnjs";
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseInjson = await response.json();
      console.log(responseInjson);
      console.log(responseInjson.idToken);

      if (responseInjson.error) {
        alert(responseInjson.error.message);
      } else {
        localStorage.setItem("idToken", responseInjson.idToken);
        localStorage.setItem("email", email.replace(/[@.]/g, ""));
        dispatch(authAction.login());
        history("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confPass) {
      return alert("Password is not same");
    } else {
      AuthRequest();
      console.log("loggedIn");
    }
  };

  return (
    <Fragment>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Create new account"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              required
              onChange={emailChangeHandler}
              value={email}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              required
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confpassword">Confirm Password</label>
              <input
                type="password"
                required
                onChange={confPassChangeHandler}
                value={confPass}
              />
            </div>
          )}
          <div className={classes.actions}>
            {isLogin && (
              <Link className={classes.forget} to="/forgotPassword">
                Forgot Password ?
              </Link>
            )}
            <button
              type="submit"
              style={{ cursor: isCursorAllow ? "not-allowed" : "pointer" }}>
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}>
              {isLogin
                ? "Don't have an account sign Up"
                : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Authentication;
