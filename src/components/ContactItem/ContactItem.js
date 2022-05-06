import React from 'react';
import s from './ContactItem.module.css';

const ContactItem = ({ onDelete, id, name, number }) => {
  return (
    <li className={s.item}>
      {name}: {number}
      <button type="button" onClick={() => onDelete(id)} className={s.button}>
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
