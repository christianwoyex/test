import { FlatList, StyleSheet, View } from "react-native"
import React, { useCallback, useRef } from "react"
import ProfileHeadText from "../ProfileHeadText"
import * as DocumentPicker from "expo-document-picker"
import { observer } from "mobx-react"

import { IconLinkBank, IconSyncAccount } from "../../../../assets/icons"
import AccountItemOne from "../AccountItemOne"
import LinkBankBottomSheet from "../forms/Sheets/LinkBankBottomSheet"
import LinkBankAccountSheet from "./LinkBankAccountSheet"
import SyncBankStatementBottomSheet from "../forms/Sheets/SyncBankStatementBottomSheet"
import SyncBankStatementSheet from "./SyncBankStatementSheet"
import profileStore from "../../../mobx/profileStore"
import UploadProgress from "../../common/UploadProgress"
import ErrorModal from "../../common/ErrorScreen"
import SuccessModal from "../../common/SuccessMainScreen"
import { useQueryClient } from "@tanstack/react-query"

let dFormData = global.FormData

const FinancialDataPage = ({ navigation }) => {
	const queryClient = useQueryClient()
	const camBottomRef = useRef(null)
	const statementBottomRef = useRef(null)

	const handleSheetChanges = useCallback(index => {}, [])

	const handlePresentModalPress = useCallback(() => {
		camBottomRef.current?.present()
	}, [])

	const handlePressAddManually = useCallback(() => {
		const h = camBottomRef.current?.close()
		if (!h) {
			statementBottomRef.current?.present()
		}
	}, [])

	const handlePressConnect = () => {
		camBottomRef.current?.close()
		navigation.navigate("LinkAccountFormScreen")
	}
	// const handlePressAddManually = () => {
	// 	handleStatementPresentModalPress()
	// }

	const selectDoc = async () => {
		try {
			let result = await DocumentPicker.getDocumentAsync({ type: ["image/png", "image/jpg", "image/jpeg", "application/pdf"] })

			if (result?.assets) {
				statementBottomRef.current.close()
				camBottomRef.current.close()
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
	function handleCloseErrorbankStatement() {
		statementBottomRef.current.close()
		profileStore.setUploadError("")
	}
	function handleCloseSuccessbankStatement() {
		camBottomRef.current.close()
		profileStore.setUploadSuccess("")
	}
	return (
		<View style={styles.container}>
			<ProfileHeadText title="Financial Data" />
			<View style={{ marginTop: 20 }}>
				<AccountItemOne onPress={() => handlePresentModalPress()} title={"Sync Bank Statement"} icon={<IconSyncAccount />} />
				<AccountItemOne onPress={() => navigation.navigate("AddAccountManuallyScreen")} title={"Link Bank Account"} icon={<IconLinkBank />} />
				{profileStore?.uploadingdp && <UploadProgress modalVisible={profileStore?.uploadingdp} progress={profileStore?.uploadProgress} />}
				{profileStore.upload_error && <ErrorModal modalVisible={profileStore.upload_error} error={profileStore.msgError} onRequestClose={handleCloseErrorbankStatement} />}
				{profileStore.upload_suceess && (
					<SuccessModal headerTitle="Success!" modalVisible={profileStore.upload_suceess} message={profileStore.msgSuccess} onRequestClose={handleCloseSuccessbankStatement} />
				)}
				<SyncBankStatementBottomSheet
					itemIndex={2}
					backgroundStyle={{ backgroundColor: "#FFFFFF" }}
					handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }}
					ref={statementBottomRef}
				>
					<SyncBankStatementSheet pickFile={() => selectDoc()} />
				</SyncBankStatementBottomSheet>

				<LinkBankBottomSheet itemIndex={2} backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={camBottomRef}>
					<LinkBankAccountSheet onConnectPres={handlePressConnect} onAddManually={handlePressAddManually} />
				</LinkBankBottomSheet>
			</View>
		</View>
	)
}

export default observer(FinancialDataPage)

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
