import React, { useCallback, useEffect, useRef, useState } from "react"
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useQueryClient } from "@tanstack/react-query"
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from "yup"
import { useFormik } from "formik"
import { observer } from "mobx-react"

import CustomPrimaryButton from "../../components/common/PrimaryButton"
import CustomTextInput from "../../components/common/Input"
import LoanHeader from "../../components/Loan/Header"
import authStore from "../../mobx/AuthStore"
import profileStore from "../../mobx/profileStore"
import GenderSelectBottomSheetModal from "../../components/Account/forms/Sheets/GenderSheet"
import MaritalStatusBottomSheetModal from "../../components/Account/forms/Sheets/MaritalSheet"
import MaritalStatusData from "../../components/Account/forms/Sheets/MaritalStatusData"
import GenderSelectData from "../../components/Account/forms/Sheets/GenderSelectData"
import CustomSelectInputMask from "../../components/common/CustomSelectInputMask"
import CustomDatePicker from "../../components/common/CustomDatePicker"
import LoadingModal from "../../components/common/LoadingScreen"
import SuccessMainModal from "../../components/common/SuccessMainScreen"
import ErrorModal from "../../components/common/ErrorScreen"
import { addOneDay, convertToDateObject, convertToFullDateString, convertToYYYYMMDD, formatDateToYYYYMMDDMain } from "../../components/common/formatDates"

  


