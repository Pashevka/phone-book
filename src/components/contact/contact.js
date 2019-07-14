import React, { Component } from 'react'
import './contact.css'

export default class Contact extends Component {
	mainRef = React.createRef()
	btnRef = React.createRef()
	componentDidMount() {
		setTimeout(() => {
			this.mainRef.current.classList.add('shown')
		}, 0)
	}
	onDelete = () => {
		this.mainRef.current.classList.remove('shown')
		this.btnRef.current.setAttribute('disabled', true)
		setTimeout(() => {
			this.props.onDelete()
		}, 0)
	}
	render() {
		const { name, phone } = this.props
		return (
			<div className="app-contact ">
				<div ref={this.mainRef} className="app-contact-wrapper d-flex">
					<ul className="d-flex justify-content-between list-group-item w-100">
						<li className="name">{name}</li>
						<li className="phone">{phone}</li>
						<li className="button">
							<button
								ref={this.btnRef}
								onClick={this.onDelete}
								type="button"
								className="btn btn-danger btn-sm"
							>
								Delete
							</button>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
