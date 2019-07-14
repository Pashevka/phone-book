import React, { Component } from 'react'
import './phone-book.css'

import { withApiWrapper } from '../hoc'

import Contact from '../contact'
import CreateNew from '../create-new-contact'

import { createFileWithContacts, readFileWithContacts } from './work-with-files'

class PhoneBook extends Component {
	bodyRef = React.createRef()
	state = {
		contacts: [],
		page: 1,
		freezeRequester: true,
		showCreateNew: false
	}
	constructor(props) {
		super(props)
		this.getNextPage(true)
	}
	componentDidMount() {
		this.bodyRef.current.addEventListener('scroll', this.scrollHandler)
	}
	componentWillUnmount() {
		this.bodyRef.current.removeEventListener('scroll', this.scrollHandler)
	}
	getNextPage = (init = false) => {
		if (this.state.freezeRequester && !init) {
			return
		}
		if (!init) {
			this.setState({
				freezeRequester: true
			})
		}
		this.props.apiWrapper
			.getContacts(this.state.page)
			.then((res) => {
				if (res.length === 0) return
				this.setState(
					({ contacts, page }) => {
						return {
							contacts: [
								...contacts,
								...res
							],
							page: page + 1,
							freezeRequester: false
						}
					},
					() => {
						this.scrollHandler()
					}
				)
			})
			.catch((err) => {
				alert(err)
			})
	}
	scrollHandler = () => {
		if (this.bodyRef.current.scrollHeight < this.bodyRef.current.scrollTop + this.bodyRef.current.offsetHeight + 10) {
			this.getNextPage()
		}
	}
	toggleCreateNew = () => {
		this.setState(({ showCreateNew }) => {
			return {
				showCreateNew: !showCreateNew
			}
		})
	}
	onDelete = (id) => {
		var tempArray = [
			...this.state.contacts
		]
		tempArray.splice(
			tempArray.findIndex((item) => {
				return item.id === id
			}),
			1
		)
		this.setState({
			contacts: tempArray
		})
	}
	onCreate = (contact) => {
		this.setState(({ contacts }) => {
			return {
				contacts: [
					...contacts,
					contact
				]
			}
		})
	}
	saveContacts = () => {
		createFileWithContacts(this.state.contacts)
	}
	onFileInputChange = (e) => {
		readFileWithContacts(e.target.files)
			.then((res) => {
				let newArray = []
				console.log(res)
				for (let newContact of res) {
					let findedContact = this.state.contacts.filter((oldContact) => {
						return oldContact.name === newContact.name && oldContact.phone === newContact.phone
					})
					let duplicate = newArray.filter((duplicateContact) => {
						return duplicateContact.name === newContact.name && duplicateContact.phone === newContact.phone
					})
					if (findedContact.length === 0 && duplicate.length === 0) {
						newArray.push(newContact)
					}
				}
				this.recurCreatingContacts(newArray)
			})
			.catch((err) => {
				if (err) {
					alert(err)
				} else {
					alert('This file is not valid for application')
				}
			})
	}
	recurCreatingContacts = (contactArray) => {
		if (contactArray.length === 0) return
		this.props.apiWrapper.createContact(contactArray[0]).then((res) => {
			this.onCreate(res)
			contactArray.shift()
			this.recurCreatingContacts(contactArray)
		})
	}
	render() {
		return (
			<div className="app-phone-book mt-4 container">
				<div className="card">
					<div className="card-header d-flex justify-content-between">
						<h4>Contacts</h4>
						<div className="btn-container">
							<input onChange={this.onFileInputChange} type="file" />
							<button type="button" className="btn btn-primary btn-sm">
								Open file
							</button>
						</div>
					</div>
					<div ref={this.bodyRef} className="card-body book-body p-0">
						<div className="list-group">
							{this.state.contacts.map((item) => {
								return <Contact onDelete={this.onDelete} key={item.id} contact={item} />
							})}
						</div>
					</div>
					<div className="card-footer position-relative ">
						<div className="footer-wrapper d-flex justify-content-between">
							<button onClick={this.toggleCreateNew} type="button" className="btn btn-primary btn-sm">
								Add new
							</button>
							<button onClick={this.saveContacts} type="button" className="btn btn-primary btn-sm">
								Save contacts
							</button>
						</div>
						{this.state.showCreateNew ? (
							<CreateNew onCreate={this.onCreate} onClose={this.toggleCreateNew} />
						) : null}
					</div>
				</div>
			</div>
		)
	}
}
export default withApiWrapper()(PhoneBook)
