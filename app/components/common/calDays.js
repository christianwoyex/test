export function monthsToDays(months) {
	const averageDaysPerMonth = 30.44
	const days = months * averageDaysPerMonth
	return days
}

export function weeksToDays(weeks) {
	const days = weeks * 7
	return days
}
