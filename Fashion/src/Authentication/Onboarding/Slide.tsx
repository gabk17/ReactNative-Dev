import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface SlideProps {
  title: string;
  right?: boolean;
}

const { width, height } = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

const styles = StyleSheet.create({
  container: {
    width,
  },

  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },

  title: {
    fontSize: 80,
    lineHeight: 80,
    fontFamily: 'SFProText-Bold',
    color: 'white',
    textAlign: 'center',
  },
});

const Slide = ({ title, right }: SlideProps) => {
  let [fontsLoaded] = useFonts({
    'SFProText-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProText-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProText-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
  });

  const transform = [
    {
      translateY: (SLIDE_HEIGHT - 100) / 2,
    },
    {
      translateX: right ? width / 2 - 50 : -width / 2 + 50,
    },
    {
      rotate: right ? "-90deg" : "90deg"
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;
