import React, { useState } from "react"
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import { useQueryClient } from "@tanstack/react-query"
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"
import { Dropdown } from "react-native-element-dropdown"
import DateTimePicker from '@react-native-community/datetimepicker';

import CustomPrimaryButton from "../../components/common/PrimaryButton"
import CustomTextInput from "../../components/common/Input"
import { SafeAreaView } from "react-native-safe-area-context"
import LoanHeader from "../../components/Loan/Header"
import authStore from "../../mobx/AuthStore"
import profileStore from "../../mobx/profileStore"
import LoadingModal from "../../components/common/LoadingScreen"
import SuccessMainModal from "../../components/common/SuccessMainScreen"
// import SuccessModal from "../../components/common/SuccessScreen"
import ErrorModal from "../../components/common/ErrorScreen"
import { lgaData, stateData } from "../../components/common/nigeria_state_lga"
import CustomSelectInputMask from "../../components/common/CustomSelectInputMask"
import { useRef } from "react"
import OfficeStatusSheetModal from "../../components/Account/forms/Sheets/OfficeStatusSheet"
import OfficeStatusData from "../../components/Account/forms/Sheets/OfficeStatusData"
import CustomDatePicker from "../../components/common/CustomDatePicker"
import {  convertToDateObject, convertToFullDateString, formatDateToYYYYMMDDMain } from "../../components/common/formatDates"

