import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native"
import React from "react"
// import profileStore from "../../mobx/profileStore"
import { observer } from "mobx-react"
import authStore from "../../mobx/AuthStore"
import { IconUserAvatar } from "../../../assets/icons"

const HeaderHome = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
				<View style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: 60, height: 60, backgroundColor: "#B5F3D6", borderRadius: 60 / 2 }}>
					{authStore?.loggedInUser?.avatar ? <Image style={styles.userImage} source={{ uri: authStore?.loggedInUser?.avatar }} /> : <IconUserAvatar />}
					<View style={styles.floatingDot}></View>
				</View>
				<Text style={styles.userName}>Hi {authStore?.loggedInUser.last_name}</Text>
			</View>
			<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Notification")}>
				<Image source={require("../../../assets/images/noti.png")} />
			</TouchableOpacity>
		</View>
	)
}

export default observer(HeaderHome)
const styles = StyleSheet.create({
	container: {
		flex: 0.15,
		width: "100%",
		backgroundColor: "#F5F5F5",
		paddingLeft: 20,
		paddingRight: 20,
		display: "flex",

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	userName: {
		color: "#001F3F",
		fontFamily: "Inter-SemiBold",
		fontSize: 19,
		fontStyle: "normal",
		fontWeight: "600",
		marginLeft: 10
	},
	userImage: {
		width: 60,
		height: 60,
		backgroundColor: "#B5F3D6",
		borderRadius: 50,
		position: "relative"
	},
	floatingDot: {
		width: 12,
		height: 12,
		borderRadius: 50,
		backgroundColor: "#1DB954",
		position: "absolute",
		bottom: 0,
		right: 7
	}
})
