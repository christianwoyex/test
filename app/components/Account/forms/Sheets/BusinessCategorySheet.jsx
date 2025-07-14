import React, { forwardRef, useCallback, useMemo } from "react"
import { View, StyleSheet } from "react-native"
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet"

const BusinessCategoryBottomSheetModal = forwardRef(({ handleSheetChanges, itemIndex = 1, children, ...rest }, ref) => {
	const snapPoints = useMemo(() => ["30", "40"], [])
	const renderBackdrop = useCallback(props => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} opacity={0.7} />, [])

	return (
		<BottomSheetModal ref={ref} index={itemIndex} {...rest} snapPoints={snapPoints} backdropComponent={renderBackdrop} onChange={handleSheetChanges}>
			<View style={styles.contentContainer}>{children}</View>
		</BottomSheetModal>
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

export default BusinessCategoryBottomSheetModal
