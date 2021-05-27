import PhonebookForm from "../components/Phonebook/PhonebookForm";
import PhonebookList from "../components/Phonebook/PhonebookList";
import Filter from "../components/Phonebook/Filter";
import authSelectors from "../redux/auth/aut-selectors";
import { connect } from "react-redux";

const PhonebookView = ({ isAuth }) => {
  return (
    <div className="app">

          <h1>Phonebook</h1>
          <PhonebookForm />
          <h2>Contacts</h2>
          <Filter />
          <PhonebookList />{" "}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: authSelectors.getIsAuth(state),
});

export default connect(mapStateToProps, null)(PhonebookView);
