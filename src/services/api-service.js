import { json_server_port } from '../constants'
export default class ApiService {
	constructor() {
		this._apiBase = `http://localhost:${json_server_port}`
	}
	getOptions = (method, body) => {
		return {
			headers: {
				'Content-Type': 'application/json'
			},
			method: method,
			body: JSON.stringify(body)
		}
	}

	async getContactById(id) {
		const res = await fetch(`${this._apiBase}/contacts/${id}`, this.getOptions('GET'))

		if (!res.ok) {
			return new Error('Can`t fetch data. Are you enable json-server')
		}
		return await res.json()
	}
	async getContacts(page) {
		const res = await fetch(`${this._apiBase}/contacts?_page=${page}&_limit=4`, this.getOptions('GET'))

		if (!res.ok) {
			return new Error('Can`t fetch data. Are you enable json-server')
		}
		return await res.json()
	}
	async deleteContact(id) {
		const res = await fetch(`${this._apiBase}/contacts/${id}`, this.getOptions('DELETE'))

		if (!res.ok) {
			return new Error('Can`t fetch data. Are you enable json-server')
		}
		return await res.json()
	}
	async createContact(contact) {
		const res = await fetch(`${this._apiBase}/contacts`, this.getOptions('POST', contact))
		if (!res.ok) {
			return new Error('Can`t fetch data. Are you enable json-server')
		}
		return await res.json()
	}
	async getBiggestId() {
		const res = await fetch(`${this._apiBase}/contacts?_sort=id&_order=desc&_limit=1`, this.getOptions('GET'))
		if (!res.ok) {
			return new Error('Can`t fetch data. Are you enable json-server')
		}
		return await res.json()
	}
}
