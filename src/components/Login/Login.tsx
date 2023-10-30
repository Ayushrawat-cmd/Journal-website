"use client";
import { useRouter } from "next/navigation";
import useInput from "../custom-hooks/useInput";
import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    value: emailInputValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputValueHandler: emailInputHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value: String) => {
    return value.includes("@");
  });
  const {
    value: passwordInputValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputValueHandler: passwordInputHandler,
    valueInputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value: String) => {
    return value.length >= 5;
  });
  const submitHandler = async (event: any) => {
    event.preventDefault();
    if (!passwordIsValid || !emailIsValid) return;
    passwordReset();
    emailReset();
    try{
      const res = await toast.promise(
        axios.post("/api/users/login", {
          email: emailInputValue,
          password: passwordInputValue,
        }),
        {
          pending: "Logging in",
          success: "You're logged in!",
          error: "Not logged in",
        }
      );
      // const res = await
      // console.log(res.data);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }


    }
    catch(error){
      console.log(error.message); 
    }
  };
  const emailClasses = emailHasError ? "form-input invalid" : "form-input";
  const passwordClasses = passwordHasError
    ? "form-input invalid"
    : "form-input";
  return (
    <section className="container">
      <form>
        {/* <!-- LOGN IN FORM by Omar Dsoky --> */}
        {/* <!--   con = Container  for items in the form--> */}
        <div className="con">
          {/* <!--     Start  header Content  --> */}
          <header className="head-form">
            <h2>Log In</h2>
            {/* <!--     A welcome message or an explanation of the login form --> */}
            <p>login here using your username and password</p>
          </header>
          {/* <!--     End  header Content  --> */}
          <br></br>
          <div className="field-set">
            {/* <!--   user name --> */}
            <span className="input-item">
              <i className="fa fa-user-circle"></i>
            </span>
            {/* <!--   user name Input--> */}
            <input
              onChange={emailInputHandler}
              value={emailInputValue}
              onBlur={emailBlurHandler}
              className={emailClasses}
              id="txt-input"
              type="text"
              placeholder="Email ID"
              required
            ></input>

            <br></br>

            {/* <!--   Password --> */}

            <span className="input-item">
              <i className="fa fa-key"></i>
            </span>
            {/* <!--   Password Input--> */}
            <input
              value={passwordInputValue}
              onBlur={passwordBlurHandler}
              onChange={passwordInputHandler}
              className={passwordClasses}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="pwd"
              name="password"
              required
            ></input>
            {/* <!--      Show/hide password  --> */}
            <span>
              <i
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="fa fa-eye"
                aria-hidden="true"
                typeof="button"
                id="eye"
              ></i>
            </span>

            <br></br>
            {/* <!--        buttons -->
        <!--      button LogIn --> */}
            <button onClick={submitHandler} className="log-in">
              {" "}
              Log In{" "}
            </button>
          </div>

          {/* <!--   other buttons --> */}
          <div className="other">
            {/* <div className="social">
              <div className="go">
                <i className="fab fa-google"></i> Google
              </div>
              <div className="fb">
                <i className="fab fa-facebook"></i> Facebook
              </div>
            </div> */}
            {/* <!--      Forgot Password button--> */}
            <button className="btn submits frgt-pass">Forgot Password</button>
            {/* <!--     Sign Up button --> */}
            <Link href="/signup">
              <button className="btn submits sign-up">
                New User? <br></br>Sign Up
                {/* <!--         Sign Up font icon --> */}
                <i className="fa fa-user-plus" aria-hidden="true"></i>
              </button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
