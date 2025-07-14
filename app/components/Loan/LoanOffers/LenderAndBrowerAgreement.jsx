import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { IconLenderAndBrowerAgreement, IconAgreementGood } from "../../../../assets/icons"

const LenderAndBrowerAgreement = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<IconLenderAndBrowerAgreement />
				<View style={{ marginLeft: 10 }}>
					<Text style={styles.typeText}>Lender & Borrower Agreement</Text>
				</View>
			</View>
			<View>
				<IconAgreementGood />
			</View>
		</View>
	)
}

export default LenderAndBrowerAgreement

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		height: 100,
		justifyContent: "space-between",
		borderRadius: 12,
		paddingHorizontal: 15,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#AEF2D2", // Border color
		borderStyle: "dashed",
		marginBottom: 5,
		marginTop: 30
	},
	leftSection: {
		display: "flex",
		flexDirection: "row",
		width: "80%",
		alignItems: "center"
	},
	rightBtn: {
		width: 50,
		height: 25,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		padding: 0,
		alignItems: "center",
		backgroundColor: "#B5F3D6",
		borderRadius: 12
	},
	typeText: {
		color: "#000000",
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 22
	},
	paymenTtypeText: {
		color: "#002D2D",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 22
	}
})
