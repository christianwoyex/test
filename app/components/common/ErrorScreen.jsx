import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { observer } from "mobx-react"
import LottieView from "lottie-react-native"
import authStore from "../../mobx/AuthStore"
import { useEffect, useRef } from "react"
const ErrorModal = ({ modalVisible, error = "", onRequestClose }) => {
	const animationRef = useRef(null)

	useEffect(() => {
		animationRef.current?.play()

		setTimeout(() => {
			onRequestClose()
		}, 3000)
	}, [])

	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onBackdropPress={onRequestClose}>
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={onRequestClose}>
				<View style={styles.centeredView}>
					<View style={{ flex: 0.2, alignItems: "center", padding: 20, width: "100%" }}>
						<LottieView resizeMode="contain" ref={animationRef} source={require("../../../assets/error_animate.json")} style={{ width: 150, height: 150 }} autoPlay={true} loop={true}  />
					</View>

					<Text style={styles.loadinTextErr}>Unsuccessful!</Text>
					<Text style={styles.loadinText}>{error}</Text>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}

export default observer(ErrorModal)

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
		textAlign: "center",
		lineHeight: 22,
		marginTop: 10
	},
	loadinTextErr: {
		fontFamily: "Inter-SemiBold",
		fontSize: 18,
		fontWeight: "400",
		marginBottom: 5,
		color: "red",
		marginTop: 10
	}
})
