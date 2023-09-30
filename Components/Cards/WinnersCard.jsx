import React from "react";
import { Image, Text, View } from "react-native";

const WinnersCard = ({ winner }) => {
  const { name, prize, img } = winner;
  const winnerImg = img.data.attributes.url
  return (
    <View className=" space-x-3 flex-row items-center w-[270px]  p-1 rounded-xl bg-[#d8ebd9] m-1">
      <Image
        source={{uri:winnerImg}}
        className="w-12 h-12 rounded-full "
        resizeMode="contain"
      />
      <View>
        <Text className="font-semibold text-[17px] tracking-wider ">
          {name}
        </Text>
        <Text>
          Won{" "}
          <Text className="font-bold tracking-wider ">
            {prize}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default WinnersCard;
