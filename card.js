import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ profile, onSwipe }) => {
  const [seriesIndex, setSeriesIndex] = useState(0);
  const series = profile.series;

  const nextSeries = () => {
    if (seriesIndex < series.length - 1) {
      setSeriesIndex(seriesIndex + 1);
    } else {
      onSwipe(profile);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: series[seriesIndex].image }} style={styles.image} />
      <Text>{series[seriesIndex].name}</Text>
      <Text>{series[seriesIndex].platform}</Text>
      <TouchableOpacity onPress={nextSeries}>
        <Text>Next Series</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 600,
    borderRadius: 11,
  },
});

export default Card;
