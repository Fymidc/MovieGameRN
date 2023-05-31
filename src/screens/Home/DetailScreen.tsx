import { View, Dimensions, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInDown, withSpring } from 'react-native-reanimated'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Detail, StackParamList } from '../../types';
import LinearGradient from 'react-native-linear-gradient'
import { SharedElement } from 'react-navigation-shared-element';
import { GetDetail } from '../../Api';


type Props = NativeStackScreenProps<StackParamList, 'Detail'>;


const { width, height } = Dimensions.get("window")
const BACKDROP_HIGHT = height * 0.2
const DetailScreen = ({ route }: Props) => {
  const [detailData, setdetailData] = useState<Detail[]>([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    //setloading(true)
    const fetchDetail = async () => {
      const detail = await GetDetail(route.params?.item.id)
      
     // setloading(false)
      setdetailData(detail)
    }
    
    fetchDetail()
  }, [])


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
      
            <View style={{backgroundColor:"red"}} >
            <Text>fatij</Text>              
            {detailData?.map(val => <Text style={{color:"white"}} >{val.belongs_to_collection.name}</Text>)}
            {/* maplayınca veri gelmiyor */}
            </View>
       



    </View>
  )
}

DetailScreen.sharedElements = (route: Props) => {
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