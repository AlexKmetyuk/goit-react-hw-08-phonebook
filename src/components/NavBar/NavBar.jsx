import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import authSelectors from "../../redux/auth/aut-selectors";
import authOperations from "../../redux/auth/auth-operations";
import "./styles.css";

const NavBar = ({ isAuth, username, onLogout }) => {
  return (
    <header>
      <nav>
        <div>
          <NavLink
            className="nav--btn"
            activeClassName="nav--btn__active"
            to="/home"
          >
            HOME
          </NavLink>
          {isAuth && (
            <NavLink
              className="nav--btn"
              activeClassName="nav--btn__active"
              to="/contacts"
            >
              PHONEBOOK
            </NavLink>
          )}
        </div>

        <div className="user-nav">
          {isAuth ? (
            <>
              <span style={{ margin: 0, marginRight: 10 }}>
                Welcome, {username}!
              </span>
              <button type="button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="user-btn"
                activeClassName="user-btn-active"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="user-btn"
                activeClassName="user-btn-active"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuth: authSelectors.getIsAuth(state),
  username: authSelectors.getUsername(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
