import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./AuthForm.module.css";
import { AuthActions } from "../../store/authSlicer";
import { remainingTime } from "../../store/timerLogoutAction";

import Loading from "../UI/Loading";

const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const isCreating = useSelector((state) => state.auth.isCreating);
  const isLoadingRequest = useSelector((state) => state.auth.isLoadingRequest);

  const dispatch = useDispatch();

  const onCreateAccountHandler = () => {
    dispatch(AuthActions.enterSignUp());
  };

  const onLoginExistingAccountHandler = () => {
    dispatch(AuthActions.leavingSignUp());
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url = "";

    if (isCreating) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnfqIffTVfZJLXygdys9iWVnDecrJbN0A";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnfqIffTVfZJLXygdys9iWVnDecrJbN0A";
    }

    const signUpRequest = async () => {
      dispatch(AuthActions.startLoading());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      dispatch(AuthActions.stopLoading());

      if (!response.ok) {
        throw new Error(responseData.error.message);
      }

      return responseData;
    };

    try {
      const feedback = await signUpRequest();
      const idToken = feedback.idToken;
      const expiresIn = +feedback.expiresIn * 1000;
      const expiresTime = new Date().getTime() + expiresIn;
      history.replace("/");
      dispatch(
        AuthActions.login({
          idToken,
          expiresTime,
        })
      );
      dispatch(remainingTime(expiresTime));
    } catch (error) {
      console.log(error);

      alert(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <span className={classes.title}>{isCreating ? "Sign Up" : "Login"}</span>
      <div>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" ref={emailInputRef} />
      </div>
      <div>
        <label htmlFor="password">Your Password</label>
        <input type="password" id="password" ref={passwordInputRef} />
      </div>
      <div>
        {isLoadingRequest ? (
          <Loading className={classes.loadingWheel} />
        ) : (
          <Button type="submit" className={classes.buttonSubmit}>
            {isCreating ? "Create Account" : "Login"}
          </Button>
        )}
      </div>
      <div>
        {isCreating ? (
          <button
            className={classes.btn}
            type="button"
            onClick={onLoginExistingAccountHandler}
          >
            Login with existing account
          </button>
        ) : (
          <button
            className={classes.btn}
            type="button"
            onClick={onCreateAccountHandler}
          >
            Create new account
          </button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
