import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useQueryClient } from "@tanstack/react-query"
import LoanHeader from "../../components/Loan/Header"
import { observer } from "mobx-react"
import WebViewItem from "../../components/common/WebView"

const PrivacyScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Privacy Policy" />
			{/* <ScrollView style={styles.content}> */}
			<WebViewItem linkUrl="https://seedng.africa/privacy-policy" />
			{/* </ScrollView> */}
		</SafeAreaView>
	)
}

export default observer(PrivacyScreen)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	content: {
		flex: 1,
		paddingHorizontal: 20
	},
	divScreenForm: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between"
	},
	divScreenInner: {
		width: "48%"
	},
	centeredView: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 1.5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	modalView: {
		margin: 10,
		backgroundColor: "#008080",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		padding: 1,
		paddingTop: 20,
		paddingBottom: 35,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})
