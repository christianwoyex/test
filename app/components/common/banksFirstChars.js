export function getFirstCharacters(str) {
	const words = str.split(" ")
	const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
	const firstCharFirstWord = capitalizedWords.length > 0 ? capitalizedWords[0].charAt(0) : ""
	const firstCharSecondWord = capitalizedWords.length > 1 ? capitalizedWords[1].charAt(0) : ""
	return `${firstCharFirstWord}${firstCharSecondWord}`
}
