import { ScrollView, StyleSheet, View } from "react-native"
import { observer } from "mobx-react"
import { SafeAreaView } from "react-native-safe-area-context"
import LoanHeader from "../../components/Loan/Header"

import profileStore from "../../mobx/profileStore"
import LoadingModal from "../../components/common/LoadingScreen"
import SuccessMainModal from "../../components/common/SuccessMainScreen"
import ErrorModal from "../../components/common/ErrorScreen"
import { Dropdown } from "react-native-element-dropdown"
import { useState } from "react"
import PersonalIdBvn from "./PersonalIdBvn"
import PersonalIdNin from "./PersonalIdNin"

const PersonalDataIdentificationScreen = ({ navigation }) => {
	const [active, setActive] = useState("")
	const IdentityData = [
		{ label: "Bank Verification Number (BVN)", value: "bvn" },
		{ label: "National Identity Number (NIN)", value: "nin" }
	]

	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("personal-data")
	}

	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Identification" />
			<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
				{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}
				{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
				{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
				<View
					style={{
						marginBottom: 20
					}}
				>
					<Dropdown
						style={[styles.input]}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={IdentityData}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={true ? "Select Verification Method..." : "..."}
						value={active}
						onChange={method => {
							setActive(method?.value)
						}}
					/>
					{active === "bvn" && <PersonalIdBvn />}
					{active === "nin" && <PersonalIdNin />}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default observer(PersonalDataIdentificationScreen)

const styles = StyleSheet.create({
	icon: {
		marginRight: 5
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14
	},
	placeholderStyle: {
		fontSize: 16
	},
	selectedTextStyle: {
		fontSize: 16
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	},
	input: {
		fontFamily: "Inter-Regular",
		minHeight: 56,
		borderColor: "#E6E9EC",
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
		fontSize: 16,
		marginTop: 25
	},
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	content: {
		flex: 1,
		paddingHorizontal: 20
	},
	instructText: {
		fontFamily: "Inter-Regular",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 15,
		color: "#949494"
	},
	instructBold: {
		fontFamily: "Inter-SemiBold",
		fontWeight: "300",
		fontSize: 12,
		lineHeight: 15,
		color: "#525252"
	},
	otherIdType: {
		fontFamily: "Inter-Regular",
		fontWeight: "300",
		fontSize: 16,
		lineHeight: 15,
		color: "#525252"
	}
})
