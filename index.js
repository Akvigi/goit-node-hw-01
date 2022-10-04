const contactsActions = require('./contacts');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      await contactsActions.listContacts();
      break;
    case 'get':
      await contactsActions.getContactById(id);
      break;
    case 'remove':
      await contactsActions.removeContact(id);
      break;
    case 'add':
      await contactsActions.addContact(name, email, phone);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
