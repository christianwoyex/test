import { WebView } from "react-native-webview"
import { View, StyleSheet, ActivityIndicator } from "react-native"

const WebViewItem = ({ linkUrl = "https://kreative-rock-frontend.vercel.app/policy" }) => {
	return (
		<View style={styles.container}>
			<WebView
				source={{ uri: linkUrl }} // Replace 'https://www.example.com' with your desired URL
				style={{ flex: 1 }}
				startInLoadingState={true}
				renderLoading={() => (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#008080" />
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})

export default WebViewItem
