export function reversePhoneNumber(formattedPhoneNumber) {
	// Remove all non-digit characters
	const cleaned = formattedPhoneNumber.replace(/\D/g, "")

	return cleaned
}

export function formatPhoneNumber(phoneNumber) {
	const cleaned = phoneNumber.replace(/\D/g, "")
	const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")

	return formatted
}
