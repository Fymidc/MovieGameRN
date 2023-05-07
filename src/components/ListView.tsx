import { View, Text, Platform, Dimensions, Image } from 'react-native'
import React, { useMemo } from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Result } from '../types';

const { width, height } = Dimensions.get("window")

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACING = 10

type ListItemProps={
    scrollX: Animated.SharedValue<number>
    item:Result
    index:number
}


const ListView: React.FC<ListItemProps> = React.memo(({item,index,scrollX})=>{

  const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        
  ]

  const rStyle = useAnimatedStyle(()=>{
    const scale = interpolate(scrollX.value, inputRange, [50, -30, 50], { extrapolateRight: Extrapolation.CLAMP });

        return {
          transform: [{ translateY: scale }],
        };
    })

  return (
    <View style={{ width: ITEM_SIZE }} >

    <Animated.View style={[{
      marginHorizontal: SPACING,
      padding: SPACING * 2,
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 34,

    },rStyle]} >

      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={{ width: 250, height: 350, borderRadius: 35 }}
      />
      {/* <Text style={{ fontSize: 24 }} numberOfLines={1} >{item.title}</Text> */}
      <Text  style={{position:"absolute", fontSize: 20,right:15,top:15,color:"yellow" }}  >ratings : ***</Text>
      {/* <Text style={{ fontSize: 10 }}  >Genres: adventure</Text>
      <Text style={{ fontSize: 12 }} numberOfLines={3} >{item.overview}</Text> */}


    </Animated.View>

  </View>
  )


}) 

export default ListView