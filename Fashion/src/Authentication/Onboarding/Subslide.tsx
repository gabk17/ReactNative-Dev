import React from 'react';
import { View, Text, Dimensions, StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';
import { Button } from '../components'

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
    flex: 1,
  },

  subtitle: {
    fontFamily: 'SFProText-Semibold',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 12,
    color: '#0cd0d34',
    textAlign: 'center'
  },

  description: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#0cd0d34',
    textAlign: 'center',
    marginBottom: 40,
  },
});

const Subslide = ({ subtitle, description, last, onPress }: SubslideProps) => {
  let [fontsLoaded] = useFonts({
    'SFProText-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProText-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProText-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button label={last? "Let's get started" : "Next"}  variant={last? "primary" : "default"} {...{onPress}}/>
    </View>
  );
};

export default Subslide;
