import { View, Text, Dimensions, FlatList, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetData } from '../Api';
import { Result } from "../types"
import BackDrop from '../components/BackDrop';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ListView from '../components/ListView';


const { width, height } = Dimensions.get("window")

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACER_ItEM_SIZE = (width - ITEM_SIZE) / 2;





const HomeScreen = () => {
  const [movie, setmovies] = useState<Result[]>([])

  const [loading, setloading] = useState(false)




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

 


  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });


  return (
    <View style={{ flex: 1, backgroundColor: "white" }} >
      <Text>Flat list nerede</Text>

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

            <ListView scrollX={scrollX} item={item} index={index} />
          )
        }}


      />


    </View>
  )
}

export default HomeScreen