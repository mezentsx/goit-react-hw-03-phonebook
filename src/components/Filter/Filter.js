import React from 'react';
import { nanoid } from 'nanoid';
import s from './Filter.module.css';

const Filter = ({ filter, onFilter }) => {
  const inputFilter = nanoid();

  return (
    <>
      <h3 className={s.title}>Find contacts by name</h3>
      <label htmlFor={inputFilter} className={s.label}>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={onFilter}
          id={inputFilter}
          className={s.input}
        />
      </label>
    </>
  );
};

export default Filter;
