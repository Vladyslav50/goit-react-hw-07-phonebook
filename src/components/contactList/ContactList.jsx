import React from 'react';
import { useSelector } from 'react-redux';
import css from '../App.module.css';

export const ContactList = ({ onDelit }) => {
  const contacts = useSelector(state => state.contacts.items);
  return (
    <ul>
      {contacts &&
        contacts.map(({ id, name, phone }) => {
          return (
            <li key={id}>
              <span>{name}</span>: <b>{phone}</b>{' '}
              <button
                className={css.add_btn}
                type="button"
                onClick={() => onDelit(id)}
              >
                Remove
              </button>
            </li>
          );
        })}
    </ul>
  );
};
