import { StyleSheet, Text, View } from "react-native"
import React from "react"

const ProfileHeadText = ({ title = "" }) => {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
		</View>
	)
}

export default ProfileHeadText

const styles = StyleSheet.create({
	title: {
		color: "#000",
		fontFamily: "Inter-SemiBold",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "500",
		marginTop: 10
		// lineHeight: "140%"
	}
})
