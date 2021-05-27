import { Component, lazy, Suspense } from "react";
import NavBar from "./components/NavBar/NavBar";
// import HomeView from "./views/HomeView";
// import PhonebookView from "./views/PhonebookView";
// import RegisterView from "./views/RegisterView";
// import LoginView from "./views/LoginView";
import "./styles.css";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import authOperations from "./redux/auth/auth-operations";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomeView = lazy(()=> import('./views/HomeView'))
const PhonebookView = lazy(()=> import('./views/PhonebookView'))
const RegisterView = lazy(()=> import('./views/RegisterView'))
const LoginView = lazy(()=> import('./views/LoginView'))


class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <NavBar />
        <Suspense fallback={<div style={{textAlign: 'center', paddingTop: 150}}><Loader type='Circles'/></div>}>
          <Switch>
            <Route path="/home" component={HomeView} />
            <PrivateRoute
              path="/contacts"
              component={PhonebookView}
              redirectTo="/login"
            />
            <PublicRoute
              path="/register"
              component={RegisterView}
              restricted
              redirectTo="/home"
            />
            <PublicRoute
              path="/login"
              component={LoginView}
              restricted
              redirectTo="/contacts"
            />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
