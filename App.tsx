/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
 
  useColorScheme,
 
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <Second/> */}
      <HomeScreen/>
    </SafeAreaView>
  );
}



export default App;

//homescreen de image ye animation eklemeye çalış cardlar kaydıkça değişsin
//search alanı ekle home screene
//prodile screen oluştur
//navigasyon kur
//stackları kur
//tab nav
//setting modal koy
//login register screen 
//redux kur
//homedan detal screene giderken shared elements kullanarak animasyon yaparak git
//oyun screene gel