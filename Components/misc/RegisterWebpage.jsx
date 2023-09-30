import React from "react";
import { WebView } from "react-native-webview";
import { Image, View } from "react-native";

const RegisterWebpage = () => {
  return (
    <>
      <WebView
        source={{
          uri: "https://www.nextzen24.com/register",
        }}
      />
      <View className="absolute justify-center items-center h-32 top-0 bg-white w-full">
        <Image
          source={require("../../assets/black-logo.png")}
          className="w-[220px] "
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export default RegisterWebpage;
