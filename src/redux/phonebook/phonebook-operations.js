import axios from "axios";
import {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from "./phonebook-actions";

// axios.defaults.baseURL = "http://localhost:4444";.message

const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactRequest());
  return axios
    .get("/contacts")
    .then(({data}) => dispatch(fetchContactSuccess(data)))
    .catch((error) => dispatch(fetchContactError(error.message)));
};

const addContact = (contact) => (dispatch) => {
  dispatch(addContactRequest());
  return axios
    .post("/contacts", contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch((error) => dispatch(addContactError(error.message)));
};

const deleteContact = (id) => (dispatch) => {
  dispatch(deleteContactRequest());
  return axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch((error) => dispatch(deleteContactError(error.message)));
};

export default { fetchContacts ,addContact, deleteContact };
