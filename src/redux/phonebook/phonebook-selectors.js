import { createSelector } from "@reduxjs/toolkit";

const getContacts = (state) => state.phonebook.contacts;

const getFilter = (state) => state.phonebook.filter;

const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizedContactNames = filter.toString().toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedContactNames)
    );
  }
);

export default { getContacts, getFilter, getVisibleContacts };
