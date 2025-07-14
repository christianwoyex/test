import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import React from "react"
import { IconMasterCard, IconVerveCard } from "../../../../assets/icons"
import defaultDp from "../../../../assets/images/visa.png"

const PaymentMethodView = ({ navigation, type = "", name = "" }) => {
	const cardType = type.trim()
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				{cardType === "master" && <IconMasterCard />}
				{cardType === "visa" ? <Image source={defaultDp} /> : null}
				{cardType === "verve" && <IconVerveCard />}
				<View style={{ marginLeft: 15 }}>
					<Text style={styles.typeText}>{name}</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity activeOpacity={0.9} style={styles.rightBtn}>
					<Text style={styles.editText}>Edit</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default PaymentMethodView

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		height: 100,
		justifyContent: "space-between",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#D7B7F5", // Border color
		borderStyle: "dashed",
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#F9F4FE",
		marginBottom: 5
	},
	leftSection: {
		display: "flex",
		flexDirection: "row",
		width: "70%",
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
