import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import authSelectors from "../redux/auth/aut-selectors";

const PublicRoute = ({ component: Component, isAuth, redirectTo, ...routesProps }) => (
  <Route
    {...routesProps}
    render={(props) =>
      isAuth && routesProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
    isAuth: authSelectors.getIsAuth(state)
})



export default connect(mapStateToProps)(PublicRoute)