export function transformDataLoanTypes(data) {
	const filteredData = data?.filter(item => item.name.includes("SME") || item.name.includes("Local Purchase") || item.name.includes("Equity"))

	const transformedData = filteredData?.map((item, index) => ({
		id: item?.id,
		name: item?.name,
		first: item?.name.includes("Equity")
			? "rgba(217, 217, 217,0.4)"
			: item?.name?.includes("SME")
			? "rgba(17, 217, 124, .4)"
			: item?.name?.includes("Local Purchase")
			? "rgba(215, 215, 0, .4)"
			: "rgba(215, 215, 0, .4)",
		second: item?.name?.includes("Equity")
			? "rgba(217, 217, 217,0.4)"
			: item?.name?.includes("SME")
			? "rgba(17, 217, 124, .4)"
			: item?.name?.includes("Local Purchase")
			? "rgba(215, 215, 0, .5)"
			: "rgba(215, 215, 0, .5)",
		page: index + 3,
		bg: item.name.includes("Equity") ? "#8A2BE2" : item.name.includes("SME") ? "#1DB954" : item?.name?.includes("Local Purchase") ? "#FFD700" : "#FFD700",
		description: item?.name?.includes("Equity")
			? "Empower Your Business with Equity Financing"
			: item.name.includes("SME")
			? "Raise capital for your small business"
			: item.name.includes("Local Purchase")
			? "Streaming Procurement with Seedng LPO"
			: "Streaming Procurement with Seedng LPO"
	}))

	return transformedData
}

export function filterTailoredLoanTypesData(data) {
	const filteredData = data.filter(item => !item?.name.includes("Equity") || !item?.name?.includes("SME") || !item?.name?.includes("Local Purchase"))
	return filteredData
}
