import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import ApiWrapper from './services/api-wrapper'
import { ApiWrapperProvider } from './components/hoc/api-wrapper/api-wrapper-context'

const apiService = new ApiWrapper()

ReactDOM.render(
	<ApiWrapperProvider value={apiService}>
		<App />
	</ApiWrapperProvider>,
	document.getElementById('root')
)
