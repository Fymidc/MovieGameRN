import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import UserScreen from '../screens/UserScreen'
import {  HomeStackParamList, ProfileStackParamList, StackParamList, TabStackParamList } from '../types'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DetailScreen from '../screens/Home/DetailScreen'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import CustomtabBar from './CustomTabBar'

const HomeScreenStack = createNativeStackNavigator<HomeStackParamList>()
const ProfileScreenStack = createNativeStackNavigator<ProfileStackParamList>()
const Tab = createBottomTabNavigator<TabStackParamList>()
const Stack = createSharedElementStackNavigator<StackParamList>()

function HomeStack() {
    return(
        <HomeScreenStack.Navigator screenOptions={{headerShown:false}} >
            <HomeScreenStack.Screen
            name='HomeS'
            component={HomeScreen}
            />
            
        </HomeScreenStack.Navigator>
    )
}

function ProfileStack() {

    return (
      <ProfileScreenStack.Navigator>
        <ProfileScreenStack.Screen
          name="ProfileS"
          component={UserScreen}
          options={() => {
            return {
              animation: "slide_from_right",
              headerShown: false
            }
          }}
        />
      
  
      </ProfileScreenStack.Navigator>
    )
  }

function TabStack() {

    const Placeholder = () => {return(<View/>)}
  
    return (
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeTab"
        tabBar={props => <CustomtabBar {...props} /> }
       
      // tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="ProfileTab" component={ProfileStack} />
  
  
        <Tab.Screen name="Settings" component={Placeholder}
         
        />
  
  
      </Tab.Navigator>
    )
  }

const Navigation = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName='Home'
      >
        <Stack.Screen
        name='Home'
        component={TabStack}
        />
        <Stack.Screen
            name='Detail'
            component={DetailScreen}
            sharedElements={(route:any)=>{
              const {item } = route.params
              return [item.poster_path]
            }}
            />
        <Stack.Screen
        name='Profile'
        component={TabStack}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

