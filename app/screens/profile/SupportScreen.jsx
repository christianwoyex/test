import { EXPO_TAWK_API, EXPO_TAWK_URL } from "@env"
import React, { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import * as DeviceInfo from "expo-device"
import sha256 from "crypto-js/sha256"
import LoanHeader from "../../components/Loan/Header"
import { observer } from "mobx-react"
import WebView from "react-native-webview"
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native"
import authStore from "../../mobx/AuthStore"

const SupportScreen = ({ navigation }) => {
	const isAndroid = () => Platform.OS === "android"

	const startChat = navigation => {
		const androidDevice = isAndroid() ? DeviceInfo.brand + "-" + DeviceInfo.modelName : "N/A"
		const androidModel = isAndroid() ? "Android - " + DeviceInfo.osVersion : "N/A"
		const iOSDevice = isAndroid() ? "N/A" : DeviceInfo.brand + " - " + DeviceInfo.modelId
		const iOSModel = isAndroid() ? "N/A" : "iOS - " + DeviceInfo.osVersion

		tawktoUser().then(tawkUser => {
			var user = tawkUser

			const jsCode = `
      if (typeof Tawk_API !== "undefined") {
        window.Tawk_API.onLoad = function(){
          window.Tawk_API.setAttributes({
              'name'    : '${authStore?.loggedInUser.last_name} ${authStore?.loggedInUser.first_name}',
              'email' : '${authStore?.loggedInUser?.email}',
              'userId': '${authStore?.loggedInUser?.id}',
              'Phone': '${authStore?.loggedInUser?.phone}',
             
              'androidDevice': '${androidDevice}',
              'androidModel': '${androidModel}',
              'iOSDevice': '${iOSDevice}',
              'iOSModel': '${iOSModel}',
              'hash' : '${getHash(authStore?.loggedInUser?.email ? authStore?.loggedInUser?.email : "festusalabo@gmail.com")}'
              }, function(error){
                // if (error != undefined){
                //   alert(error);
                //  }
          });
        };
      } else {
        console.error("Tawk_API is not available. Make sure Tawk.to is properly loaded.");
      }`
			authStore.setChatScript(jsCode)
			// navigation.navigate("support-screen", { script: jsCode }) //using react navigation. Yours may differ
		})
	}

	async function tawktoUser() {
		var user = {}

		if (user == null) {
			user = {}
			user.fullName = "Guest"
		}
		return user
	}

	function getHash(message) {
		var hash = ""
		if (message != null || message != undefined) {
			hash = sha256(message, EXPO_TAWK_API).toString()
		}

		return hash
	}
	useEffect(() => {
		startChat()
	}, [])
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Support" />

			<WebView
				source={{ uri: EXPO_TAWK_URL }} // Replace 'https://www.example.com' with your desired URL
				style={{ flex: 1 }}
				startInLoadingState={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				injectedJavaScript={authStore.chat_script}
				renderLoading={() => (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#008080" />
					</View>
				)}
			/>
		</SafeAreaView>
	)
}

export default observer(SupportScreen)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	content: {
		flex: 1,
		paddingHorizontal: 20
	},
	divScreenForm: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between"
	},
	divScreenInner: {
		width: "48%"
	},
	centeredView: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 1.5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	modalView: {
		margin: 10,
		backgroundColor: "#008080",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		padding: 1,
		paddingTop: 20,
		paddingBottom: 35,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})
