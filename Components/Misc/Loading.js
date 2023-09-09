import React from "react";
import { Image, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View, "");

export default function Loading() {
  return (
    <>
      <StyledView className="bg-black  absolute top-[4%] h-full  w-full z-50 opacity-70 flex items-center justify-center">
        <StyledView className="items-center justify-center ">
          <Image
            source={require("../../assets/loading.gif")}
            style={{ width: 50, height: 50 }}
          />
        </StyledView>
      </StyledView>
    </>
  );
}
