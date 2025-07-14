import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const TwoSectionScreen = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.topSection}>
				<Text>Hello</Text>
			</View>

			<View style={styles.bottomSection}>{/* Your content for the bottom section goes here */}</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "white" // Set background color as needed
	},
	container: {
		flex: 1,
		flexDirection: "column"
	},
	topSection: {
		flex: 0.6,
		backgroundColor: "#3498db" // Example background color for the top section
		// justifyContent: "center",
		// alignItems: "center"
	},
	bottomSection: {
		flex: 0.4,
		backgroundColor: "#2ecc71", // Example background color for the bottom section
		justifyContent: "center",
		alignItems: "center"
	}
})

export default TwoSectionScreen
