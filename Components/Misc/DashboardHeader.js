import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const StyledText = styled(Text, "");
const StyledView = styled(View, "flex items-center");
const StyledIView = styled(View, "flex items-center");
const StyledInput = styled(
  TextInput,
  "font-semibold w-[320px] px-2 tracking-wide rounded-md py-1 "
);
const StyledButton = styled(Pressable);

export default function DashboardHeader({ data }) {
  const { organisationName, address, orgaBanner, partnerId } = data;
  // console.log(orgaBanner);
  return (
    <StyledView className="bg-teal-300 py-2 pt-8 px-2">
      <StyledView className="flex flex-row space-x-2 items-center justify-between w-full px-2">
        <View className="flex flex-row items-center space-x-1">
          {/* image */}
          <StyledView className="w-[50px] h-[50px] ">
            <Image
              source={{ uri: orgaBanner }}
              className="h-[50px] w-[50px] rounded-md"
              resizeMode="contain"
            />
          </StyledView>
          {/* Name & Add... */}
          <StyledView className="items-start">
            <Text className="text-blue-600 font-semibold text-[17px]">
              {organisationName}
            </Text>
            <Text>{address}</Text>
          </StyledView>
        </View>
        {/* Brand image */}
        <StyledView className="w-[120px] h-[50px]">
          <Image
            source={require("../../assets/transparent-logo.png")}
            className="h-[50px] w-[120px]"
            resizeMode="contain"
          />
        </StyledView>
        <StyledView className="items-start">
          <MaterialCommunityIcons name="bell" size={24} />
        </StyledView>
      </StyledView>
      <StyledView className="bg-white rounded-md mt-[4px] px-2 flex flex-row ">
        <StyledInput placeholder="Search" />
        <Ionicons name="ios-search" size={24} />
      </StyledView>
    </StyledView>
  );
}
