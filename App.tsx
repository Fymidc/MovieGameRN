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
import Navigation from './src/navigation/Navigation';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <Navigation/>
    </SafeAreaView>
  );
}



export default App;

//homescreen de image ye animation eklemeye çalış cardlar kaydıkça değişsin**
//navigasyon kur**
//stackları kur**
//tab nav**
//homedan detal screene giderken shared elements kullanarak animasyon yaparak git**
//search alanı ekle home screene**
//custom tab bar oluştur**

//search funcionality ekle
//infinity scroll ekle flatliste
//login register screen 
//profile screen oluştur
//setting modal koy
//redux kur
//Game screen kur
//firebase auth kur
//admob
//push notification
//fontları ve renkleri düzenle
//firebase cloud storage ile kullanıcı verileri depola skor favori gibi

 