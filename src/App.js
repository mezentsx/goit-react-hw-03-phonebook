import React, { Component } from 'react';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Container from './components/Container';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  formSubmitHandler = data => {
    let contactName = false;
    const cont = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    for (const contact of this.state.contacts) {
      if (data.name.toLowerCase() === contact.name.toLowerCase()) {
        contactName = true;
      }
    }

    if (!contactName) {
      this.setState(({ contacts }) => ({
        contacts: [cont, ...contacts],
      }));
    } else {
      alert(data.name + ' is already in contacts');
    }
  };

  contactFilterHandler = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const filteredContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className={s.title}>Contacts</h2>
        {this.state.contacts.length ? (
          <>
            <Filter
              filter={this.state.filter}
              onFilter={this.contactFilterHandler}
            />
            <ContactList contacts={filteredContacts} onDelete={this.onDelete} />
          </>
        ) : (
          <p>You don't have any contacts</p>
        )}
      </Container>
    );
  }
}
