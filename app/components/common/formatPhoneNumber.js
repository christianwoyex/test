export function formatPhoneNumber(phoneNumber) {
	const digitsOnly = phoneNumber.replace(/\D/g, "")
	const firstFour = digitsOnly.slice(0, 4)
	const lastTwo = digitsOnly.slice(-2)
	const middleDigitsCount = digitsOnly.length - firstFour.length - lastTwo.length
	const middleAsterisks = "*".repeat(middleDigitsCount)
	const formattedNumber = `${firstFour}${middleAsterisks}${lastTwo}`
	return formattedNumber
}

export function formatThousand(numberString) {
	// Convert the input string to a number
	const number = parseFloat(numberString)

	// Check if the input is a valid number
	if (isNaN(number)) {
		return "Invalid number"
	}

	// Format the number with thousand separators
	const formattedNumber = number.toLocaleString()

	return formattedNumber
}

export function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export function calculateRepaymentWeeks(loanAmount, durationWeeks, interestRate) {
	interestRate /= 100
	const weeklyInterestRate = interestRate / 52
	const weeklyPayment = loanAmount * (weeklyInterestRate / (1 - Math.pow(1 + weeklyInterestRate, -durationWeeks)))
	return weeklyPayment
}

export function calculateRepaymentMonthly(loanAmount, durationMonths, interestRate) {
	interestRate /= 100

	const monthlyInterestRate = interestRate / durationMonths

	const monthlyPayment = loanAmount * monthlyInterestRate * 12 + loanAmount
	return monthlyPayment
}

export function formatDayOFMonth(dateString) {
	const date = new Date(dateString)
	const day = date.getDate()
	const monthIndex = date.getMonth()

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	const monthName = months[monthIndex]

	return `${day} ${monthName}`
}

export function formatNextDueDate(dateString) {
	const date = new Date(dateString)
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

	const day = date.getDate()
	const weekday = weekdays[date.getDay()]
	const month = months[date.getMonth()]

	return `${weekday}, ${day} ${month}`
}

export function daysUntil(dateString) {
	const targetDate = new Date(dateString)
	const currentDate = new Date()

	const difference = targetDate.getTime() - currentDate.getTime()

	const days = Math.ceil(difference / (1000 * 3600 * 24))

	return days
}
