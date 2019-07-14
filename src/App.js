import React, { Component } from 'react'
import './App.css'
import PhoneBook from './components/phone-book'
export default class App extends Component {
	render() {
		return (
			<div className="App">
				<PhoneBook />
			</div>
		)
	}
}
