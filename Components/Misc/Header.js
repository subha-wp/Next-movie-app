import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const StyledText = styled(Text, "");
const StyledView = styled(View, "flex items-center");
const StyledButton = styled(Pressable);

export default function Header({ navigation }) {
  return (
    <StyledView className="bg-teal-400 mt-8 h-[60px]">
      <StyledView className="flex flex-row w-full justify-between items-center px-4">
        <StyledText
          className="text-green-900"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={40} />
        </StyledText>
        {/* image */}
        <StyledView className="w-[60px] h-[50px]">
          <Image
            source={require("../../assets/transparent-logo.png")}
            className="h-[50px] w-[80px]"
            resizeMode="contain"
          />
        </StyledView>
        <StyledView className="">
          <StyledText className="text-green-900">
            <MaterialCommunityIcons name="bell" size={30} />
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
