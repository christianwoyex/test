import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { observer } from "mobx-react"
import LottieView from "lottie-react-native"
import { IconSuccessMain } from "../../../assets/icons"
import { useEffect, useRef } from "react"

const SuccessMainModal = ({ modalVisible, message = "", headerTitle = "Success!", onRequestClose }) => {
	const animationRef = useRef(null)

	useEffect(() => {
		animationRef.current?.play()
		setTimeout(() => {
			onRequestClose()
		}, 2000)
	}, [])
	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onBackdropPress={onRequestClose}>
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={onRequestClose}>
				<View style={styles.centeredView}>
					<View style={{ flex: 0.2, alignItems: "center", justifyContent: "center", padding: 20, width: "100%" }}>
						<LottieView resizeMode="contain" ref={animationRef} source={require("../../../assets/success.json")} style={{ width: 150, height: 150 }} autoPlay={true} loop={true} />
					</View>

					<Text style={styles.loadinTextErr}>{headerTitle}</Text>
					<Text style={styles.loadinText}>{message}</Text>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}

export default observer(SuccessMainModal)

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		padding: 20
	},
	loadinText: {
		fontFamily: "Inter-Regular",
		fontSize: 13,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D",
		lineHeight: 22.2,
		textAlign: "center",
		marginTop: 10
	},
	loadinTextErr: {
		fontFamily: "Inter-Regular",
		fontSize: 25,
		fontWeight: "400",

		marginBottom: 5,
		color: "green",
		marginTop: 10
	}
})
