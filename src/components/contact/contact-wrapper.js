import React, { Component } from 'react'
import './contact.css'

import { withApiWrapper } from '../hoc'

import Contact from './contact'

class ContactWrapper extends Component {
	deleteContact = () => {
		this.props.apiWrapper
			.deleteContact(this.props.contact.id)
			.then((res) => {
				console.log(res)
				this.props.onDelete(this.props.contact.id)
			})
			.catch((err) => {
				alert(err)
			})
	}
	render() {
		const { name, phone } = this.props.contact
		return <Contact onDelete={this.deleteContact} name={name} phone={phone} />
	}
}

export default withApiWrapper()(ContactWrapper)
