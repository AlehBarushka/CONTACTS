import axios from 'axios';

export class ContactService {
	static serverURL = `http://localhost:9000`;

	static getAllContacts() {
		let dataURL = `${this.serverURL}/contacts`;
		return axios.get(dataURL);
	}

	static getContact(id) {
		let dataURL = `${this.serverURL}/contacts/${id}`;
		return axios.get(dataURL);
	}

	static getAllGoups() {
		let dataURL = `${this.serverURL}/groups`;
		return axios.get(dataURL);
	}

	static getGroup(contact) {
		let groupId = contact.groupId;
		let dataURL = `${this.serverURL}/groups/${groupId}`;
		return axios.get(dataURL);
	}
}
