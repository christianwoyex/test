import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import ProfileHeadText from "../ProfileHeadText"
import { IconContactInfo, IconHomeAddress, IconIdentification, IconUser } from "../../../../assets/icons"
import AccountItemOne from "../AccountItemOne"

const PersonalDataPage = ({ navigation }) => {
	const AccountData = [
		{ id: "adfnsmmnshsha", icon: <IconUser />, page: "PersonalDataScreen", title: "Personal Data" },
		{ id: "dgaskdjksshs", icon: <IconIdentification />, page: "PersonalDataIdentification", title: "Identification" },
		{ id: "2Gjhjsjahjskd5675", icon: <IconHomeAddress />, page: "PersonalDataResidentials", title: "Home Address" },
		{ id: "fggnsnmndsjkffl", icon: <IconContactInfo />, page: "PersonalDataContact", title: "Contact Info" }
	]
	// Add more data as needed

	return (
		<View style={styles.container}>
			<ProfileHeadText title="Personal Data" />
			<View style={{ marginTop: 20 }}>
				<FlatList
					data={AccountData}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <AccountItemOne onPress={() => navigation.navigate(item.page)} title={item.title} icon={item.icon} />}
				/>
			</View>
		</View>
	)
}

export default PersonalDataPage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2F4F5",
		paddingLeft: 20,
		paddingRight: 20
	},
	listContent: {
		marginTop: 15
	}
})
