import { Component } from "react";
import { connect } from "react-redux";
import phonebookOperations from "../../redux/phonebook/phonebook-operations";
import phonebookSelectors from '../../redux/phonebook/phonebook-selectors'
import { v4 as uuidv4 } from "uuid";

class PhonebookForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleCheckUniqueContact(this.state.name)) {
      this.reset();
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };

  handleCheckUniqueContact = (name) => {
    const check = this.props.contacts.find((contact) => {
      return contact.name === name;
    });
    if (check) {
      alert("Contact is already exist");
      return check;
    }
  };

  reset = () => {
    this.setState({ id: uuidv4(), name: "", number: "" });
  };

  render() {
    return (
      <form className={"form"} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getContacts(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => {
    dispatch(phonebookOperations.addContact(contact));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookForm);
