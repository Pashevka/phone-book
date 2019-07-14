import ApiService from './api-service'
import { syntheticDelay } from '../constants'
export default class ApiWrapper {
	constructor(props) {
		this.apiService = new ApiService()
	}
	async getContactById(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.apiService
					.getContactById(id)
					.then((res) => {
						resolve(res)
					})
					.catch((err) => {
						reject(err)
					})
			}, syntheticDelay)
		})
	}
	async getContacts(page = 1) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.apiService
					.getContacts(page)
					.then((res) => {
						resolve(res)
					})
					.catch((err) => {
						reject(err)
					})
			}, syntheticDelay)
		})
	}
	async deleteContact(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.apiService
					.deleteContact(id)
					.then((res) => {
						resolve(res)
					})
					.catch((err) => {
						reject(err)
					})
			}, syntheticDelay)
		})
	}
	async createContact(contact) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.apiService
					.createContact(contact)
					.then((res) => {
						resolve(res)
					})
					.catch((err) => {
						reject(err)
					})
			}, syntheticDelay)
		})
	}
	async getBiggestId() {
		return await this.apiService.getBiggestId()
	}
}
