import { View, Text, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import AccountHome from "../../components/Account"

const ProfileScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<AccountHome navigation={navigation} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default ProfileScreen
