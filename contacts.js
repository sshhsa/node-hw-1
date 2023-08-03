const fs = require('fs/promises');
const path = require('path');

//  Розкоментуй і запиши значення
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

//  Повертає масив контактів.
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return [];
  }
}

/**
 * Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
 * @param {number} contactId - id контакту
 * @returns {Object|null} - об'єкт контакту або null, якщо не знайдено
 */

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

//   Видаляє контакт за заданим id і повертає об'єкт видаленого контакту.
//   Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

/**
 * Додає новий контакт і повертає об'єкт доданого контакту.
 * @param {string} name - ім'я контакту
 * @param {string} email - email контакту
 * @param {string} phone - номер телефону контакту
 * @returns {Object} - об'єкт доданого контакту
 */

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
