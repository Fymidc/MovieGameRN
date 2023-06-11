import { View, Dimensions, Text, Image, ScrollView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Detail, StackParamList } from '../../types';
import LinearGradient from 'react-native-linear-gradient'
import { SharedElement } from 'react-navigation-shared-element';
import { GetDetail } from '../../Api';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import Octicons from "react-native-vector-icons/Octicons"
import YoutubePlayer from "react-native-youtube-iframe";


type Props = NativeStackScreenProps<StackParamList, 'Detail'>;


const { width, height } = Dimensions.get("window")
const BACKDROP_HIGHT = height * 0.2
const DetailScreen = ({ route }: Props) => {
  const [detailData, setdetailData] = useState<Detail>()

  const [loading, setloading] = useState(false)

  const { id } = route.params.item

  console.log("movie id", id)

  useEffect(() => {
    setloading(true)
    const fetchDetail = async () => {
      const detail = await GetDetail(id)

      setloading(false)
      setdetailData(detail)
    }
    fetchDetail()

  }, [])



  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }} >
      <View style={{ flex: 2}} >
        <SharedElement id={route.params.item.poster_path} >
          <Image
            resizeMode={"cover"}
            source={{ uri: `https://image.tmdb.org/t/p/w500${route.params.item.poster_path}` }}

            style={{ width: "100%", height: 360}}


          />
        </SharedElement>
          <Octicons name='feed-heart' size={28} color={"grey"} style={{position:"absolute",top:10,right:10}} />

        <LinearGradient colors={['transparent', '#121212']}
          style={{ width, height: BACKDROP_HIGHT, position: "absolute", bottom: 0 }}
        />
      </View>

      <View style={{  flex: 2 }} >
        {loading ? <Text>Loading...</Text> :

          <ScrollView  >
            <View style={{flex:1}} >

              <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 24, marginVertical: 10 }} >{detailData?.original_title}</Text>
            </View>

            <View style={{flex:1, flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }} >
              {detailData?.genres.map((val, index) => (

                <Text key={index} style={{ paddingHorizontal: 10,color:"#ffffff" }} >{val.name}</Text>

              ))}

            </View>

            <View style={{flex:1, flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }} >
              <Text style={{color: detailData?.vote_average < 5 ? "red":  detailData?.vote_average > 7 ? "#16FF00" : detailData?.vote_average > 5 ? " #F29727" : "white"}} >{detailData?.vote_average}</Text>

              <MaterialCommunityIcons onPress={() => Linking.openURL(`${detailData?.homepage}`)} style={{ paddingHorizontal: 10 }} color={"#ffffff"} name='web' size={18} />

              <Text style={{color:"#ffffff"}} >{detailData?.release_date.split("-").reverse().join("-")}</Text>
              <Ionicons style={{ paddingHorizontal: 10 }} color={"#ffffff"} name='language' size={18} />

              <Text style={{color:"#ffffff"}} >{detailData?.original_language.toUpperCase()}</Text>
            </View>

            {/* tasarımı düzenle videoları scrolvieve koy ve düzenle*/}

          
            <View style={{flex:3, marginVertical: 10 }}  >

              <Text style={{paddingHorizontal:10,fontSize:15,color:"#ffffff"}} >{detailData?.overview}</Text>
            </View>


            <View style={{ flex: 1, paddingHorizontal: 30, marginVertical: 20 }} >

              <YoutubePlayer
                height={300}

                // play={playing}
                videoId={detailData?.videos.results[0].key}
              //onChangeState={onStateChange}
              />

            </View>





          </ScrollView>


        }

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