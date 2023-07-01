import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

import IconsButton from "../../components/Ui/IconsButton";
import { Colors } from "../../constants/Styles";
import { DeviceContext } from "../../store/Devices-context";
import UserForm from "../../components/User/UserForm";
import { deleteDevice, storeDevice, updateDevice } from "../../util/Http";
import LoadingOverLay from "../../components/Ui/LoadingOverLay";
import ErrorOverLay from "../../components/Ui/ErrorOverLay";
import GoBack from "../../components/Ui/GoBack";
function EditInformation({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const devicesCtx = useContext(DeviceContext);
  const editedDevicesId = route.params?.deviceId;
  const isEditing = !!editedDevicesId;

  const selectedDevice = devicesCtx.devices.find(
    (device) => device.id === editedDevicesId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Device" : "Add Device",
    });
  }, [navigation, isEditing]);

  async function deleteDevicesHandler() {
    setIsSubmitting(true);
    try {
      await deleteDevice(editedDevicesId);
      devicesCtx.deleteDevice(editedDevicesId);
      navigation.goBack();
    } catch {
      setError("Could not delete device - please try again later!");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(deviceData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        devicesCtx.updateDevice(editedDevicesId, deviceData);
        await updateDevice(editedDevicesId, deviceData);
      } else {
        const id = await storeDevice(deviceData);
        devicesCtx.addDevice({ ...deviceData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - Please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverLay message={error} />;
  }
  if (isSubmitting) {
    return <LoadingOverLay />;
  }
  return (
    <View style={styles.container}>
      <GoBack />
      <View style={styles.imageContainer}>
        <Image
          style={[styles.image]}
          source={require("../../constants/img/logoTitle.png")}
        />
      </View>
      <ScrollView style={styles.formContainer}>
        <UserForm
          submitButtonLabel={isEditing ? "CHỈNH SỬA" : "XÁC NHẬN"}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValues={selectedDevice}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconsButton
              icon="trash"
              size={36}
              color={Colors.error500}
              onPress={deleteDevicesHandler}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
export default EditInformation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary900,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 90,
    borderRadius: 50,
  },
  formContainer: {
    // flex: 1,
    // top: 100,
  },
});
