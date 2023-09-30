import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { Entypo } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WebpageView = ({ setShowDownloadPage, downloadLink, navigation }) => {
  const handleFalseDownload = async () => {
    setShowDownloadPage(false);
    const tempDownloads = await AsyncStorage.getItem("downloads");
    let downloadNumber = tempDownloads === null ? 0 : parseInt(tempDownloads);
    const updatedNumer = downloadNumber + 1;
    await AsyncStorage.setItem("downloads", `${updatedNumer}`);
  };

  const [cutButton, setCutButton] = useState(false);

  setTimeout(() => {
    setCutButton(true);
  }, 25000);

  return (
    <>
      {cutButton && (
        <Pressable onPress={handleFalseDownload} className="self-end">
          <Entypo name="cross" size={44} color="black" />
        </Pressable>
      )}
      {cutButton === false && (
        <View className="self-center h-12">
          <Text className="mt-2 font-semibold text-[#0BFA15]">
            Please wait 25 sec
          </Text>
        </View>
      )}

      <WebView
        source={{
          uri: downloadLink,
        }}
      />
      <View className="absolute justify-center items-center h-32 top-10 bg-white w-full">
        <Image
          source={require("../../assets/black-logo.png")}
          className="w-[220px]"
          resizeMode="contain"
        />
      </View>
      <View className="absolute h-20 w-[85%] items-center justify-center bg-gray-50 bottom-0">
        {/* <Entypo name="arrow-with-circle-up" size={20} color="#0BFA15" /> */}
        <Text className="animate-bounce text-[18px] font-semibold">
          Press Button to Download 👉
        </Text>
      </View>
    </>
  );
};

export default WebpageView;
