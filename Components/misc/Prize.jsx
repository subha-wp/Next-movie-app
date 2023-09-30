import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

const Prize = ({ setShowPrize }) => {
  const [showPrizeWaiting, setShowPrizeWaiting] = useState(true);
  const [showBetterLuck, setShowBetterLuck] = useState(false);

  setTimeout(() => {
    setShowPrizeWaiting(false);
    setShowBetterLuck(true);
  }, 15000);

  const hadleResetDownloads = async () => {
    await AsyncStorage.setItem("downloads", `0`);
    setShowPrize(false);
  };

  return (
    <Modal>
      <View className="justify-center items-center h-full w-full">
        {showPrizeWaiting && (
          <View className="items-center">
            <Text className="text-[#0BFA15] text-[29px]">It's Reward Time</Text>
            <Image
              source={require("../../assets/reward.gif")}
              className="w-[450px] "
              resizeMode="contain"
            />
          </View>
        )}
        {showBetterLuck && (
          <View className="items-center space-y-4">
            <View className=" items-center justify-center  border-2 rounded-md w-[200px] h-[250px] p-2">
              <Image
                source={require("../../assets/award.gif")}
                className="w-[80px] h-[80px]"
                resizeMode="contain"
              />
              <Text className="text-[27px] font-semibold text-center text-[#0BFA15]">
                Better luck Next Time
              </Text>
            </View>
            <Pressable
              className="py-2 px-6 rounded-md w-full bg-[#0BFA15]"
              onPress={hadleResetDownloads}
            >
              <Text className="text-[19px] text-white">Got it</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default Prize;
