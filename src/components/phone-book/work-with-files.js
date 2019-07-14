export const createFileWithContacts = (contacts) => {
	let filename = `SavedContacts${Math.floor(Math.random(10000) * 10000)}`
	var file = new Blob([
		JSON.stringify(contacts)
	])
	if (
		window.navigator.msSaveOrOpenBlob // IE10+
	)
		window.navigator.msSaveOrOpenBlob(file, filename)
	else {
		// Others
		var a = document.createElement('a'),
			url = URL.createObjectURL(file)
		a.href = url
		a.download = filename
		document.body.appendChild(a)
		a.click()
		setTimeout(function() {
			document.body.removeChild(a)
			window.URL.revokeObjectURL(url)
		}, 0)
	}
}
export const readFileWithContacts = (files) => {
	return new Promise((resolve, reject) => {
		if (!files.length) {
			alert('Please select a file!')
			reject()
		}

		var file = files[0]
		var start = 0
		var stop = file.size - 1

		var reader = new FileReader()
		reader.onloadend = function(e) {
			if (e.target.readyState === FileReader.DONE) {
				try {
					let a = JSON.parse(e.target.result)
					resolve(a)
				} catch (error) {
					reject()
				}
			}
		}

		var blob = file.slice(start, stop + 1)
		reader.readAsBinaryString(blob)
	})
}
