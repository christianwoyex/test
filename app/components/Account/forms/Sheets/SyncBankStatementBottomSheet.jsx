import React, { forwardRef, useCallback, useMemo, useRef } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet"

const SyncBankStatementBottomSheet = forwardRef(({ handleSheetChanges, itemIndex = 1, children, ...rest }, ref) => {
	// variables
	const snapPoints = useMemo(() => ["25%", "45%", "60%"], [])
	// ref

	const renderBackdrop = useCallback(props => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} opacity={0.7} />, [])
	// renders
	return (
		// <BottomSheetModalProvider>
		// <View style={styles.container}>
		<BottomSheetModal ref={ref} index={itemIndex} {...rest} snapPoints={snapPoints} backdropComponent={renderBackdrop} onChange={handleSheetChanges}>
			<View style={styles.contentContainer}>{children}</View>
		</BottomSheetModal>
		// </View>
		// </BottomSheetModalProvider>
	)
})
{
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// padding: 24,
		justifyContent: "center"
		// backgroundColor: "grey"
	},
	contentContainer: {
		flex: 1,
		alignItems: "center"
	}
})

export default SyncBankStatementBottomSheet
