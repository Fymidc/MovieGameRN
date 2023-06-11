import { View, Text, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetData } from '../../Api';
import { HomeStackParamList, Result } from "../../types"
import BackDrop from '../../components/BackDrop';
import Animated, {  useAnimatedScrollHandler,  useSharedValue } from 'react-native-reanimated';
import ListView from '../../components/ListView';
import { TextInput } from 'react-native';
import type {  NativeStackScreenProps } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'


const { width, height } = Dimensions.get("window")

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACER_ItEM_SIZE = (width - ITEM_SIZE) / 2;





interface Props {
  navigation: NativeStackScreenProps<HomeStackParamList, "HomeS">;
}

const HomeScreen = ({navigation}:Props) => {
  const [movie, setmovies] = useState<Result[]>([])

  const [loading, setloading] = useState(false)


 // const navigation = useNavigation<HomeScreenNavigationProp>()

  useEffect(() => {
    const fetchMovies = async () => {

      const movies = await GetData()
      const data = movies
      //console.log(movies.results)

      //setmovies([{ key: 'left-spacer' }, ...data, { key: 'right-spacer' }])
      setmovies(data)
    }

   
      fetchMovies()
    

  }, [])

 
console.log("home screeen movie",movie)

  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });


  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }} >
      <View style={{zIndex:22, 
        backgroundColor:"rgba(255,255,255, 0.7)",
        position:"absolute",
        width:width*0.8,
        left:"50%",
        marginLeft:-width*0.8/2,
        top:25,
        flexDirection:"row",
        alignItems:"center",
        borderRadius:15,
      
        }} >
          <AntDesign style={{paddingHorizontal:10}} name='search1' color={"grey"} size={20} />
        <TextInput 
        placeholderTextColor={"grey"}
        style={{flex:1,
        justifyContent:"center",
        paddingLeft:5,
        color:"black"
      }} 
        placeholder='Search a Movie...' />
      </View>

    <BackDrop movie={movie} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movie}
        keyExtractor={(item: Result, index: number) => item.id ? item.id.toString() : ""}
        horizontal
        contentContainerStyle={{
          alignItems: "center"
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={10}
        bounces={false}
        onScroll={scrollHandler}

        scrollEventThrottle={16}
        renderItem={({ item, index }) => {

          if (!index) {
            return (<View style={{ width: SPACER_ItEM_SIZE }} />)
          }
          return (

            <ListView navigation={navigation} scrollX={scrollX} item={item} index={index} />
          )
        }}
      />

    </View>
  )
}

export default HomeScreen