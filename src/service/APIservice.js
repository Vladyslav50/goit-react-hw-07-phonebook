import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://659ae7a9d565feee2daaa796.mockapi.io/contacts',
});

export const reqestAllContacts = async () => {
  const { data } = await contactsInstance.get('/contacts');
  return data;
};

export const reqestAddContact = async contact => {
  const { data } = await contactsInstance.post('/contacts', contact);
  return data;
};

export const reqestDeleteContact = async contactId => {
  const { data } = await contactsInstance.delete(`/contacts/${contactId}`);
  return data;
};
