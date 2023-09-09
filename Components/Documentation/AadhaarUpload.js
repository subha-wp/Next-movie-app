import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

const StyledText = styled(Text, "");
const StyledView = styled(View, "");
const StyledInput = styled(
  TextInput,
  "border-2 border-orange-500 rounded-md px-2 py-2 font-semibold tracking-wider"
);
const StyledButton = styled(Pressable, " px-2 py-1 rounded-md ");

export default function AdhaarUpload({
  setAadhaarFrontImg,
  setAadhaarBackImg,
  setShowAadhaarModal,
  setLoading,
  setAadhaarCheck,
}) {
  //handle check mark
  const [frontImgCheck, setFrontImgCheck] = useState(false);
  const [backImgCheck, setBackImgCheck] = useState(false);

  const pickAadhaarFrontImg = async () => {
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const finalData = "data:image/jpeg;base64," + result.assets[0].base64;
      const fromData = new FormData();
      fromData.append("file", finalData);
      fromData.append("upload_preset", "partner_images");
      fromData.append("cloud_name", "dsjk595y6");

      await fetch("https://api.cloudinary.com/v1_1/dsjk595y6/image/upload", {
        method: "post",
        body: fromData,
      })
        .then((res) => res.json())
        .then((data) => {
          setAadhaarFrontImg(data.secure_url);
          setFrontImgCheck(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const pickAadhaarBackImg = async () => {
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const finalData = "data:image/jpeg;base64," + result.assets[0].base64;
      const fromData = new FormData();
      fromData.append("file", finalData);
      fromData.append("upload_preset", "partner_images");
      fromData.append("cloud_name", "dsjk595y6");

      await fetch("https://api.cloudinary.com/v1_1/dsjk595y6/image/upload", {
        method: "post",
        body: fromData,
      })
        .then((res) => res.json())
        .then((data) => {
          setAadhaarBackImg(data.secure_url);
          setBackImgCheck(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSave = async () => {
    if (frontImgCheck === false) {
      Alert.alert("Please Upload Adhaar Front Image");
    } else if (backImgCheck === false) {
      Alert.alert("Please Upload Adhaar Back Image");
    } else {
      setAadhaarCheck(true);
      setShowAadhaarModal(false);
    }
  };

  const handlestop = async()=>{
    setLoading(false);
    setShowAadhaarModal(false)
  }

  return (
    <StyledView className="">
      <StyledText
        className="flex text-right"
        onPress={handlestop}
      >
        <MaterialCommunityIcons name="window-close" size={40} color="black" />
      </StyledText>
      <StyledView className="flex items-center justify-center mt-[250px] py-10">
        <StyledText className="text-2xl font-semibold">
          Upload Adhaar Details
        </StyledText>
        <StyledText className="text-red-500 font-semibold">
          *Wait For Green Check
        </StyledText>
      </StyledView>
      <StyledView className="flex flex-row mx-4 justify-evenly">
        <StyledButton
          className="border-2 border-blue-500 max-w-[150px] flex items-center"
          onPress={pickAadhaarFrontImg}
        >
          {frontImgCheck && (
            <StyledText className=" text-green-500 ">
              <MaterialCommunityIcons name="check-circle" size={24} />
            </StyledText>
          )}
          <StyledText className="font-semibold tracking-widest  text-center ">
            Upload Adhaar Front Page
          </StyledText>
        </StyledButton>
        <StyledButton
          className="border-2 border-blue-500 max-w-[150px] flex items-center"
          onPress={pickAadhaarBackImg}
        >
          {backImgCheck && (
            <StyledText className=" text-green-500 ">
              <MaterialCommunityIcons name="check-circle" size={24} />
            </StyledText>
          )}
          <StyledText className="font-semibold tracking-widest   text-center">
            Upload Adhaar Back Page
          </StyledText>
        </StyledButton>
      </StyledView>
      <StyledView className="flex items-center mt-16">
        <StyledButton className="bg-teal-500 px-10" onPress={handleSave}>
          <StyledText className=" text-xl font-semibold tracking-widest text-white">
            Done
          </StyledText>
        </StyledButton>
      </StyledView>
      
    </StyledView>
  );
}
