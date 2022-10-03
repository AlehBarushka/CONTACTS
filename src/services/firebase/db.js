import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { app } from './';
import { auth } from './auth';

export const db = getFirestore(app);

export const firebaseDB = {
  //get all data from groups collection
  async getGroups() {
    const groups = [];
    const response = await getDocs(collection(db, 'groups'));
    response.forEach((doc) => {
      groups.push(doc.data());
    });
    return groups;
  },
  //get all data from contacts collection
  async getContacts() {
    const contacts = [];
    const response = await getDocs(collection(db, 'contacts'));
    response.forEach((doc) => {
      contacts.push(doc.data());
    });
    return contacts;
  },
  //get one data from contacts collection
  async getContact(id) {
    const docRef = doc(db, 'contacts', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('no document');
    }
  },
  //add contact to contacts collection
  async addContact(contact) {
    // creating a document with the owner field(email of current authorized user)
    const contactObject = { contactOwner: auth.currentUser.email, ...contact };
    const responseData = await addDoc(
      collection(db, 'contacts'),
      contactObject
    );
    // apdate the document - add field id (ID corresponds to the id of the created document)
    const washingtonRef = doc(db, 'contacts', responseData.id);
    await updateDoc(washingtonRef, {
      id: responseData.id,
    });
  },
  //delete contact from contacts collection
  async deleteContact(id) {
    await deleteDoc(doc(db, 'contacts', id));
  },
  //update contact from contacts collection
  async updateContact(id, contact) {
    const washingtonRef = doc(db, 'contacts', id);
    await updateDoc(washingtonRef, contact);
  },
};
