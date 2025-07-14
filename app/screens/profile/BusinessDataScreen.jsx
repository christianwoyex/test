import { StyleSheet } from "react-native"
import React from "react"

import { SafeAreaView } from "react-native-safe-area-context"
import AccountHeader from "../../components/Account/AccountHeader"
import BusinessDataPage from "../../components/Account/pages/BusinessDataPage"

const BusinessDataScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<AccountHeader navigation={navigation} />
			<BusinessDataPage navigation={navigation} />
		</SafeAreaView>
	)
}

export default BusinessDataScreen
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	}
})
