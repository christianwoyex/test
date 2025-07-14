import { Modal, StyleSheet, Text, View } from "react-native"
import { IconBrandLogoBlue } from "../../../assets/icons"
import LottieView from "lottie-react-native"
import { useEffect, useRef } from "react"

const LoadingModal = ({ modalVisible, onRequestClose }) => {
	const animationRef = useRef(null)

	useEffect(() => {
		animationRef.current?.play()

		// Or set a specific startFrame and endFrame with:
		// animationRef.current?.play(30, 120)
	}, [])

	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
			<View style={styles.centeredView}>
				<LottieView ref={animationRef} source={require("../../../assets/seed.json")} style={{ width: 120, height: 60 }} autoPlay={true} loop={true} />
				<Text style={styles.loadinText}>Seedng®</Text>
			</View>
		</Modal>
	)
}

export default LoadingModal

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(225, 225, 225, 0.9)",
		padding: 20
	},
	loadinText: {
		fontFamily: "Inter-SemiBold",
		fontSize: 14,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D",
		marginTop: 10
	}
})
