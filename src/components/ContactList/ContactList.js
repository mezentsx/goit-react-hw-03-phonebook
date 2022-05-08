import React from 'react';
import ContactItem from '../ContactItem';
import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            id={id}
            onDelete={onDelete}
            name={name}
            number={number}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.node,
};
