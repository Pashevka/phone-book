import React, { Component } from 'react'

import { withApiWrapper } from '../hoc'
import CreateNew from './create-new'

class CreateNewWrapper extends Component {
	onCreate = (contact) => {
		this.props.apiWrapper.createContact(contact).then((res) => {
			console.log(res)
			this.props.onCreate({ ...contact, id: res.id })
		})
	}
	render() {
		return <CreateNew onCreate={this.onCreate} onClose={this.props.onClose} />
	}
}
export default withApiWrapper()(CreateNewWrapper)
