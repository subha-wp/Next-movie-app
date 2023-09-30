import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ModalComp = ({ setShowAdModal }) => {
  return (
    <Modal animationType="slide">
      <Pressable onPress={() => setShowAdModal(false)} className="self-end">
        <Entypo name="cross" size={44} color="black" />
      </Pressable>

      <View className="justify-center items-center w-full h-full">
        <Text>Content</Text>
      </View>
    </Modal>
  );
};

export default ModalComp;
