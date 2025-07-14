import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react"
import loanStore from "../../mobx/LoanStore"
import { getFirstCharacters } from "./banksFirstChars"
import { IconSearch } from "../../../assets/icons"
import { SafeAreaView } from "react-native-safe-area-context"

const SelectBankModal = ({ modalVisible = false, setModalVisible, onRequestClose, amount = "200" }) => {
	function removeDuplicates(array, property) {
		const uniqueMap = new Map()
		array.forEach(obj => {
			uniqueMap.set(obj[property], obj)
		})
		return Array.from(uniqueMap.values())
	}
	function sortObjectsAlphabetically(arr) {
		return arr.sort((a, b) => {
			const nameA = a.name.toUpperCase()
			const nameB = b.name.toUpperCase()
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0
		})
	}
	const newData = loanStore.searchText ? [...loanStore.searchBanks] : [...loanStore.banks]
	const banksData = sortObjectsAlphabetically(newData)
	const originalBanks = removeDuplicates(banksData, "code")

	return (
		<SafeAreaView>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
				<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={{ height: 130, paddingTop: 5, width: "95%", backgroundColor: "#008080", paddingHorizontal: 20, borderRadius: 12 }}>
								<View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
									<TouchableOpacity activeOpacity={0.9} style={{ width: 20, height: 20, marginBottom: 5 }} onPress={() => loanStore.setPickBank()}>
										<Text style={{ color: "white", fontSize: 16 }}>X</Text>
									</TouchableOpacity>
								</View>
								<Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Select your Bank</Text>
								<View style={{ width: "100%", position: "relative" }}>
									<TextInput
										style={{
											marginTop: 5,
											height: 30,
											width: "100%",
											fontFamily: "Inter-Regular",
											minHeight: 45,
											borderColor: "#E6E9EC",
											borderWidth: 1,
											padding: 8,
											borderRadius: 8,
											fontSize: 16,
											backgroundColor: "#FFFFFF"
										}}
										onChangeText={text => loanStore.searchBanksByName(text)}
										placeholder="Search Bank..."
									/>
									<View style={{ width: "10%", position: "absolute", right: 10, top: "50%" }}>
										<IconSearch />
									</View>
								</View>
							</View>
							<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 0.8, paddingTop: 10, paddingHorizontal: 20, width: "100%", height: 70, backgroundColor: "#FFFFFF" }}>
								{originalBanks?.map((data, idx) => (
									<TouchableOpacity
										activeOpacity={0.9}
										style={{
											height: 30,
											display: "flex",
											flexDirection: "row",
											gap: 10,
											width: "100%",
											justifyContent: "start",
											backgroundColor: "#fff",
											marginVertical: 5,
											alignItems: "center",
											borderRadius: 12
										}}
										key={idx}
										onPress={() => loanStore.setPickSingleBank(data)}
									>
										<View style={{ backgroundColor: "#D9D9D9", width: 30, height: 30, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
											<Text>{`${getFirstCharacters(data?.name)}`}</Text>
										</View>
										<Text style={{ fontFamily: "Inter-Regular", fontSize: 12, color: "#000" }}>{data?.name}</Text>
									</TouchableOpacity>
								))}
								<View style={{ height: 40 }}></View>
							</ScrollView>
						</View>
					</View>
				</Modal>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default observer(SelectBankModal)

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.4)"
		// padding: 20
	},
	modalView: {
		margin: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "#FFFFFF",
		paddingBottom: 0,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		marginTop: 20
		// elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "transparent"
	},
	textStyle: {
		color: "black",
		fontWeight: "bold",
		fontFamily: "Inter-Regular",
		fontSize: 16,
		textAlign: "justify"
	},
	textDesc: {
		color: "#2E2E2E",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "300",
		lineHeight: 22,
		textAlign: "justify",
		marginLeft: 5
	},

	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	okButtonText: {
		color: "#1DB954",
		textAlign: "center",
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "500",
		letterSpacing: -0.02
	}
})