const ResidentialsDetailsFormScreen = ({ navigation }) => {
	const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
	const [date, setDate] = useState(authStore.loggedInUser.when_moved_in  ? convertToDateObject(convertToFullDateString(authStore.loggedInUser.when_moved_in)) : new Date(0));
	const queryClient = useQueryClient()
	const residentstatusRef = useRef(null)

	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1)
	}
	const personalResidentialSchema = yup.object().shape({
		address: yup.string().required().label("Address"),
		lga: yup.string().required().label("L.G.A"),
		state: yup.string().required().label("State"),
		residentialStatus: yup.string().required().label("Date of Birth"),
		whenMovedIn: yup.string().label("When Moved In")
	})

	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			address: authStore.loggedInUser.address ? `${authStore.loggedInUser.address}` : "",
			lga: authStore.loggedInUser.lga ? authStore.loggedInUser.lga : "",
			state: authStore.loggedInUser.state ? authStore.loggedInUser.state.capitalize() : "",
			residentialStatus: authStore.loggedInUser.residential_status ? authStore.loggedInUser.residential_status : "",
			whenMovedIn: authStore.loggedInUser.when_moved_in ? authStore.loggedInUser.when_moved_in : ""
		},
		onSubmit: async values => {
			// formik.setFieldValue("whenMovedIn", date, true)
			let payload = { ...values }
			payload.whenMovedIn = date
			const response = await profileStore.updatePersonalDetails(payload)
			queryClient.invalidateQueries({ queryKey: ["user"] })
			// if (response?.data?.data && !response?.data?.data?.user?.is_verified) {
			// 	navigation.navigate("Otp")
			// }
		},
		validationSchema: personalResidentialSchema
	})
	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("personal-data")
	}

	const handleSelectResidentStatus = text => {
		if (text === "Active") {
			formik.setFieldValue("residentialStatus", "Active", true)
			residentstatusRef.current?.close()
		} else {
			formik.setFieldValue("residentialStatus", "Inactive", true)
			residentstatusRef.current?.close()
		}
	}
	const handlePickResidentialStatus = () => {
		residentstatusRef.current?.present()
	}
	
	const handleOnPressStartDate = () => {
		setOpenStartDatePicker(!openStartDatePicker)
	}
	const onChange = (event, selectedDate) => {
			if (Platform.OS === 'android') {
	
			}
		 
			if (event.type === 'set') {
				setOpenStartDatePicker(!openStartDatePicker)
				let adjustedDate = new Date(selectedDate);
      adjustedDate.setHours(12, 0, 0, 0);
				setDate(adjustedDate);
			
			}
		
			if (event.type === 'dismissed') {
				setOpenStartDatePicker(!openStartDatePicker)
			  return;
			}
		
			if (event.type === 'neutralButtonPressed') {
				setOpenStartDatePicker(!openStartDatePicker)
			} 
		  };
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : ""}
			style={{
				width: "100%",
				height: "100%"
			}}
		>
			<SafeAreaView style={styles.container}>
				<LoanHeader navigation={navigation} title="Residential details" />
				<ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
					{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}

					{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
					{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}

					<View style={{ marginTop: 20 }}>
						<CustomTextInput
							label="Address"
							placeholder=" Enter your address"
							name="address"
							value={formik.values.address}
							inputMode="text"
							// readOnly={authStore.loading}
							onChangeText={formik.handleChange("address")}
							onBlur={formik.handleBlur("address")}
							error={formik.touched.address && formik.errors.address}
						/>
					</View>
					<View
						style={{
							marginBottom: 20
						}}
					>
						<Dropdown
							style={[styles.input]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={stateData}
							search
							// name="state"
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder={true ? "Select state" : "..."}
							searchPlaceholder="Search..."
							value={formik.values.state}
							onChange={state => {
								formik.setFieldValue("state", state?.value, false)
							}}
						/>
						{formik.errors.state && <Text style={styles.error}>{formik.errors.state}</Text>}
					</View>
					<View
						style={{
							marginBottom: 20
						}}
					>
						<Text style={styles.label}>LGA</Text>
						<Dropdown
							style={[styles.input]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={formik.values.state ? lgaData[formik.values.state] : []}
							search
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder={true ? "Select LGA" : "..."}
							searchPlaceholder="Search..."
							value={formik.values.lga}
							onChange={lga => {
								formik.setFieldValue("lga", lga?.value, false)
							}}
						/>
						{formik.errors.lga && <Text style={styles.error}>{formik.errors.lga}</Text>}
					</View>
					<View>
						<CustomSelectInputMask
							value={formik.values.residentialStatus}
							error={formik.touched.residentialStatus && formik.errors.residentialStatus}
							label="Residential Status"
							onPress={() => handlePickResidentialStatus()}
							placeholder="Select Status--"
							hideIcon={true}
						/>

						<OfficeStatusSheetModal backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={residentstatusRef}>
							<OfficeStatusData value={formik.values?.residentialStatus} onPressActive={() => handleSelectResidentStatus("Active")} onPressInactive={() => handleSelectResidentStatus("Inactive")} />
						</OfficeStatusSheetModal>

					
					</View>
					<View>
						<CustomDatePicker value={`${date ? formatDateToYYYYMMDDMain(date) : authStore.loggedInUser.when_moved_in ? authStore.loggedInUser.when_moved_in : ""}`} error={formik.touched.whenMovedIn && formik.errors.whenMovedIn} label="When did you move here?" onPress={handleOnPressStartDate} />
						
					</View>
					<View style={{ marginTop: 50 }}>
						<CustomPrimaryButton onPress={formik.handleSubmit} title="Save Changes" />
					</View>
					<View>
						<Modal animationType="slide" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} transparent={true} visible={openStartDatePicker}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									
								<DateTimePicker
							        value={date}
									mode="date" 
									display="default" 
									textColor="#008080"
									accentColor="#008080"
									style={{ backgroundColor: 'red' }}
									  onChange={onChange}
        						/>
									
								</View>
							</View>
						</Modal>
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

export default observer(ResidentialsDetailsFormScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	centeredView: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 1.5,
		alignItems: "center",
		// justifyContent: "center",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	modalView: {
		margin: 0,
		
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 0,
		padding: 1,
		paddingTop: 20,
		paddingBottom: 35,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation:0
	},
	content: {
		flex: 1,
		paddingHorizontal: 20
	},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8
	},
	icon: {
		marginRight: 5
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14
	},
	placeholderStyle: {
		fontSize: 16
	},
	selectedTextStyle: {
		fontSize: 16
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16
	},
	label: {
		fontFamily: "Inter-Regular",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 5,
		color: "#002D2D"
	},
	input: {
		fontFamily: "Inter-Regular",
		minHeight: 56,
		borderColor: "#E6E9EC",
		borderWidth: 1,
		padding: 8,
		borderRadius: 8,
		fontSize: 16
	},
	error: {
		color: "red",
		marginTop: 3,
		fontSize: 12
	}
})
