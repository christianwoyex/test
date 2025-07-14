import { StyleSheet, View } from "react-native"
import React from "react"
import { useAuth } from "../context/AuthContext"
import TabNavigation from "../Navigations/TabNavigation"
import AuthStack from "../Navigations/AuthStack"

const Layout = () => {
	const { authState } = useAuth()
	return <View style={{ flex: 1 }}>{authState.authenticated ? <TabNavigation /> : <AuthStack />}</View>
}

export default Layout

const styles = StyleSheet.create({})
