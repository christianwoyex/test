export function findMinMaxAmount(arr) {
	if (arr.length === 0) return null // return null for empty array

	let maxAmount = arr[0].maximum_amount
	let minAmount = arr[0].minimum_amount

	for (let i = 1; i < arr.length; i++) {
		if (arr[i].maximum_amount > maxAmount) {
			maxAmount = arr[i].maximum_amount
		}
		if (arr[i].minimum_amount < minAmount) {
			minAmount = arr[i].minimum_amount
		}
	}

	return { maximum_amount: maxAmount, minimum_amount: minAmount }
}
