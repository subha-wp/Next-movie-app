import React from "react";
import { Image, Modal, View } from "react-native";

export const Loading = () => {
  return (
    <Modal transparent={true}>
      <View className="h-full  justify-center items-center">
        <Image
          source={require("../../assets/loading.gif")}
          className="w-[50px] "
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};
