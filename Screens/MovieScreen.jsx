import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { View, Text, Pressable, Image, Modal, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import WebpageView from "../Components/misc/WebpageView";



const IText = styled(
  Text,
  "p-1 bg-[#bbfabd] tracking-wider w-[140px] font-semibold  text-center rounded-md "
);
const StyledButton = styled(Pressable, " p-2   rounded-xl w-[60%] ");

const MovieScreen = ({ route, navigation }) => {
  const { name, image, downloadLink, lang, industry, releasedYear } =
    route.params;
  const movieImage = image.data[0].attributes.url;

  const [showDownloadPage, setShowDownloadPage] = useState(false);

  const handleDownload = async () => {
    setShowDownloadPage(true);
    const tempDownloads = await AsyncStorage.getItem("downloads");
    let downloadNumber = tempDownloads === null ? 0 : parseInt(tempDownloads);
    const updatedNumer = downloadNumber + 1;
    await AsyncStorage.setItem("downloads", `${updatedNumer}`);

    // const fileUrl =
    //   "https://od.lk/d/MTBfMjI2OTM2NzYwXw/WhatsApp%20Video%202023-09-14%20at%209.51.36%20AM.mp4";
    // const fileName = `${name}.mp4`;

    // const result = await FileSystem.downloadAsync(
    //   fileUrl,
    //   FileSystem.documentDirectory + fileName
    // );
    // console.log(result);

    // shareAsync(result.uri);
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
      <View className=" justify-center items-center h-[80%]">
        <View className="flex-row space-x-3">
          <Image
            source={{ uri: movieImage }}
            className="w-[160px] h-[250px] rounded-md"
            resizeMode="stretch"
          />
          <View className="space-y-2 w-[50%]">
            <Text className="font-semibold text-[21px]">{name}</Text>
            <IText className="">Lan:{lang}</IText>
            <IText className="">Ind:{industry}</IText>
            <IText className="">Year:{releasedYear}</IText>
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
              downloadLink={downloadLink}
              navigation={navigation}
            />
          </Modal>
        )}
      </View>
      <View className="absolute bottom-10">{/* <BannerAdComp /> */}</View>
    </View>
  );
};

export default MovieScreen;
