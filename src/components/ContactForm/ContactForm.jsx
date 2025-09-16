import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberChange = e => {
    let value = e.target.value;

    value = value.replace(/(?!^\+)[^\d-]/g, '');
    if (value.indexOf('+') > 0) {
      value = value.replace(/\+/g, '');
    }

    this.setState({
      number: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    });

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.formField}>
          <p className={css.formLabel}>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={this.handleNameChange}
          />
        </label>

        <label className={css.formField}>
          <p className={css.formLabel}>Number</p>
          <input
            type="text"
            name="number"
            inputMode="numeric"
            pattern="^\+?[0-9\-]+$"
            title="Phone number may start with +, contain digits and dashes"
            required
            value={number}
            onChange={this.handleNumberChange}
          />
        </label>

        <button className={css.formButton} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
