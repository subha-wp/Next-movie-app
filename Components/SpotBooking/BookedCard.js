import { View, Text, Pressable } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StyledText = styled(Text, "");
const StyledView = styled(View, "");
const StyledButton = styled(Pressable, "px-[2px] py-1 rounded-lg");

export default function BookedCard() {
  return (
    <StyledView className="mx-2 border border-slate-400 p-1 flex flex-row justify-between">
        <StyledView className=" max-w-[240px]">
      <StyledView className="flex flex-row space-x-1 ">
        {/* name and Id part */}
        <StyledView className="space-y-1">
          <StyledView className="flex flex-row space-x-1">
            <StyledText className="font-semibold text-indigo-700">Rangila Bibi</StyledText>
            <StyledText className="font-semibold text-indigo-700">F/28</StyledText>
            <StyledText className="font-semibold text-indigo-700">SL-3</StyledText>
          </StyledView>
          <StyledText className="font-semibold text-sky-400">ID : PRV6899KJSN</StyledText>
        </StyledView>
        {/* Button And Speciality Part */}
        <StyledView className="">
          <StyledButton className="flex flex-row space-x-1 justify-center bg-sky-500 rounded-lg">
            <StyledText className="text-white">
              <MaterialCommunityIcons name="phone-settings" size={15} />
            </StyledText>
            <StyledText className="text-white font-semibold">call</StyledText>
          </StyledButton>
          <StyledText className="uppercase font-semibold text-[12px] text-green-600">
            Cardiology
          </StyledText>
        </StyledView>
        {/* Dr Info */}
      </StyledView>
      <StyledView className="flex max-w-[230px]">
        <StyledText className="font-semibold text-indigo-700 text-[16px] ">
            Under Dr {""}
        </StyledText>
        <StyledText className="font-semibold text-indigo-700 text-[16px] ">
            Himansu Kumar Bhattacharya
        </StyledText>
      </StyledView>

        </StyledView>
      <StyledView className="flex w-[140px]  items-end">
        <StyledView className="flex flex-row">
        <StyledText className="font-semibold text-blue-800">Fees 500 , </StyledText>
        <StyledText className="font-semibold text-blue-800">Pay 100</StyledText>
        </StyledView>
        <StyledText className="font-semibold text-red-600 text-[14px]">Booked for 28/05/22</StyledText>
        <StyledText className="font-semibold text-red-600 text-[17px]">Appo.time 10:45</StyledText>
        <StyledText className="font-semibold text-red-500 uppercase text-[18px]">Saturday </StyledText>
      </StyledView>
    </StyledView>
  );
}
