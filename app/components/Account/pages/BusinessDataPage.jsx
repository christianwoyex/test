import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import ProfileHeadText from "../ProfileHeadText"
import { IconBusiness2, IconContactInfo, IconDocuments, IconHomeAddress, IconIdentification, IconOrganization, IconUser } from "../../../../assets/icons"
import AccountItemOne from "../AccountItemOne"

const BusinessDataPage = ({ navigation }) => {
	const BusinessData = [
		{ id: "dgashs", icon: <IconBusiness2 />, page: "BusinessDetails", title: "Business details" },
		{ id: "dhjdsjhj", icon: <IconDocuments />, page: "BusinessDocs", title: "Documents" },
		{ id: "2Gjkd5675", icon: <IconHomeAddress />, page: "BusinessAdress", title: " Address" },
		{ id: "fggjkffl", icon: <IconOrganization />, page: "BusinessOrganization", title: "Organisation" }
	]
	// Add more data as needed

	return (
		<View style={styles.container}>
			<ProfileHeadText title="Bussiness Data" />
			<View style={{ marginTop: 20 }}>
				<FlatList
					data={BusinessData}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <AccountItemOne title={item.title} icon={item.icon} onPress={() => navigation.navigate(item.page)} bprofile={true} />}
				/>
			</View>
		</View>
	)
}

export default BusinessDataPage

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
