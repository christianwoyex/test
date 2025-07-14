function formatDate(loanDate) {
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	// Parse the loan date string into a Date object
	const date = new Date(loanDate)

	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()

	// Function to add the appropriate suffix to the day
	function addSuffix(day) {
		if (day >= 11 && day <= 13) {
			return day + "th"
		} else {
			switch (day % 10) {
				case 1:
					return day + "st"
				case 2:
					return day + "nd"
				case 3:
					return day + "rd"
				default:
					return day + "th"
			}
		}
	}

	const formattedDate = addSuffix(day) + " " + month + ", " + year
	return formattedDate
}

export default formatDate
