export const splitAndAssignNames = text => {
	const words = text.split(" ")
	let firstName, lastName

	if (words.length === 2) {
		;[firstName, lastName] = words
	} else if (words.length >= 3) {
		lastName = words[0]
		firstName = words.slice(1).join(" ")
	}
	return { firstName, lastName }
}
