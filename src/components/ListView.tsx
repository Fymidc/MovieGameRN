import { View, Text, Platform, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect} from 'react'
import Animated, { Extrapolation, SharedTransition, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Detail, HomeStackParamList, Result, StackParamList } from '../types';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { SharedElement } from 'react-navigation-shared-element';
import { GetDetail } from '../Api';




const transition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
  };
});
const { width, height } = Dimensions.get("window")

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACING = 10

type ListItemProps = {
  scrollX: Animated.SharedValue<number>
  item: Result
  index: number
  navigation: NativeStackScreenProps<HomeStackParamList, "HomeS">;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>

const ListView: React.FC<ListItemProps> = React.memo(({ item, index, scrollX }) => {

  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,

  ]

  const navigation = useNavigation<HomeScreenNavigationProp>()

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [110, 10, 110], { extrapolateRight: Extrapolation.CLAMP });

    return {
      transform: [{ translateY: scale }],
    };
  })

  

  return (
    <View style={{ width: ITEM_SIZE }} >

      <Animated.View


        style={[{
          marginHorizontal: SPACING * 2,
          padding: SPACING * 2,
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 34,

        }, rStyle]} >

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Detail", { item: item },)}
        >
          <SharedElement  id={item.poster_path}>
            <Image
              resizeMode={"cover"}
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={[{ width: 250, height: 350, borderRadius: 35 }]}
            />
          </SharedElement>

        </TouchableOpacity>
        {/* <Text style={{ fontSize: 24 }} numberOfLines={1} >{item.title}</Text> */}
        <View style={{ position: "absolute", right: 18, top: 0, flexDirection: "row" }}>
          <AntDesign name='star' color={"#FFE234"} size={18} />
          <Text style={{ paddingHorizontal: 5, fontSize: 15, color: "#FFE234", fontWeight: "700" }}   >8/5</Text>
        </View>
        {/* <Text style={{ fontSize: 10 }}  >Genres: adventure</Text>
      <Text style={{ fontSize: 12 }} numberOfLines={3} >{item.overview}</Text> */}


      </Animated.View>

    </View>
  )


})



export default ListView

//rating de puana göre renk değiş
