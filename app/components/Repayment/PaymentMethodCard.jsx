import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconAHC, IconRCP } from "../../../assets/icons"

const PaymentMethodCard = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<IconAHC />
				<View style={{ marginLeft: 10 }}>
					<Text style={styles.typeText}>AHC</Text>
					<Text style={styles.paymenTtypeText}>Automatic Bank Withdrawals </Text>
				</View>
			</View>
			<View></View>
		</View>
	)
}

export default PaymentMethodCard

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		// height: 100,
		justifyContent: "space-between",
		borderRadius: 12,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#FFF",
		marginBottom: 30
	},
	leftSection: {
		display: "flex",
		flexDirection: "row",
		width: "70%"
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
		color: "#002D2D",
		fontFamily: "Inter-SemiBold",
		fontSize: 19,
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: 22
	},
	paymenTtypeText: {
		color: "#002D2D",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 22
	},
	editText: {
		color: "#001F3F",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 22,
		marginBottom: 2
	}
})
