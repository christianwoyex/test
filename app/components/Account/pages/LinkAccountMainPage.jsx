import { Platform, StyleSheet, Text, ToastAndroid, View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { observer } from "mobx-react"
import React, { useCallback, useRef } from "react"
import CustomOutlineButton from "../../common/CustomOutlineButton"
import LinkAccountButton from "../LinkAccountButton"
import { IconArrowForward, IconMomoLink, IconOkaraLink, IconSelectFromGallary, IconTakePhoto } from "../../../../assets/icons"
import SyncBankStatementBottomSheet from "../forms/Sheets/SyncBankStatementBottomSheet"
import SyncBankStatementSheet from "./SyncBankStatementSheet"
import profileStore from "../../../mobx/profileStore"
import { useQueryClient } from "@tanstack/react-query"
import UploadProgress from "../../common/UploadProgress"
import ErrorModal from "../../common/ErrorScreen"
import SuccessModal from "../../common/SuccessMainScreen"
import { Toast } from "toastify-react-native"

let dFormData = global.FormData

const LinkAccountMainPage = ({ navigation }) => {
	const queryClient = useQueryClient()
	const statementRef = useRef(null)
	const selectDoc = async () => {
		try {
			let result = await DocumentPicker.getDocumentAsync({ type: ["image/png", "image/jpg", "image/jpeg", "application/pdf"] })

			if (result?.assets) {
				statementRef.current.close()
				const formData = new dFormData()

				formData.append("document", { uri: result?.assets[0].uri, type: result?.assets[0].mimeType, name: result?.assets[0].name, size: result?.assets[0].size })
				const response = await profileStore.uploadBankStatement(formData)
				if (response?.success) {
					queryClient.invalidateQueries({
						queryKey: ["user"]
					})
				}
			}
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
			} else console.log(err)
		}
	}
	const handlePressAddManually = useCallback(() => {
		statementRef.current?.present()
	}, [])

	function showToast() {
		Platform.OS === "ios" ? Toast.success("This method is not available at the moment!") : ToastAndroid.show("This method is not available at the moment!", ToastAndroid.LONG)
	}
	function handleCloseErrorbankStatement() {
		profileStore.setUploadError("")
	}
	function handleCloseSuccessbankStatement() {
		profileStore.setUploadSuccess("")
		navigation.goBack()
	}
	return (
		<View>
			<View style={{ marginTop: 20, width: "100%" }}>
				<Text style={styles.topTextStyles}>Submit your account details and statement automatically with one of the options below</Text>
			</View>

			<View>
				<LinkAccountButton onPress={showToast} title="Submit with" icon={<IconArrowForward />} righticon={<IconOkaraLink />} />
				<LinkAccountButton onPress={showToast} title="Submit with" icon={<IconArrowForward />} righticon={<IconMomoLink />} />
			</View>
			<View style={{ marginTop: 20, width: "100%" }}>
				<Text style={styles.topTextStyles}>
					*Uploading your bank statement automatically with any of the options above is a safe process and we only require this information to check and confirm your eligibility for a loan
				</Text>
			</View>
			{profileStore?.uploadingdp && <UploadProgress modalVisible={profileStore?.uploadingdp} progress={profileStore?.uploadProgress} />}
			{profileStore.upload_error && <ErrorModal modalVisible={profileStore.upload_error} error={profileStore.msgError} onRequestClose={handleCloseErrorbankStatement} />}
			{profileStore.upload_suceess && (
				<SuccessModal headerTitle="Success!" modalVisible={profileStore.upload_suceess} message={profileStore.msgSuccess} onRequestClose={handleCloseSuccessbankStatement} />
			)}
			<SyncBankStatementBottomSheet itemIndex={2} backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={statementRef}>
				<SyncBankStatementSheet pickFile={() => selectDoc()} />
			</SyncBankStatementBottomSheet>
			<View style={{ marginTop: 20 }}>
				<CustomOutlineButton onPress={handlePressAddManually} title="Unable to Connect Bank Statement?" />
			</View>
		</View>
	)
}

export default observer(LinkAccountMainPage)

const styles = StyleSheet.create({
	topTextStyles: {
		fontFamily: "Inter-Regular",
		fontStyle: "normal",
		fontWeight: "300",
		fontSize: 11,
		lineHeight: 18,
		letterSpacing: -0.02,
		color: "#525252",
		marginBottom: 40
	}
})
