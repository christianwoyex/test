import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { ForwardGreaterThanIcon } from "../../../../assets/icons"
const { width, height } = Dimensions.get("window")
const TailoredPackagesCard = ({ navigation }) => {
	return (
		<View style={styles.homeLoanPackages}>
			<View style={styles.loanTextContent}>
				<Text style={styles.loanTextExplore}>Explore our tailored loan packages</Text>
			</View>
			<View style={styles.loanTextContent}>
				<Text style={styles.loanApprovedText}>Empowering Your Financial Journey with Customized Loan Solutions.</Text>
			</View>
			<View style={styles.loanTextContent}>
				<View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
					<TouchableOpacity activeOpacity={0.9} style={styles.packagesBtn} onPress={() => navigation.navigate("PackagesScreen")}>
						<View style={styles.pakages}>
							<Text style={styles.packagesBtnText}>Packages</Text>
							<ForwardGreaterThanIcon />
						</View>
					</TouchableOpacity>
					<Image source={require("../../../../assets/images/hand_with_dollor.png")} />
				</View>
			</View>
		</View>
	)
}

export default TailoredPackagesCard

const styles = StyleSheet.create({
	homeLoanPackages: {
		backgroundColor: "#1DB954",
		width: "100%",
		height: height / 2.5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		borderColor: "rgba(0, 128, 128, 0.10)",
		borderWidth: 1,
		marginTop: 10
	},
	loanTextContent: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 10
	},
	loanTextExplore: {
		color: "#FFFFFF",
		fontFamily: "Inter-SemiBold",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "600",
		// lineLeight: 20,
		letterSpacing: -0.135,
		marginLeft: 0
	},
	loanApprovedText: {
		color: "#FFFFFF",
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 20,
		letterSpacing: 0.674,
		marginRight: 19
	},
	packagesBtn: {
		display: "flex",
		flexDirection: "row",
		height: 50,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#D9ECEC",
		borderRadius: 8.7,
		borderColor: "#D9ECEC",
		borderWidth: 1,
		marginTop: 30
	},
	pakages: {
		display: "flex",
		flexDirection: "row"
	},
	packagesBtnText: {
		color: "#1DB954",
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "300",
		letterSpacing: 0.674
	},
	completeBtn: {
		display: "flex",
		flexDirection: "row",
		height: 50,
		width: 150,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8.7,
		backgroundColor: "#1DB954",
		marginTop: 30
	},
	pakages: {
		display: "flex",
		flexDirection: "row"
	}
})
