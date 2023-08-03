const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const argv = yargs(hideBin(process.argv))
  .option('action', {
    alias: 'a',
    describe: 'Action to perform: list, get, add, remove',
    demandOption: true,
  })
  .option('id', {
    describe: 'Contact ID',
    demandOption: false,
  })
  .option('name', {
    describe: 'Contact Name',
    demandOption: false,
  })
  .option('email', {
    describe: 'Contact Email',
    demandOption: false,
  })
  .option('phone', {
    describe: 'Contact Phone',
    demandOption: false,
  }).argv;

console.log(argv);

async function invokeAction() {
  const { action, id, name, email, phone } = argv;
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.log('All contacts:', allContacts);
      break;

    case 'get':
      if (!id) {
        console.warn('Don`t indicated contact-id for searching');
        return;
      }
      const foundContact = await getContactById(id);
      if (foundContact) {
        console.log('Contact found:', foundContact);
      } else {
        console.log('Contact is not found');
      }
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.warn('Don`t indicated all necessary arguments to add contact');
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.log('New contact:', newContact);
      break;

    case 'remove':
      if (!id) {
        console.warn('Don`t indicated contact id to remove.');
        return;
      }
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.log('Removed contact:', removedContact);
      } else {
        console.log('Contact id not found.');
      }
      break;

    default:
      console.warn('\x1B[31m Undefined action type!');
  }
}

invokeAction();
