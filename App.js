import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swiper from './Swiper';
import { profiles } from './data';
import { AppRegistry } from 'react-native'; // Import AppRegistry

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Swiper profiles={profiles} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
});

// Register your main component
AppRegistry.registerComponent('DoneWithIt', () => App); // Replace 'YourAppName' with your app's name


export default App;
