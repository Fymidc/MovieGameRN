import { View, Dimensions, Text,Image } from 'react-native'
import React from 'react'
import Animated, { FadeInDown, withSpring } from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../types';
import LinearGradient from 'react-native-linear-gradient'
import { SharedElement } from 'react-navigation-shared-element';


type Props = NativeStackScreenProps<StackParamList, 'Detail'>;


const { width, height } = Dimensions.get("window")
const BACKDROP_HIGHT = height * 0.2
const DetailScreen = ({ route }: Props) => {
  
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }} >
      <View style={{}} >
        <SharedElement id={route.params.item.poster_path} >
          <Image
            resizeMode={"cover"}
            source={{ uri: `https://image.tmdb.org/t/p/w500${route.params.item.poster_path}` }}

            style={{ width: "100%", height: 360, backgroundColor: 'green' }}
           

          />
        </SharedElement>

        <LinearGradient colors={['transparent', '#121212']}
          style={{ width, height: BACKDROP_HIGHT, position: "absolute", bottom: 0 }}
        />
      </View>
      <Animated.View entering={FadeInDown.duration(500)} >
        <Text style={{ color: "white", fontSize: 24, textAlign: "center" }} >MOVİE NAME</Text>
      </Animated.View>
      <View>
        <Text style={{ color: "white" }} >Types</Text>
      </View>
      <View>
        <Text style={{ color: "white" }} >Star</Text>
      </View>
      <View>
        <Text style={{ color: "white" }} >Release Date</Text>
      </View>
      <View>
        <Text style={{ color: "white" }} >Original language</Text>
      </View>
      <View>
        <Text style={{ color: "white" }} >Overview</Text>
      </View>


    </View>
  )
}

DetailScreen.sharedElements = (route:Props) => {
  const { item } = route.route.params;
  return [
    {
      id: `${item.backdrop_path}`,
      animation: 'move',
      resize: 'clip'
    }
  ];
};


export default DetailScreen

//shared animation uygula