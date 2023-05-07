import { View, Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../types';

type Props = NativeStackScreenProps<StackParamList, 'Detail'>;

const DetailScreen = ({route}:Props) => {
  return (
    <View>
      <View style={{ flex: 1}}>
      <Animated.Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${route.params.item.poster_path}` }}

        style={{ width: 250, height: 300,  backgroundColor: 'green' }}
        sharedTransitionTag="sharedTag"
      />
    </View>
    </View>
  )
}

export default DetailScreen

//shared animation uygula