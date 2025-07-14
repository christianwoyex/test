import React from "react"
import { FlatList, ScrollView, View, StyleSheet, Image, Text } from "react-native"
import Svg, { Path, ClipPath, G, Defs, Rect } from "react-native-svg"

function SplashScreenUi(props) {
	return (
		<View style={styles.view1}>
			<Svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
				<G clip-Path="url(#clip0_617_879)">
					<Path
						d="M94.9983 25.0017C94.9983 25.1897 94.9983 25.3911 94.9849 25.5791L120 0.939913V0H74.6559C33.4206 0 0 33.4206 0 74.6559V119.127L25.0151 94.4881C25.2837 56.0591 56.5156 25.0017 94.9983 25.0017Z"
						fill="white"
					/>
					<Path
						d="M45.3441 120C86.566 120 120 86.5794 120 45.3441V0.939941L94.9849 25.5791C94.6761 63.9678 63.471 94.9984 25.0017 94.9984C25.0017 94.8238 25.0017 94.6627 25.0017 94.4881L0 119.127V120H45.3441Z"
						fill="#EEEEEE"
					/>
				</G>
				<Defs>
					<ClipPath id="clip0_617_879">
						<Rect width="120" height="120" fill="white" />
					</ClipPath>
				</Defs>
			</Svg>
		</View>
	)
}
export default SplashScreenUi

const styles = StyleSheet.create({
	view1: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#008080",
		display: "flex",
		flex: 1,
		// maxWidth: 480,
		width: "100%",
		flexDirection: "column",
		margin: "0 auto",
		padding: "50px 60px"
	},
	image1: {
		overflow: "hidden",
		position: "relative",
		display: "flex",
		width: 120,
		maxWidth: "100%",
		flexDirection: "column",
		margin: "312px 0 240px",
		aspectRatio: "1"
	}
})
