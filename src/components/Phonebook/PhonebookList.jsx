import { Component } from "react";
import { connect } from "react-redux";
import phonebookOperations from "../../redux/phonebook/phonebook-operations.js";

class PhonebookList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <ul>
        {this.props.contacts.map((contact) => (
          <li key={contact.id}>
            <p>
              📱 {contact.name}: {contact.number}
            </p>
            <button className='btnRemove'
              onClick={() => {
                this.props.onRemove(contact.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const getVisibleContacts = (allContacts, filter) => {
  const normalizedContactNames = filter.toString().toLowerCase();
  return allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedContactNames)
  );
};

const mapStateToProps = ({ phonebook: { contacts, filter } }) => ({
  contacts: getVisibleContacts(contacts, filter),
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => {
    dispatch(phonebookOperations.fetchContacts());
  },
  onRemove: (id) => {
    dispatch(phonebookOperations.deleteContact(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookList);
