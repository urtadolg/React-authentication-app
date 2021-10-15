import { useSelector } from "react-redux";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";
import Button from "../UI/Button";

const ProfileForm = () => {
  const history = useHistory();

  const passwordInputRef = useRef();

  const idToken = useSelector((state) => state.auth.idToken);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const newPassword = passwordInputRef.current.value;

    const sendNewPassword = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAnfqIffTVfZJLXygdys9iWVnDecrJbN0A",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            password: newPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error.message);
      }

      return responseData;
    };

    try {
      const responseData = await sendNewPassword();
      history.replace("/");
      console.log(responseData);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <label htmlFor="newPass">New Password</label>
      <input type="password" id="newPass" ref={passwordInputRef} />
      <Button type="submit" className={classes.btn}>
        Change Password
      </Button>
    </form>
  );
};

export default ProfileForm;
