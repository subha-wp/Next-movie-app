import React, {useState } from "react";
import { styled } from "nativewind";
import { View, Text, Pressable, Image, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import WebpageView from "../Components/misc/WebpageView";



const IText = styled(
  Text,
  "p-1 bg-[#bbfabd] tracking-wider w-[140px] font-semibold  text-center rounded-md "
);
const StyledButton = styled(Pressable, " p-2   rounded-xl w-[60%] ");

const ApkScreen = ({ route, navigation }) => {
  const { appTittle, appImage, slug } = route.params;

  const [showDownloadPage, setShowDownloadPage] = useState(false);


  const handleDownload = async () => {
    setShowDownloadPage(true);
    
  };



  return (
    <View className=" p-2 h-full bg-white mt-8 ">
      <View>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
      </View>
      <View className="flex justify-center items-center h-[80%]">
        <View className="flex flex-row space-x-3">
          <Image
            source={{ uri: appImage }}
            className="w-[160px] h-[160px] "
            resizeMode="contain"
          />
          <View className="space-y-2 w-[50%]">
            <Text className="font-semibold text-[20px]">{appTittle}</Text>
          </View>
        </View>
        <View className="mt-4 flex justify-center flex-row">
          <StyledButton
            className="bg-[#0BFA15] flex flex-row items-center justify-evenly"
            onPress={handleDownload}
          >
            <Text className="text-center font-semibold text-xl text-white tracking-wider">
              Download
            </Text>
            <Ionicons
              name="ios-cloud-download-outline"
              size={24}
              color="white"
            />
          </StyledButton>
        </View>
        {showDownloadPage && (
          <Modal animationType="slide">
            <WebpageView
              setShowDownloadPage={setShowDownloadPage}
              downloadLink={slug}
              navigation={navigation}
            />
          </Modal>
        )}
      </View>
      <View className="absolute bottom-10">{/* <BannerAdComp /> */}</View>
    </View>
  );
};

export default ApkScreen;
