import { ScrollView, StyleSheet } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import LoanHeader from "../../components/Loan/Header"
import LinkAccountForm from "../../components/Account/forms/LinkAccountForm"
import LinkAccountMainPage from "../../components/Account/pages/LinkAccountMainPage"

const LinkAccountFormScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Link Bank Account" />
			<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
				{/* <LinkAccountForm /> */}
				<LinkAccountMainPage navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default LinkAccountFormScreen
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
		width: "45%"
	}
})
