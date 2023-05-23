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
//custom tab bar oluştur
//search alanı ekle home screene
//profile screen oluştur
//setting modal koy
//login register screen 
//redux kur
//homedan detal screene giderken shared elements kullanarak animasyon yaparak git
//Game screen kur
//firebase auth kur
//admob
//push notification
//firebase cloud storage ile kullanıcı verileri depola skor favori gibi
//homescreene gelene verileri düzenle pagination gerekli olabilir

//shared elements kuruldu ama geçişlerde sıkıntı var 