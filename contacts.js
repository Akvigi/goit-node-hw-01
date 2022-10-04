const path = require('path');
const fs = require('fs').promises;
const contacts = path.join(__dirname, '/db/contacts.json');

const listContacts = async () => {
  fs.readFile(contacts, 'utf-8').then(data => console.log(JSON.parse(data)));
};

const getContactById = async contactId => {
  fs.readFile(contacts, 'utf-8').then(data => {
    const contact = JSON.parse(data).find(item => Number(item.id) === Number(contactId));
    console.log(contact);
  });
};

const removeContact = async contactId => {
  fs.readFile(contacts, 'utf-8').then(data => {
    const filtContacts = JSON.parse(data).filter(item => Number(item.id) !== Number(contactId));
    fs.writeFile(contacts, JSON.stringify(filtContacts, null, 2));
    console.log(`deleted ${contactId} contact`);
  });
};

const addContact = async (name, email, phone) => {
  let newID = 1;
  await fs.readFile(contacts, 'utf-8').then(data => {
    const changedContacts = JSON.parse(data);
    for (const us in changedContacts) {
      if (Number(changedContacts[us].id) !== newID) {
        break;
      }
      newID += 1;
    }
    const user = {
      id: newID.toString(),
      name: name,
      email: email,
      phone: phone,
    };
    changedContacts.push(user);
    const sorted = changedContacts.sort((us1, us2) => us1.id - us2.id);
    fs.writeFile(contacts, JSON.stringify(sorted, null, 2));
    console.log(`added ${user.name} contact: ${JSON.stringify(user, null, 2)}`);
  });
};

const contactsActions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsActions;
