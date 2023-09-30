import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Modal,
  RefreshControl,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";



import WinnersCard from "../Components/Cards/WinnersCard";
import ModalComp from "../Components/misc/ModalComp";
import { Loading } from "../Components/misc/Loading";
import Prize from "../Components/misc/Prize";
import MovieCard from "../Components/Cards/MovieCard";

const StyledInput = styled(
  TextInput,
  " px-2 py-2 font-semibold tracking-wider text-[17px]"
);
const StyledButton = styled(Pressable, "  ");

const Home = ({ navigation }) => {
  // const BANNER_AD_UNIT_ID = Platform.select({
  //   android: "8fa2f601dd69be3b",
  //   ios: "YOUR_IOS_BANNER_AD_UNIT_ID",
  // });

  const apiUrl = Constants.expoConfig.extra.apiUrl;
  const token = Constants.expoConfig.extra.token;

  const [movies, setMovies] = useState([]);
  const [winners, setWinners] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [downloads, setDownloads] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrize, setShowPrize] = useState(false);

  const fetchMovies = async () => {
    await axios
      .get(
        `${apiUrl}/movies?sort[0]=createdAt:desc&pagination[pageSize]=20&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const movies = res.data.data;
        // console.log(movies);
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Alert("Network Error 500");
      });
  };

  const fetchWinners = async () => {
    await axios
      .get(`${apiUrl}/winners?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const winners = res.data.data;
        setWinners(winners);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterSearch = async () => {
    // setShowAdModal(true);
    const text = searchText;
    if (searchText.length >= 4) {
      await axios
        .get(`${apiUrl}/movies?filters[name][$containsi]=${text}&populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const filterData = res.data.data;
          setFilteredMovies(filterData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFilteredMovies([]);
    }
  };

  const fetchTodayDownloads = async () => {
    const tempDownloads = await AsyncStorage.getItem("downloads");
    setDownloads(tempDownloads);
    if (tempDownloads >= 10) {
      setShowPrize(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTodayDownloads();
    fetchWinners();
    fetchMovies();
  }, []);

  // console.log(movies.id);

  const handleRefresh = async () => {
    setRefreshing(true);

    setLoading(true);
    fetchTodayDownloads();
    fetchWinners();
    fetchMovies();
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        className="h-full p-2 bg-white mt-8"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading && <Loading />}
        {/* Header */}
        {showPrize && (
          <Prize setShowPrize={setShowPrize} navigation={navigation} />
        )}

        <View className="flex-row justify-between items-center">
          <View className="space-y-2">
            <Text className="font-semibold pl-1">Hello,</Text>
            <Text className="text-3xl font-semibold tracking-wider">Guest</Text>
          </View>

          <View className="flex-row space-x-1 ">
            <Text className="text-[23px] text-[#0BFA15]">{downloads}</Text>
            <FontAwesome5 name="cloud-download-alt" size={16} color="black" />
          </View>
        </View>

        {/* Header */}

        {/* Search bar */}
        <View className="flex flex-row w-full justify-between my-2">
          <StyledInput
            type="text"
            placeholder="Search"
            value={searchText}
            className="w-[85%] bg-slate-50 focus:border rounded-lg "
            onChangeText={(Text) => setSearchText(Text)}
          />
          <StyledButton
            className="flex justify-center items-center w-[14%] bg-[#0BFA15] rounded-lg"
            onPress={filterSearch}
          >
            <FontAwesome5 name="search" size={24} color="white" />
          </StyledButton>
          {/* Search bar */}
        </View>

        {/* Winners List */}
        <View className="px-2 min-h-[100px] ">
          <Text className="font-semibold text-[17px]">Today Winners List</Text>
          <FlashList
            data={winners}
            estimatedItemSize={10}
            layout="masonry"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 2, paddingBottom: 30 }}
            renderItem={({ item }) => <WinnersCard winner={item.attributes} />}
          />
        </View>
        {/* Winners List */}
        {/* Pay */}

        {/* Filtered Movies */}
        {filteredMovies.length >= 1 && (
          <View className=" w-full">
            <Text className="font-semibold text-[17px]">Search Results</Text>
            <FlashList
              data={filteredMovies}
              estimatedItemSize={30}
              layout="masonry"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 2, paddingBottom: 24 }}
              keyExtractor={(item, idx) => idx}
              renderItem={({ item }) => {
                return <MovieCard movie={item} navigation={navigation} />;
              }}
            />
          </View>
        )}
        {/* Filtered Movies */}

        {/* Movies List */}
        <View className="px-2">
          <Text className="font-semibold text-[17px]">
            Recently Added Movies
          </Text>
        </View>
        <FlashList
          data={movies}
          numColumns={2}
          estimatedItemSize={30}
          layout="masonry"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 8, paddingBottom: 24 }}
          keyExtractor={(item, idx) => idx}
          renderItem={({ item }) => (
            <MovieCard movie={item} navigation={navigation} />
          )}
        />
        {/* Movies List */}

        {/* Ad Modal  */}
        {showAdModal && <ModalComp setShowAdModal={setShowAdModal} />}
        {/* Ad Modal  */}
      </ScrollView>
      {/* <AppLovinMAX.AdView
        adUnitId="8fa2f601dd69be3b"
        adFormat={AppLovinMAX.AdFormat.BANNER}
        autoRefresh={true}
      /> */}
    </>
  );
};

export default Home;
