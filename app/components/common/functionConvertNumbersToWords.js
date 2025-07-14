function numberToWords(number) {
	// Arrays for one through nineteen, tens, and thousands
	const wordsArray = [
		"",
		"One",
		"Two",
		"Three",
		"Four",
		"Five",
		"Six",
		"Seven",
		"Eight",
		"Nine",
		"Ten",
		"Eleven",
		"Twelve",
		"Thirteen",
		"Fourteen",
		"Fifteen",
		"Sixteen",
		"Seventeen",
		"Eighteen",
		"Nineteen"
	]
	const tensArray = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
	const thousandsArray = ["", "Thousand", "Million"]

	// Function to convert less than 1000 to words
	function convertLessThanOneThousand(num) {
		if (num === 0) {
			return ""
		} else if (num < 20) {
			return wordsArray[num]
		} else if (num < 100) {
			return tensArray[Math.floor(num / 10)] + " " + convertLessThanOneThousand(num % 10)
		} else {
			return wordsArray[Math.floor(num / 100)] + " Hundred " + convertLessThanOneThousand(num % 100)
		}
	}

	// Function to convert the number to words
	function convert(num) {
		if (num === 0) {
			return "Zero"
		} else {
			let words = ""
			for (let i = 0; num > 0; i++) {
				if (num % 1000 !== 0) {
					words = convertLessThanOneThousand(num % 1000) + " " + thousandsArray[i] + " " + words
				}
				num = Math.floor(num / 1000)
			}
			return words.trim()
		}
	}

	return convert(number)
}

export default numberToWords
