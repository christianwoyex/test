import { useEffect } from "react"
import { AppState, AppStateStatus } from "react-native"

export function useAppState(onChange) {
	useEffect(() => {
		const subscription = AppState.addEventListener("change", onChange)
		return () => {
			subscription.remove()
		}
	}, [onChange])
}
