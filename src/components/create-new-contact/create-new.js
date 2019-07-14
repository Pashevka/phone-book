import React, { Component } from 'react'
import './create-new.css'

class CreateNew extends Component {
	mainRef = React.createRef()
	nameRef = React.createRef()
	phoneRef = React.createRef()
	componentDidMount() {
		setTimeout(() => {
			this.mainRef.current.classList.add('visible')
		}, 0)
	}
	close = () => {
		this.mainRef.current.classList.remove('visible')
		setTimeout(() => {
			this.props.onClose()
		}, 300)
	}
	createNewContact = () => {
		console.log(this.nameRef.current.value)
		const nameInput = this.nameRef.current
		const phoneInput = this.phoneRef.current
		let hasErrors = false
		if (nameInput.value.length === 0) {
			nameInput.classList.add('is-invalid')
			hasErrors = true
		} else {
			nameInput.classList.remove('is-invalid')
		}
		if (phoneInput.value.length === 0) {
			phoneInput.classList.add('is-invalid')
			hasErrors = true
		} else {
			phoneInput.classList.remove('is-invalid')
		}
		if (!hasErrors) {
			let contact = {
				name: nameInput.value,
				phone: phoneInput.value
			}
			this.props.onCreate(contact)
			this.mainRef.current.classList.remove('visible')
			setTimeout(() => {
				this.props.onClose()
			}, 300)
		}
	}
	render() {
		return (
			<div ref={this.mainRef} className="create-new card">
				<div className="card-body">
					<div className="form-group">
						<label htmlFor="nameInput">Name</label>
						<input
							ref={this.nameRef}
							type="text"
							className="form-control form-control-sm "
							id="nameInput"
							aria-describedby="emailHelp"
							placeholder="Enter name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="phoneInput">Password</label>
						<input
							ref={this.phoneRef}
							type="number"
							className="form-control form-control-sm"
							id="phoneInput"
							placeholder="Password"
						/>
					</div>
				</div>
				<div className="card-footer d-flex justify-content-between">
					<button onClick={this.close} type="button" className="btn btn-info btn-sm">
						Cancel
					</button>
					<button onClick={this.createNewContact} type="button" className="btn btn-primary btn-sm">
						Save
					</button>
				</div>
			</div>
		)
	}
}
export default CreateNew
