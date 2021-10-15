import React, { Suspense, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import Layout from "./components/layout/Layout";
import Loading from "./components/UI/Loading";
import { remainingTime } from "./store/timerLogoutAction";

const Home = React.lazy(() => import("./pages/Home"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let expiresTime = localStorage.getItem("expirationDate");
    dispatch(remainingTime(expiresTime));
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          {!isLoggedIn && (
            <Route path="/auth">
              <Auth />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
