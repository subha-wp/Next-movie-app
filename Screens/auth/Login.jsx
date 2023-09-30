import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import Toast from "react-native-toast-message";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

const StyledText = styled(Text, "");
const StyledView = styled(View, "");
const StyledInput = styled(
  TextInput,
  " px-2 py-2 font-semibold tracking-wider text-[17px]"
);
const StyledButton = styled(Pressable, " p-4   rounded-2xl w-full ");

const Login = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const apiUrl = Constants.expoConfig.extra.apiUrl;
  const token = Constants.expoConfig.extra.token;

  const handleLogin = async () => {
    setLoading(true);
    await axios
      .post(`${apiUrl}/auth/local?populate=*`, {
        identifier,
        password,
      })
      .then(async (res) => {
        const userId = res.data.user.id;
        await AsyncStorage.setItem("_userId", `${userId}`);
      })
      .catch((err) => {
        alert("User And Password Not Match");
      });
  };

  const handleGuest = () => {
    navigation.navigate("Home", {});
  };

  useEffect(() => {}, []);

  return (
    <>
      <StyledView className="h-full flex flex-col items-center bg-white ">
        {/* {loading === true && <Loading />} */}
        <StyledView className="flex items-center mt-10 ">
          <Image
            source={require("../../assets/black-logo.png")}
            className="w-[220px] "
            resizeMode="contain"
          />
        </StyledView>
        <StyledView className="w-[90%] space-y-4 my-8">
          <StyledText className=" font-semibold text-[25px] text-center">
            Login to Your Account
          </StyledText>
          <StyledView className="flex flex-row items-center  rounded-md p-2 bg-slate-50 focus:border ">
            <FontAwesome5 name="phone-alt" size={24} color="gray" />
            <StyledInput
              type="text"
              placeholder="Mobile No"
              value={identifier}
              className="w-full"
              keyboardType="number-pad"
              onChangeText={(Text) => setIdentifier(Text)}
            />
          </StyledView>
          <StyledView className="flex flex-row items-center  rounded-md p-2 bg-slate-50 focus:border">
            <FontAwesome5 name="lock" size={24} color="gray" />
            <StyledInput
              type="text"
              className="w-full"
              placeholder="Password"
              secureTextEntry={secureText}
              value={password}
              onChangeText={(newText) => setPassword(newText)}
            />
            <StyledText className="absolute right-1">
              <FontAwesome5
                name="eye-slash"
                size={20}
                color="gray"
                onPress={() => setSecureText(!secureText)}
              />
            </StyledText>
          </StyledView>

          <View className="pt-10 space-y-3">
            {/* Button Part */}
            <StyledButton className="bg-[#0BFA15] ">
              <StyledText className="text-center font-semibold text-xl text-white tracking-wider">
                Sign In
              </StyledText>
            </StyledButton>

            <StyledButton onPress={handleGuest}>
              <StyledText className="text-center">
                <Text className="text-gray-300">----</Text> or Continue as Guest{" "}
                <Text className="text-gray-300">----</Text>
              </StyledText>
            </StyledButton>
            {/* Sign up */}
            <StyledButton onPress={() => navigation.navigate("Register", {})}>
              <StyledText className="text-center">
                Don't have an account?{" "}
                <Text className="text-[#0BFA15] text-[19px]">sign up</Text>
              </StyledText>
            </StyledButton>
          </View>
        </StyledView>
      </StyledView>
      <Toast position="top" topOffset={40} />
    </>
  );
};

export default Login;
