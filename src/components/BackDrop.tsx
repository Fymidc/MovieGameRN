import { View, Text, Dimensions, FlatList, Image, Platform } from 'react-native'
import React from 'react'
import { Result } from '../types'
import LinearGradient from 'react-native-linear-gradient'
import Svg, { Rect } from "react-native-svg"
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    movie: Result[]
    scrollX: Animated.SharedValue<number>
}

const { width, height } = Dimensions.get("window")

const BACKDROP_HIGHT = height * 0.6
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;

const BackDrop = ({ movie, scrollX }: Props) => {
  

    return (
        <View style={{ position: "absolute", width, height: BACKDROP_HIGHT }} >
            <FlatList
                data={movie}
                keyExtractor={item => item.id ? item.id.toString() : ""}
                contentContainerStyle={{ width, height: BACKDROP_HIGHT }}
                renderItem={({ item, index }) => {
                  
                    
            
                    return (
                        
                       
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
                                style={{ width, height: BACKDROP_HIGHT,resizeMode:"cover" }}

                            />

                

                    )
                }}
            />
            <LinearGradient colors={['transparent', 'white']}
                style={{ width, height: BACKDROP_HIGHT, position: "absolute", bottom: 0 }}
            />
        </View>
    )
}

export default BackDrop