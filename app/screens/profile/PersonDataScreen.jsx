import { StyleSheet } from "react-native"
import React from "react"

import { SafeAreaView } from "react-native-safe-area-context"
import PersonalDataPage from "../../components/Account/pages/PersonalDataPage"
import AccountHeader from "../../components/Account/AccountHeader"

const PersonDataScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<AccountHeader navigation={navigation} />
			<PersonalDataPage navigation={navigation} />
		</SafeAreaView>
	)
}

export default PersonDataScreen
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	}
})
