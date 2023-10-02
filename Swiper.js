import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { profiles } from './data'; // Assuming data.js is in the same directory
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// Import wer logo image
import logoImage from './assets/logo.webp'; // Replace with the actual path to wer logo image

const SCREEN_WIDTH = Dimensions.get('window').width;

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();
  const swipeText = useRef(new Animated.Value(0));
  const [swipeAction, setSwipeAction] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('white');

  const onSwipeLeft = () => {
    if (currentIndex > 0) {
      scrollViewRef.current.scrollTo({ x: (currentIndex - 1) * SCREEN_WIDTH });
      setCurrentIndex(currentIndex - 1);
      setSwipeAction('Dislike');
      setBackgroundColor('red'); // Change background color to red for a dislike
      animateSwipeText();
    }
  };

  const onSwipeRight = () => {
    if (currentIndex < profiles.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentIndex + 1) * SCREEN_WIDTH });
      setCurrentIndex(currentIndex + 1);
      setSwipeAction('Like');
      setBackgroundColor('green'); // Change background color to green for a like
      animateSwipeText();
    }
  };

  const animateSwipeText = () => {
    swipeText.current.setValue(0);
    Animated.timing(swipeText.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setSwipeAction(null);
    });
  };

  const handleSignIn = () => {
    // Implement wer sign-in logic here
    // This is where we can add code to authenticate the user
    // For example, we can make an API request to wer authentication server
    // Once the user is successfully authenticated, we can navigate to the main app screen
    // For now, let's just display a message:
    alert('Sign In button pressed');
  };

  const handleSignUp = () => {
    // Implement wer sign-up logic here
    // This is where we can add code to register a new user
    // For example, we can make an API request to wer registration server
    // Once the user is successfully registered, we can navigate to the main app screen
    // For now, let's just display a message:
    alert('Sign Up button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.authButtons}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        contentContainerStyle={[styles.scrollViewContent, { backgroundColor }]}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          // Calculate the current index based on the scroll position
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(newIndex);
        }}
      >
        {profiles.map((profile, index) => (
          <View key={profile.id} style={styles.cardContainer}>
            <PanGestureHandler
              onGestureEvent={(e) => {
                if (e.nativeEvent.translationX > 50) {
                  onSwipeRight();
                } else if (e.nativeEvent.translationX < -50) {
                  onSwipeLeft();
                }
              }}
              onHandlerStateChange={(e) => {
                if (e.nativeEvent.state === State.END) {
                  scrollViewRef.current.scrollTo({ x: currentIndex * SCREEN_WIDTH });
                }
              }}
            >
              <View style={styles.card}>
                <Image source={logoImage} style={styles.logo} />
                <Image source={profile.image} style={styles.image} />
                <Text style={styles.name}>{profile.name}</Text>
                {swipeAction && (
                  <Animated.Text
                    style={[
                      styles.swipeText,
                      {
                        opacity: swipeText.current,
                        color: swipeAction === 'Like' ? 'green' : swipeAction === 'Dislike' ? 'red' : 'transparent',
                      },
                    ]}
                  >
                    {swipeAction}
                  </Animated.Text>
                )}
                <Text style={styles.description}>{profile.description}</Text>
              </View>
            </PanGestureHandler>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.currentIndex}>{currentIndex + 1}/{profiles.length}</Text>
      <View style={styles.profileButtons}>
        <TouchableOpacity style={styles.button} onPress={onSwipeLeft}>
          <Text>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSwipeRight}>
          <Text>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  cardContainer: {
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  image: {
    width: 350,
    height: 400,
    borderRadius: 11,
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  currentIndex: {
    marginTop: 16,
    fontSize: 18,
  },
  profileButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Move buttons to the top right
    marginTop: 50, // Add some margin to separate buttons from the top
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  swipeText: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
  },
});

export default Swiper;
