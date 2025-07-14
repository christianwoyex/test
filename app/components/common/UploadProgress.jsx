import { Dimensions, Modal, StyleSheet, Text, View } from "react-native"
import * as Progress from "react-native-progress"
const { width } = Dimensions.get("screen")
const UploadProgress = ({ modalVisible, onRequestClose, title = "Loading....", progress = 0 }) => {
	return (
		<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
			<View style={styles.centeredView}>
				<Progress.Bar widt={width} height={8} color="#008080" progress={progress} animated={true} />
				<Text style={styles.loadinText}>{title}</Text>
			</View>
		</Modal>
	)
}

export default UploadProgress

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		width: "100%",
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
		marginTop: 20
	}
})
