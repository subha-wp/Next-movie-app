import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const ApkCards = ({ apk, navigation }) => {
  const { appTittle, tittle, coverImage, slug } = apk.attributes;
  const appImage = coverImage.data.attributes.url;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ApkScreen", {
          appTittle,
          appImage,
          slug,
        })
      }
      className="border p-2 flex-row rounded-md justify-between items-center my-1"
    >
      <View className="flex-row">
        <Image
          source={{ uri: appImage }}
          className="w-[50px] h-[50px] rounded-md"
          resizeMode="contain"
        />
        <Text className="ml-2 font-semibold text-[17px]">{appTittle}</Text>
      </View>
      <Feather name="download-cloud" size={24} color="black" />
    </Pressable>
  );
};

export default ApkCards;
