import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { IconAHC, IconAddGuarantor } from "../../../../assets/icons"

const RepaymentItem = ({ navigation, name = "" }) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<IconAddGuarantor />
				<View style={{ marginLeft: 15 }}>
					<Text style={styles.typeText}>{name}</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity activeOpacity={0.9} style={styles.rightBtn} onPress={() => navigation.navigate("AddGuarantor")}>
					<Text style={styles.editText}>Edit</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default RepaymentItem

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		// height: 100,
		justifyContent: "space-between",
		borderRadius: 12,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: "#FFF",
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
