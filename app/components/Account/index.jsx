import React, { useCallback, useRef, useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { observer } from "mobx-react"
import { useQueryClient, useQuery } from "@tanstack/react-query"

import {
	IconAboutUs,
	IconBusiness,
	IconChangeDp,
	IconChangePassword,
	IconFaqs,
	IconFinancial,
	IconLogout,
	IconPrivacyPolicy,
	IconSupport,
	IconTerms,
	IconUser,
	IconUserAvatar
} from "../../../assets/icons"
import CustomBottomSheetModal from "../common/CustomBottomSheetModal"
import ChangeAvaterBottomSheet from "./ChangeAvaterBottomSheet"
import AccountItemOne from "./AccountItemOne"
import profileStore from "../../mobx/profileStore"
import { useAuth } from "../../context/AuthContext"
import authStore from "../../mobx/AuthStore"
import loanStore from "../../mobx/LoanStore"
import UploadProgress from "../common/UploadProgress"
import SuccessModal from "../common/SuccessMainScreen"
import ErrorModal from "../common/ErrorScreen"

const FormData = global.FormData

const AccountHome = ({ navigation }) => {
	const camBottomRef = useRef(null)
	const { onLogout } = useAuth()
	const handleSheetChanges = useCallback(index => {}, [])
	const handlePresentModalPress = useCallback(() => {
		camBottomRef.current?.present()
	}, [])
	const queryClient = useQueryClient()

	const pickImage = async mode => {
		const formData = new FormData()
		let result = {}
		try {
			if (mode === "gallery") {
				await ImagePicker.requestMediaLibraryPermissionsAsync()
				result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaType,
					allowsEditing: true,
					aspect: [4, 3],
					quality:  0.5
				})

				if (!result.canceled) {
					profileStore.setImage(result.assets[0].uri)
					camBottomRef.current?.close()
					formData.append("image", { uri: result.assets[0].uri, type: "image/*", name: "profile-Image" })
					let resp = await profileStore.updateProfileImage(formData)
					if (resp?.success) {
						queryClient.invalidateQueries({ queryKey: ["user"] })
					}
				}
			} else {
				await ImagePicker.requestCameraPermissionsAsync()
				result = await ImagePicker.launchCameraAsync({
					cameraType: ImagePicker.CameraType.front,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 0.5
				})

				if (!result.canceled) {
					profileStore.setImage(result.assets[0].uri)
					formData.append("image", { uri: result.assets[0].uri, type: "image/*", name: "profile-Image" })
					let resp = await profileStore.updateProfileImage(formData)
					camBottomRef.current?.close()
					if (resp?.success) {
						queryClient.invalidateQueries({ queryKey: ["user"] })
					}
				}
			}
		} catch (error) {}
	}

	const handleLogout = () => {
		onLogout()
	}
	const { isPending: loadingBusiness } = useQuery({
		queryKey: ["business"],
		queryFn: profileStore.getBusinessDetails
	})
	const { isPending: loadingBanks } = useQuery({
		queryKey: ["banks"],
		queryFn: loanStore.callBanksRecursive
	})
	return (
		<View style={styles.container}>
			<View style={styles.profileCont}>
				<View style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: 100, height: 100, backgroundColor: "#B5F3D6", borderRadius: 100 / 2 }}>
					{authStore?.loggedInUser?.avatar ? <Image style={styles.userImage} source={{ uri: authStore?.loggedInUser?.avatar }} /> : <IconUserAvatar />}
					<TouchableOpacity activeOpacity={0.9} onPress={handlePresentModalPress} style={styles.floatingDot}>
						<IconChangeDp />
					</TouchableOpacity>
				</View>

				<Text style={styles.username}>Hi {authStore?.loggedInUser.last_name}!</Text>
			</View>
			{profileStore?.uploadingdp && <UploadProgress modalVisible={profileStore?.uploadingdp} progress={profileStore?.uploadProgress} />}
			{profileStore.upload_error && <ErrorModal modalVisible={profileStore.upload_error} error={profileStore.msgError} onRequestClose={() => profileStore.setUploadError("")} />}
			{profileStore.upload_suceess && (
				<SuccessModal headerTitle="Success!" modalVisible={profileStore.upload_suceess} message={profileStore.msgSuccess} onRequestClose={() => profileStore.setUploadSuccess("")} />
			)}
			<View>
				<AccountItemOne title={"Personal Data"} icon={<IconUser />} onPress={() => navigation.push("personal-data")} />
				<AccountItemOne title={"Business"} icon={<IconBusiness />} onPress={() => navigation.push("business-data")} />
				<AccountItemOne title={"Finance"} icon={<IconFinancial />} onPress={() => navigation.push("finance-data")} />
			</View>
			<Text style={styles.headingText}>Security</Text>
			<View>
				<AccountItemOne title={"Change password"} icon={<IconChangePassword />} onPress={() => navigation.push("ChangePasswordScreen")} />
			</View>
			<Text style={styles.headingText}>About</Text>
			<View style={{ width: "100%", backgroundColor: "#FFFFFF", borderRadius: 12, marginTop: 5 }}>
				<AccountItemOne title={"About us"} icon={<IconAboutUs />} border={true} onPress={() => navigation.push("about-screen")} />
				<AccountItemOne title={"Privacy policy"} icon={<IconPrivacyPolicy />} border={true} onPress={() => navigation.push("privacy-screen")} />
				<AccountItemOne title={"Terms and Conditions"} icon={<IconTerms />} border={true} onPress={() => navigation.push("terms-screen")} />
				<AccountItemOne title={"FAQs"} icon={<IconFaqs />} border={true} onPress={() => navigation.push("faqs-screen")} />
				<AccountItemOne title={"Support"} icon={<IconSupport />} border={true} onPress={() => navigation.push("support-screen")} />
			</View>
			<View style={{ marginTop: 30, marginBottom: 40 }}>
				<AccountItemOne title={"Logout"} icon={<IconLogout />} onPress={() => handleLogout()} />
			</View>
			<CustomBottomSheetModal
				itemIndex={2}
				backgroundStyle={{ backgroundColor: "#FFFFFF" }}
				handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }}
				ref={camBottomRef}
				handleSheetChanges={handleSheetChanges}
			>
				<ChangeAvaterBottomSheet pickImageCam={pickImage} pickImageGal={() => pickImage("gallery")} />
			</CustomBottomSheetModal>
		</View>
	)
}

export default observer(AccountHome)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: "#F2F4F5"
	},

	username: {
		color: "#000",
		fontFamily: "Inter-Regular",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "500",
		marginLeft: 10,
		marginBottom: 10
	},
	headingText: {
		color: "#525252",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "400",
		marginTop: 20
	},
	profileCont: {
		flex: 0.12,
		width: "100%",
		backgroundColor: "transparent",
		display: "flex",
		marginTop: 0,
		marginBottom: 20,
		flexDirection: "column-reverse",
		alignItems: "start"
	},
	userImage: {
		width: 100,
		height: 100,
		backgroundColor: "#B5F3D6",
		borderRadius: 100 / 2,
		position: "relative"
	},
	floatingDot: {
		// width: 30,
		// height: 30,
		// borderRadius: 50,
		// backgroundColor: "#1DB954",
		position: "absolute",
		bottom: 0,
		right: 7
	}
})
