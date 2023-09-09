import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import Toast from "react-native-toast-message";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

const MovieCard = ({ movie }) => {
  return (
    <Pressable className="m-1">
      <Image
        source={require("../../assets/temp-movie-poster/Movie-1.jpg")}
        className="w-[180px] h-[250px] rounded-lg"
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default MovieCard;
