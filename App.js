import "react-native-gesture-handler"
import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import React, { useCallback, useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query"
import ToastManager from "toastify-react-native"
import * as Updates from "expo-updates"

import SplashScreenUi from "./app/screens/SplashScreen"
import * as SplashScreen from "expo-splash-screen"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import Layout from "./app/components/Layout"
// import { AuthProvider, useAuth } from "./app/context/AuthContext"
import AuthStack from "./app/Navigations/AuthStack"
import { AuthProvider } from "./app/context/AuthContext"
// import Layout from "./app/components/Layout"
SplashScreen.preventAutoHideAsync()

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false)

	const [fontsLoaded, fontError] = useFonts({
		"Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
		"Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Regular": require("./assets/fonts/Inter-Regular.ttf")
	})

	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded || fontError) {
	// 		await SplashScreen.hideAsync()
	// 	}
	// }, [fontsLoaded, fontError])

	// if (!fontsLoaded && !fontError) {
	// 	return <SplashScreenUi />
	// }

	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 2 } }
	})
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync()
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			}
		} catch (error) {
			// You can also add an alert() here if needed for your purposes
			console.log(`Error fetching latest Expo update: ${error}`)
		}
	}
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync()

			if (update.isAvailable) {
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			}
		} catch (error) {
			// You can also add an alert() to see the error message in case of an error when fetching updates.
			alert(`Error fetching latest Expo update: ${error}`)
		}
	}
	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				// await Font.loadAsync(Entypo.font)
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise(resolve => setTimeout(resolve, 2000))
			} catch (e) {
				console.warn(e)
			} finally {
				// Tell the application to render
				setAppIsReady(true)
			}
		}

		prepare()
		onFetchUpdateAsync()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (!appIsReady) {
		return <SplashScreenUi />
	}

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<View style={styles.container} onLayout={onLayoutRootView}>
				<ToastManager
					style={{ width: "100%", paddingVertical: 5, paddingHorizontal: 10, heigh: 100 }}
					height={100}
					hasBackdrop={false}
					backdropOpacity={0.2}
					position="top"
					animationStyle="zoomInOut"
				/>
				<StatusBar style="dark" backgroundColor="#FFFFFF" />
				<QueryClientProvider client={queryClient}>
					<BottomSheetModalProvider>
						<NavigationContainer>
							<AuthProvider>
								<Layout />
							</AuthProvider>
						</NavigationContainer>
					</BottomSheetModalProvider>
				</QueryClientProvider>
			</View>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
