import { AuthActions } from "./authSlicer";

export const remainingTime = (expiresTime) => {
  return async (dispatch) => {
    const calculateRemainingTime = (expiresTime) => {
      const currentTime = new Date().getTime();
      const remainingTime = expiresTime - currentTime;
      console.log(currentTime);
      return remainingTime;
    };

    const remainingTime = calculateRemainingTime(expiresTime);
    console.log(remainingTime);
    setTimeout(() => {
      dispatch(AuthActions.logout());
    }, remainingTime);
  };
};
