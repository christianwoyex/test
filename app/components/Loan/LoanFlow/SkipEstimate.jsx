import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import AppColors from "../../../config/colors"

const SkipEstimate = ({ currentPage = 0 }) => {
	const data = [
		{ key: "1", description: "Enter monthy income" },
		{ key: "2", description: "Estimate business loan amount" }
	]
	return (
		<View style={styles.container}>
			<View style={styles.indicators}>
				{data.map((_, index) => (
					<View key={index} style={[styles.indicator, index === currentPage && styles.activeIndicator]} />
				))}
			</View>
			<TouchableOpacity
				activeOpacity={0.9}
				style={{
					display: "flex",
					borderRadius: 10,
					justifyContent: "center",
					alignItems: "center",
					width: 50,
					height: 20
				}}
				title={"Login"}
			>
				<Text style={{ color: AppColors.btngrey, fontWeight: "bold", marginTop: -5 }}>Skip</Text>
			</TouchableOpacity>
		</View>
	)
}

export default SkipEstimate

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20
	},
	indicators: {
		flexDirection: "row",
		justifyContent: "start"
		// marginTop: 10
	},
	indicator: {
		width: 16,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#D9ECEC",
		marginHorizontal: 2
	},
	activeIndicator: {
		backgroundColor: AppColors.secondary,
		width: 30,
		height: 8
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "80%",
		backgroundColor: AppColors.primary
		// marginBottom: 20
	},
	btnText: {
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: "Inter-SemiBold",
		color: "#FFF"
	}
})
