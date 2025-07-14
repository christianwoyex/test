import { Dimensions, StyleSheet, Text, View } from "react-native"
import React, { useRef } from "react"
import LottieView from "lottie-react-native"
import { useEffect } from "react"
const { height } = Dimensions.get("screen")
const EmptyData = () => {
	const animationRef = useRef(null)

	useEffect(() => {
		animationRef?.current?.play()
	}, [])

	return (
		<View style={styles.container}>
			<Text style={{ fontFamily: "Inter-Regular" }}>Empty Data</Text>
		</View>
	)
}

export default EmptyData

const styles = StyleSheet.create({
	container: {
		height: height / 2.5,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		position: "relative",
		backgroundColor: "transparent"
	},
	animation: {
		width: 200, // Adjust the width as needed
		height: 250 // Adjust the height as needed
	}
})
