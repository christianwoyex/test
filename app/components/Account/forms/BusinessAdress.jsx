import React, { useCallback, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Modal,
  View,
} from "react-native";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { observer } from "mobx-react";
import { Dropdown } from "react-native-element-dropdown";

import CustomSelectInputMask from "../../common/CustomSelectInputMask";
import CustomTextInput from "../../common/Input";
import CustomPrimaryButton from "../../common/PrimaryButton";
import CustomDatePicker from "../../common/CustomDatePicker";
import profileStore from "../../../mobx/profileStore";
import LoadingModal from "../../common/LoadingScreen";
import SuccessMainModal from "../../common/SuccessMainScreen";

import ErrorModal from "../../common/ErrorScreen";
import { lgaData, stateData } from "../../common/nigeria_state_lga";
import OfficeStatusData from "./Sheets/OfficeStatusData";
import OfficeStatusSheetModal from "./Sheets/OfficeStatusSheet";
import {
  addOneDay,
  convertToDateObject,
  convertToFullDateString,
  convertToYYYYMMDD,
  formatDateToYYYYMMDDMain,
} from "../../common/formatDates";

const BusinessAdressForm = ({ navigation }) => {
  const queryClient = useQueryClient();
  const officestatusRef = useRef(null);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [date, setDate] = useState(
    profileStore?.businessInfo?.when_moved_in
      ? convertToDateObject(
          convertToFullDateString(profileStore?.businessInfo?.when_moved_in)
        )
      : new Date(0)
  );

  function handleChangeStartDate(propDate) {
    // setSelectedStartDate(propDate)
    // formik.setFieldValue("whenMovedIn", selectedStartDate, true)
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const businessAddressSchema = yup.object().shape({
    address: yup.string().required().label("Business Address"),
    state: yup.string().min(2).required().label("State"),
    lga: yup.string().required().label("LGA"),
    officeStatus: yup.string().min(2).required().label("Office Status"),
    whenMovedIn: yup.string().label("when Moved In"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    initialValues: {
      address: profileStore.businessInfo.address
        ? profileStore.businessInfo.address
        : "",
      state: profileStore.businessInfo.state
        ? profileStore.businessInfo.state
        : "",
      lga: profileStore.businessInfo.lga ? profileStore.businessInfo.lga : "",
      officeStatus: profileStore.businessInfo.office_status
        ? profileStore.businessInfo.office_status
        : "",
      whenMovedIn: profileStore.businessInfo.when_moved_in
        ? profileStore.businessInfo.when_moved_in
        : "",
    },
    onSubmit: async (values) => {
      formik.setFieldValue("whenMovedIn", date, true);
      let payload = { ...values };
      payload.whenMovedIn = date;

      const response = await profileStore.updateBusinessData(payload);

      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: ["business"] });
      }
    },
    validationSchema: businessAddressSchema,
  });
  const handlePresentOfficeStatus = useCallback(() => {
    officestatusRef.current?.present();
  }, []);

  const handlePickOfficeStatus = () => {
    handlePresentOfficeStatus();
  };
  const handleSelectOfficeStatus = (text) => {
    if (text === "Active") {
      formik.setFieldValue("officeStatus", "Active", true);
      officestatusRef.current?.close();
    } else {
      formik.setFieldValue("officeStatus", "Inactive", true);
      officestatusRef.current?.close();
    }
  };
  const handleCloseSuccess = () => {
    profileStore.clearSuccessStatus();
    navigation.navigate("business-data");
  };
  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
    }

    if (event.type === "set") {
      setOpenStartDatePicker(!openStartDatePicker);
      let adjustedDate = new Date(selectedDate);
      adjustedDate.setHours(12, 0, 0, 0);
      setDate(adjustedDate);
    }

    if (event.type === "dismissed") {
      setOpenStartDatePicker(!openStartDatePicker);
      return;
    }

    if (event.type === "neutralButtonPressed") {
      setOpenStartDatePicker(!openStartDatePicker);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : ""}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {profileStore.loading && (
        <LoadingModal modalVisible={profileStore.loading} />
      )}
      {profileStore.error && (
        <ErrorModal
          modalVisible={profileStore.error}
          error={profileStore.errorValue}
          onRequestClose={() => profileStore.clearErrorStatus()}
        />
      )}
      {profileStore.success && (
        <SuccessMainModal
          modalVisible={profileStore.success}
          message={profileStore.successValue}
          onRequestClose={() => handleCloseSuccess()}
        />
      )}
      <View style={{ flex: 1, marginTop: 30 }}>
        <CustomTextInput
          name="address"
          value={formik.values.address}
          onChangeText={formik.handleChange("address")}
          onBlur={formik.handleBlur("address")}
          error={formik.touched.address && formik.errors.address}
          label="Address"
          placeholder="Enter Business address"
        />

        <View
          style={{
            marginBottom: 20,
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
            onChange={(state) => {
              formik.setFieldValue("state", state?.value, false);
            }}
          />
          {formik.errors.state && (
            <Text style={styles.error}>{formik.errors.state}</Text>
          )}
        </View>
        <View
          style={{
            marginBottom: 20,
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
            onChange={(lga) => {
              formik.setFieldValue("lga", lga?.value, false);
            }}
          />
          {formik.errors.lga && (
            <Text style={styles.error}>{formik.errors.lga}</Text>
          )}
        </View>
        <CustomSelectInputMask
          value={formik.values.officeStatus}
          label="Office Status"
          onPress={() => handlePickOfficeStatus()}
          placeholder="Select Office Status--"
          hideIcon={true}
        />
        <OfficeStatusSheetModal
          backgroundStyle={{ backgroundColor: "#FFFFFF" }}
          handleIndicatorStyle={{
            backgroundColor: "#D9D9D9",
            width: 58,
            height: 7,
          }}
          ref={officestatusRef}
        >
          <OfficeStatusData
            value={formik.values?.officeStatus}
            onPressActive={() => handleSelectOfficeStatus("Active")}
            onPressInactive={() => handleSelectOfficeStatus("Inactive")}
          />
        </OfficeStatusSheetModal>
        <CustomDatePicker
          value={`${formatDateToYYYYMMDDMain(date)}`}
          label="When did you move here?"
          onPress={handleOnPressStartDate}
        />
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <CustomPrimaryButton
            title="Save Business Address"
            onPress={formik.handleSubmit}
          />
        </View>

        <View>
          <Modal
            animationType="slide"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DateTimePicker
                  negativeButton={{ label: "Cancel", textColor: "#008080" }}
                  positiveButton={{ label: "OK", textColor: "#008080" }}
                  value={date}
                  mode="date"
                  display="material"
                  textColor="#008080"
                  accentColor="#008080"
                  onChange={onChange}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default observer(BusinessAdressForm);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 1.5,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  modalView: {
    flex: 1,
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
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    color: "#002D2D",
  },
  input: {
    fontFamily: "Inter-Regular",
    minHeight: 56,
    borderColor: "#E6E9EC",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 3,
    fontSize: 12,
  },
});
