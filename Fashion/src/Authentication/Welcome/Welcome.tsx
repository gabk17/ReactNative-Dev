import React from 'react';
import { Image, Dimensions, View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Button } from '../components';
import { AuthNavigationProps } from '../components/Navigation';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');
const picture = {
  src: require('../../../assets/5.png'),
  width: 408,
  height: 612,
};

export const assets = [picture.src];

const Welcome = ({ navigation }: AuthNavigationProps<'Welcome'>) => {
  let [fontsLoaded] = useFonts({
    'SFProText-Bold': require('../../../assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProText-Semibold': require('../../../assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProText-Regular': require('../../../assets/fonts/SF-Pro-Display-Regular.otf'),
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View
        style={{
          flex: 1,
          borderBottomRightRadius: 75,
          backgroundColor: '#F4F0EF',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={picture.src}
          style={{
            width: width - 75,
            height: ((width - 75) * picture.height) / picture.width,
          }}
        />
      </View>
      <View style={{ flex: 1, borderTopLeftRadius: 75 }}>
        <View
          style={{
            backgroundColor: '#F4F0EF',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 75,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 30,
          }}>
          <Text
            style={{
              fontFamily: 'SFProText-Semibold',
              fontSize: 24,
              lineHeight: 30,
              color: '#0C0D34',
              margin: 40,
            }}>
            Let's get started
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontFamily: 'SFProText-Regular',
              fontSize: 16,
              lineHeight: 24,
              color: 'body',
              textAlign: 'center',
            }}>
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            label="Join us, it's Free"
            onPress={() => navigation.navigate('SignUp')}
          />
          <BorderlessButton
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                fontFamily: 'SFProText-Medium',
                fontSize: 15,
                color: '#0C0D34',
              }}>
              Forgot password?
            </Text>
          </BorderlessButton>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
