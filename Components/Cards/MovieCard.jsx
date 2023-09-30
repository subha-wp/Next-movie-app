import React from "react";

import { Pressable, Image } from "react-native";

const MovieCard = ({ movie, navigation }) => {
  const id = movie.id;

  const { name, image, downloadLink, lang, industry, releasedYear } =
    movie.attributes;
  const movieImage = image.data[0].attributes.url;

  return (
    <Pressable
      className="m-1 w-[175px]  h-[250px] overflow-hidden rounded-lg"
      onPress={() =>
        navigation.navigate("MovieScreen", {
          name,
          image,
          downloadLink,
          lang,
          industry,
          releasedYear,
          id,
        })
      }
    >
      <Image
        source={{ uri: movieImage }}
        className="w-[175px] h-[250px]"
        resizeMode="stretch"
      />
    </Pressable>
  );
};

export default MovieCard;