const PersonDataFormScreen = ({ navigation }) => {

	const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
	// const dateDate = authStore.loggedInUser.dob ?? formatToISO(authStore.loggedInUser.dob) 
	
	const [date, setDate] = useState(authStore.loggedInUser.dob ? convertToDateObject(convertToFullDateString(authStore.loggedInUser.dob)) : new Date(0));
	const genderRef = useRef(null)
	const maritalRef = useRef(null)
	const queryClient = useQueryClient()
	const personalContactSchema = yup.object().shape({
		firstName: yup.string().required().label("First Name"),
		lastName: yup.string().required().label("Last Name"),
		gender: yup.string().required().label("Gender"),
		dob: yup.string().label("Date of Birth"),
		maritalStatus: yup.string().label("Marital Status")
	})

	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1)
	}
	const formik = useFormik({
		enableReinitialize: true,
		validateOnChange: true,
		initialValues: {
			firstName: authStore.loggedInUser.first_name ? `${authStore.loggedInUser.first_name}` : "",
			lastName: authStore.loggedInUser.last_name ? authStore.loggedInUser.last_name : "",
			gender: authStore.loggedInUser.gender ? authStore.loggedInUser.gender.capitalize() : "",
			dob: authStore.loggedInUser.dob ? authStore.loggedInUser.dob : "",
			maritalStatus: authStore.loggedInUser.marital_status ? authStore.loggedInUser.marital_status : ""
		},
		onSubmit: async values => {
			let payload = { ...values }
			payload.dob = date
			const response = await profileStore.updatePersonalDetails(payload)
			queryClient.invalidateQueries({ queryKey: ["user"] })
		},
		validationSchema: personalContactSchema
	})

	const handlePresentGender = useCallback(() => {
		genderRef.current?.present()
	}, [])
	const handlePresentMaritalStatus = useCallback(() => {
		maritalRef.current?.present()
	}, [])
	const handlePickGender = () => {
		handlePresentGender()
	}
	const handlePickMaritalStatus = () => {
		handlePresentMaritalStatus()
	}
	const handleSelectGender = text => {
		if (text === "Female") {
			formik.setFieldValue("gender", "Female", true)
			genderRef.current?.close()
		} else if (text === "Male") {
			formik.setFieldValue("gender", "Male", true)
			genderRef.current?.close()
		}
	}
	const handleSelectMaritalStatus = text => {
		if (text === "Single") {
			formik.setFieldValue("maritalStatus", "Single", true)
			maritalRef.current?.close()
		} else if (text === "Married") {
			formik.setFieldValue("maritalStatus", "Married", true)
			maritalRef.current?.close()
		} else {
			formik.setFieldValue("maritalStatus", "Divorced", true)
			maritalRef.current?.close()
		}
	}
	const handleOnPressStartDate = () => {
		setOpenStartDatePicker(!openStartDatePicker)
	}
	const handleCloseSuccess = () => {
		profileStore.clearSuccessStatus()
		navigation.navigate("personal-data")
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

useEffect(()=> {
console.log(date)
},[])
	return (
		<SafeAreaView style={styles.container}>
			<LoanHeader navigation={navigation} title="Personal Data" />
			<ScrollView style={styles.content}>
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : ""}
					style={{
						width: "100%",
						height: "100%"
					}}
				>
					{profileStore.loading && <LoadingModal modalVisible={profileStore.loading} />}
					{profileStore.error && <ErrorModal modalVisible={profileStore.error} error={profileStore.errorValue} onRequestClose={() => profileStore.clearErrorStatus()} />}
					{profileStore.success && <SuccessMainModal modalVisible={profileStore.success} message={profileStore.successValue} onRequestClose={() => handleCloseSuccess()} />}
					
					<View style={{ marginTop: 20 }}>
						<CustomTextInput
							label="First Name"
							placeholder="e.g Anthony"
							name="firstName"
							value={formik.values.firstName}
							inputMode="text"
							readOnly={authStore.loading}
							onChangeText={formik.handleChange("firstName")}
							onBlur={formik.handleBlur("firstName")}
							error={formik.touched.firstName && formik.errors.firstName}
						/>
					</View>
					<View>
						<CustomTextInput
							label="Last Name"
							placeholder="e.g Nwachukwu"
							name="lastName"
							value={formik.values.lastName}
							inputMode="text"
							readOnly={authStore.loading}
							onChangeText={formik.handleChange("lastName")}
							onBlur={formik.handleBlur("lastName")}
							error={formik.touched.lastName && formik.errors.lastName}
						/>
					</View>

					<View style={styles.divScreenForm}>
						<View style={styles.divScreenInner}>
							<CustomSelectInputMask hideIcon={true} value={formik.values.gender} label="Gender" onPress={() => handlePickGender()} error={formik.errors.gender} placeholder="Select ..." />
						</View>
						<MaritalStatusBottomSheetModal backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={maritalRef}>
							<MaritalStatusData
								value={formik.values.maritalStatus}
								onPressSingle={() => handleSelectMaritalStatus("Single")}
								onPressMarried={() => handleSelectMaritalStatus("Married")}
								onPressDivorced={() => handleSelectMaritalStatus("Divorced")}
							/>
						</MaritalStatusBottomSheetModal>

						<GenderSelectBottomSheetModal backgroundStyle={{ backgroundColor: "#FFFFFF" }} handleIndicatorStyle={{ backgroundColor: "#D9D9D9", width: 58, height: 7 }} ref={genderRef}>
							<GenderSelectData value={formik.values.gender} onPressFemale={() => handleSelectGender("Female")} onPressMale={() => handleSelectGender("Male")} />
						</GenderSelectBottomSheetModal>
						<View style={styles.divScreenInner}>
							<CustomDatePicker value={`${formatDateToYYYYMMDDMain(date)}`} label="Date of birth" onPress={handleOnPressStartDate} />
						</View>
					</View>
					<View>
						<CustomSelectInputMask
							hideIcon={true}
							value={formik.values.maritalStatus}
							label="Marital Status"
							onPress={() => handlePickMaritalStatus()}
							error={formik.errors.maritalStatus}
							placeholder="Select Marital Status..."
						/>
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
					<View style={{ marginTop: 40 }}>
						<CustomPrimaryButton onPress={formik.handleSubmit} title="Save Changes" />
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	)
}

export default observer(PersonDataFormScreen)
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
		// justifyContent: "center",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	modalView: {
		
		// backgroundColor: "#008080",
		flex:1,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 0,
		padding: 1,
		paddingTop: 20,
		paddingBottom: 35,
		width: "100%",
		// shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0
	}
})
