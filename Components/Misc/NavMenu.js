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
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const StyledText = styled(Text, "text-white");
const StyledView = styled(View, "flex items-center");
const StyledInput = styled(
  TextInput,
  "font-semibold w-[320px] px-2 tracking-wide rounded-md py-1 "
);
const StyledButton = styled(Pressable);

export default function NavMenu() {
  return (
    <StyledView className="bg-teal-300 w-full h-[60px] flex flex-row absolute bottom-0 px-4 justify-between">
      <StyledButton className="items-center">
        <StyledText className="">
          <MaterialCommunityIcons name="home" size={33} />
        </StyledText>
        <StyledView className="items-start">
          <StyledText className="font-semibold  tracking-wide text-[16px]">
            Home
          </StyledText>
        </StyledView>
      </StyledButton>
      <StyledButton className="items-center">
        <StyledText className="">
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={33}
          />
        </StyledText>
        <StyledView className="items-start">
          <StyledText className="font-semibold  tracking-wide text-[16px]">
            Booking
          </StyledText>
        </StyledView>
      </StyledButton>
      <StyledButton className="items-center">
        <StyledText className="">
          <MaterialCommunityIcons name="medical-bag" size={33} />
        </StyledText>
        <StyledView className="items-start">
          <StyledText className="font-semibold  tracking-wide text-[16px]">
            Orders
          </StyledText>
        </StyledView>
      </StyledButton>
      <StyledButton className="items-center">
        <StyledText className="">
          <MaterialCommunityIcons name="swap-horizontal" size={33} />
        </StyledText>
        <StyledView className="items-start">
          <StyledText className="font-semibold  tracking-wide text-[16px]">
            History
          </StyledText>
        </StyledView>
      </StyledButton>
      <StyledButton className="items-center">
        <StyledText className="">
          <MaterialCommunityIcons name="view-dashboard" size={33} />
        </StyledText>
        <StyledView className="items-start">
          <StyledText className="font-semibold  tracking-wide text-[16px]">
            Menu
          </StyledText>
        </StyledView>
      </StyledButton>
    </StyledView>
  );
}
