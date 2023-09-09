import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import MovieCard from "../Components/Cards/MovieCard";
import { FlashList } from "@shopify/flash-list";

const StyledText = styled(Text, "");
const StyledView = styled(View, "bg-white");
const StyledInput = styled(
  TextInput,
  " px-2 py-2 font-semibold tracking-wider text-[17px]"
);
const StyledButton = styled(Pressable, "  ");

const Home = () => {
  const movies = [1, 2, 3, 4, 4];

  return (
    <View className="h-full p-2 bg-white mt-8">
      <View className="space-y-2">
        <Text className="font-semibold pl-1">Hello,</Text>
        <Text className="text-3xl font-semibold tracking-wider">Guest</Text>
      </View>
      {/* Search bar */}
      <View className="flex flex-row w-full justify-between my-2">
        <StyledInput
          type="text"
          placeholder="Search"
          //   value={identifier}
          className="w-[85%] bg-slate-50 focus:border rounded-lg "
          keyboardType="number-pad"
          //   onChangeText={(Text) => setIdentifier(Text)}
        />
        <StyledButton className="flex justify-center items-center w-[14%] bg-[#0BFA15] rounded-lg">
          <FontAwesome5 name="search" size={24} color="white" />
        </StyledButton>
        {/* Search bar */}
      </View>
      <FlashList
        data={movies}
        numColumns={2}
        estimatedItemSize={30}
        layout="masonry"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 2, paddingBottom: 24 }}
        renderItem={({ item }) => <MovieCard />}
      />
      {/* Movies List */}
    </View>
  );
};

export default Home;
