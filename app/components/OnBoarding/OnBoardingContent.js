import React, { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight, ImageBackground } from "react-native"
import AppColors from "../../config/colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../context/AuthContext"
const { width, height } = Dimensions.get("window")

const OnboardingScreen = ({ navigation }) => {
	const [currentPage, setCurrentPage] = useState(0)

	const handleScroll = event => {
		const { contentOffset } = event.nativeEvent
		const page = Math.round(contentOffset.x / width)
		setCurrentPage(page)
	}
	const { setSlideState } = useAuth()

	// const handleNext = () => {
	// 	if (currentPage < 2) {
	// 		flatListRef.current.scrollToIndex({ index: currentPage + 1, animated: true })
	// 	}
	// }

	const flatListRef = React.createRef()

	const data = [
		{ key: "1", image: require("../../../assets/images/slide1.png"), description: "Seamless Access to Loan for Your Business" },
		{ key: "2", image: require("../../../assets/images/slide2.png"), description: "Seamless Access to Loan for Your Business" },
		{ key: "3", image: require("../../../assets/images/slide3.png"), description: "Seamless Access to Loan for Your Business" }
	]
	const handleSkip = () => {
		setSlideState()
		navigation.push("Login")
	}
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.topSection}>
					<FlatList
						ref={flatListRef}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={handleScroll}
						scrollEventThrottle={16}
						data={data}
						keyExtractor={item => item.key}
						renderItem={({ item }) => (
							<View style={styles.slide}>
								<ImageBackground source={item.image} style={styles.image}>
									<TouchableOpacity
										activeOpacity={0.9}
										style={{
											display: "flex",
											borderRadius: 10,
											justifyContent: "center",
											alignItems: "center",
											position: "absolute",
											width: 50,
											height: 20,
											backgroundColor: "#B5F3D6",
											top: 30,
											right: 30
											// paddingBottom: 4
										}}
										onPress={() => handleSkip()}
										title={"Login"}
									>
										<Text style={{ color: AppColors.btngrey, fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>Skip</Text>
									</TouchableOpacity>
								</ImageBackground>
								<Text style={styles.description}>{item.description}</Text>
							</View>
						)}
					/>

					<View style={styles.indicators}>
						{data.map((_, index) => (
							<TouchableOpacity
								activeOpacity={0.9}
								key={index}
								style={[styles.indicator, index === currentPage && styles.activeIndicator]}
								onPress={() => flatListRef.current.scrollToIndex({ index, animated: true })}
							/>
						))}
					</View>
				</View>
				<View style={styles.bottomSection}>
					<TouchableOpacity
						activeOpacity={0.9}
						style={styles.button}
						onPress={() => {
							navigation.navigate("Register")
							handleSkip()
						}}
					>
						<Text style={styles.btnText}>Register</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.9}
						style={styles.buttonOutline}
						onPress={() => {
							navigation.navigate("Login")
							handleSkip()
						}}
					>
						<Text style={styles.btnTextOutline}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	},
	container: {
		flex: 1,
		flexDirection: "column"
	},
	topSection: {
		justifyContent: "center",
		alignItems: "center"
	},
	bottomSection: {
		width,
		marginTop: height / 12,
		justifyContent: "center",
		alignItems: "center"
	},
	slide: {
		width

		// alignItems: "center",
		// justifyContent: "center"
		// backgroundColor: "red"
	},
	image: {
		// n
		position: "relative",
		display: "flex",
		// aspectRatio: "1.18",
		width: "100%",
		height: height * 0.55
		// flexDirection: "column",
		// justifyContent: "center"
		// alignItems: "end"
		// padding: "48px 33px 48px 60px"
	},
	description: {
		fontSize: 18,
		textAlign: "center",
		fontFamily: "Inter-SemiBold",
		marginHorizontal: 50,
		color: "#002D2D",
		fontWeight: "bold",
		marginTop: 30
	},
	indicators: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20
	},
	indicator: {
		width: 16,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#D9ECEC",
		marginHorizontal: 2
	},
	activeIndicator: {
		backgroundColor: AppColors.secondary,
		width: 30,
		height: 8
	},
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 55,
		color: "#FFF",
		width: "80%",
		backgroundColor: AppColors.primary,
		marginBottom: 20
	},
	btnText: {
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: "Inter-SemiBold",
		color: "#FFF"
	},
	buttonOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#006060",
		height: 55,
		color: "#FFF",
		width: "80%",
		backgroundColor: "transparent"
	},
	btnTextOutline: {
		fontFamily: "Inter-SemiBold",
		color: AppColors.btngrey,
		fontSize: 18,
		fontWeight: "bold"
	}
})

export default OnboardingScreen
