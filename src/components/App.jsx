import { ContactList } from '../components/contactList/ContactList';
import { ContactForm } from '../components/contactForm/ContactForm';
import { Filter } from '../components/filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { Blocks } from 'react-loader-spinner';
import { addContact, removeContacts, fetchContacts } from '../redux/operations';
import { handlFiltration } from '../redux/contactsReducer';
import { useEffect } from 'react';
import {
  selectContacts,
  selectContactsError,
  selectContactsFilter,
  selectContactsIsLoading,
} from '../redux/contact.selectors';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectContactsFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addContacts = contactData => {
    if (
      contacts.some(
        contact =>
          contact.name.toLocaleLowerCase() ===
          contactData.name.toLocaleLowerCase()
      )
    ) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(contactData));
  };

  const delitContacts = id => {
    dispatch(removeContacts(id));
  };

  const Filtration = event => {
    dispatch(handlFiltration(event.target.value));
  };

  const filteredContacts = () => {
    const normalizedContacts =
      typeof filter === 'string' ? filter.toLocaleLowerCase() : '';
    return contacts
      ? contacts.filter(contact =>
          contact.name.toLocaleLowerCase().includes(normalizedContacts)
        )
      : [];
  };

  const afterFiltration = filteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContacts} />
      {error && window.alert(error)}
      {isLoading && (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
        />
      )}
      <h2>Contacts</h2>
      <Filter value={filter} onChange={Filtration} />
      <ContactList contacts={afterFiltration} onDelit={delitContacts} />
    </div>
  );
}
