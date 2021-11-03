import React, { useState, useEffect, useRef } from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { Agenda } from 'react-native-calendars';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Permissions, Constants } from 'expo';
import * as Notifications from 'expo-notifications';
 
const navigationRef = React.createRef();

const COLORS = {
  robinEggBlue: '#26d0ce',
  littleBoyBlue: '#86a8e7',
  cyanProcess: '#13bef2',
  tuftsBlue: '#1398F2',
  // your colors
};

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

function Welcome() {
  React.useEffect(() => {
    lockOrientation();
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const slides = [
    {
      key: '1',
      title: 'Greetings',
      text: 'Fellow Lebanese!',
      icon: '',
      image: require('./MapIntro.jpeg'),
      backgroundColor: COLORS.cyanProcess,
    },
    {
      key: '2',
      title: 'Discover Electricity Outages',
      text: 'All Over The Country',
      icon: 'location-outline',
      image: '',
      backgroundColor: COLORS.littleBoyBlue,
    },
    {
      key: '3',
      title: 'Detailed Timing',
      text: 'In A Calendar Format',
      icon: 'calendar-sharp',
      backgroundColor: COLORS.robinEggBlue,
    },
    {
      key: '4',
      title: 'The App You Need Today',
      text: 'In Your Fingertips!',
      icon: 'flashlight',
      backgroundColor: COLORS.tuftsBlue,
    },
  ];

  const [showRealApp, setShowRealApp] = useState(false);

  const [showSetup, setShowSetup] = useState(true);

  const [city, setCity] = useState('');

  const [outageFirst, setOutageFirst] = useState('');

  const [outageLast, setOutageLast] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  var dictionary = {}; //create new dictionary object
  dictionary['Beirut1.1'] = '6 : 0 0  am'; //set key
  dictionary['Beirut1.2'] = '9 : 0 0  am';
  dictionary['Beirut2.1'] = '9 : 0 0  am';
  dictionary['Beirut2.2'] = '1 2 : 0 0  pm';
  dictionary['Beirut3.1'] = '1 2 : 0 0  pm';
  dictionary['Beirut3.2'] = '3 : 0 0  pm';
  dictionary['Beirut4.1'] = '3 : 0 0  pm';
  dictionary['Beirut4.2'] = '6 : 0 0  pm';

  dictionary['Mount1.1'] = '6 : 0 0  am';
  dictionary['Mount1.2'] = '1 0 : 0 0  am';
  dictionary['Mount2.1'] = '1 0 : 0 0  am';
  dictionary['Mount2.2'] = '2 : 0 0  pm';
  dictionary['Mount3.1'] = '2 : 0 0  pm';
  dictionary['Mount3.2'] = '6 : 0 0  pm';
  dictionary['Mount4.1'] = '6 : 0 0  pm';
  dictionary['Mount4.2'] = '1 2 : 0 0  am';
  dictionary['Mount5.1'] = '1 2 : 0 0  am';
  dictionary['Mount5.2'] = '6 : 0 0  am';

  dictionary['North1.1'] = '6 : 0 0  am';
  dictionary['North1.2'] = '1 0 : 0 0  am';
  dictionary['North2.1'] = '1 0 : 0 0  am';
  dictionary['North2.2'] = '2 : 0 0  pm';
  dictionary['North3.1'] = '2 : 0 0  pm';
  dictionary['North3.2'] = '6 : 0 0  pm';
  dictionary['North4.1'] = '6 : 0 0  pm';
  dictionary['North4.2'] = '1 2 : 0 0  am';
  dictionary['North5.1'] = '1 2 : 0 0  am';
  dictionary['North5.2'] = '6 : 0 0  am';

  const onDone = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      setShowRealApp(true);
      navigate('Welcome');
    });
  };

  const onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      setShowRealApp(true);
      navigate('Welcome');
    });
  };

  const onDoneSetup = () => {
    AsyncStorage.setItem('first_time_setup', 'false').then(() => {
      setShowSetup(false);
      navigate('Welcome');
    });
  };

  const showHome = async () => {
    var data_city = city;
    var _city = JSON.stringify(data_city);
    AsyncStorage.setItem('_city', _city);

    let _city_ = await AsyncStorage.getItem('_city');
    if (_city_ == '""') {
      alert('You must choose a city to continue');
    } else {
      let cityPicked = await AsyncStorage.getItem('_city');
      if (cityPicked == '"Beirut 1"') {
        var first = dictionary['Beirut1.1']; //get key
        var last = dictionary['Beirut1.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Beirut 2"') {
        first = dictionary['Beirut2.1'];
        last = dictionary['Beirut2.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Beirut 3"') {
        first = dictionary['Beirut3.1'];
        last = dictionary['Beirut3.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Beirut 4"') {
        first = dictionary['Beirut4.1'];
        last = dictionary['Beirut4.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Mount 1"') {
        first = dictionary['Mount1.1'];
        last = dictionary['Mount1.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Mount 2"') {
        first = dictionary['Mount2.1'];
        last = dictionary['Mount2.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Mount 3"') {
        first = dictionary['Mount3.1'];
        last = dictionary['Mount3.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Mount 4"') {
        first = dictionary['Mount4.1'];
        last = dictionary['Mount4.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"Mount 5"') {
        first = dictionary['Mount5.1'];
        last = dictionary['Mount5.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"North 1"') {
        first = dictionary['North1.1'];
        last = dictionary['North1.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"North 2"') {
        first = dictionary['North2.1'];
        last = dictionary['North2.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"North 3"') {
        first = dictionary['North3.1'];
        last = dictionary['North3.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"North 4"') {
        first = dictionary['North4.1'];
        last = dictionary['North4.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else if (cityPicked == '"North 5"') {
        first = dictionary['North5.1'];
        last = dictionary['North5.2'];
        setOutageFirst(first);
        setOutageLast(last);
      } else {
        setOutageFirst('Null');
        setOutageLast('Null');
      }
    
      AsyncStorage.setItem('first_time', 'true').then(() => {
        setShowRealApp(false);
      });
    }
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Ionicons name={item.icon} size={200} color="black" />
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp && showSetup ? ( //WELCOME
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            padding: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flex: 0.95,
              backgroundColor: COLORS.robinEggBlue,
              borderRadius: 7,
              overflow: 'hidden',
            }}>
            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
              style={{
                padding: 15,
                alignItems: 'center',
                position: 'absolute', //WELCOME
                width: '100%',
                height: '100%',
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                margin: 5,
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <Text
                style={{ textAlign: 'center', marginTop: 25, fontSize: 40 }}>
                K a h r a b a t i
              </Text>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }} //WELCOME
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 5,
                  alignItems: 'center',
                  position: 'absolute',
                  left: 25,
                  top: 90,
                  width: '85%',
                }}></LinearGradient>

              <Image
                source={require('./logo.png')}
                style={{
                  resizeMode: 'contain',
                  justifyContent: 'center', //WELCOME
                  width: '60%',
                  height: '40%',
                  marginLeft: 80,
                  marginTop: 50,
                  alignItems: 'center',
                }}
              />

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 15,
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 80,
                  width: '100%',
                }}>
                <TouchableOpacity onPress={onDoneSetup}>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    Let's Get Started!{' '}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: 180,
                  width: '100%',
                  fontSize: 16,
                  color: COLORS.robinEggBlue, //WELCOME
                }}>
                The Power In Your Hands!
              </Text>

              <Text
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  bottom: 30,
                  width: '100%',
                  color: 'gray',
                }}>
                Terms of Service
              </Text>
            </View>
          </View>
        </View>
      ) : showRealApp === false && showSetup === true ? ( //INTRO
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          showPrevButton={true}
        />
      ) : showRealApp === true && showSetup === false ? ( //SETUP
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              padding: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 0.95,
                backgroundColor: COLORS.robinEggBlue, //SETUP
                borderRadius: 7,
                overflow: 'hidden',
              }}>
              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 15,
                  alignItems: 'center',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              />
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white', //SETUP
                  margin: 5,
                  borderRadius: 5,
                  overflow: 'hidden',
                }}>
                <Text
                  style={{ textAlign: 'center', marginTop: 20, fontSize: 40 }}>
                  S E T U P
                </Text>

                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                  colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                  style={{
                    padding: 5,
                    marginTop: 2,
                    marginLeft: 50,
                    width: '75%',
                  }}></LinearGradient>

                <Image
                  source={require('./bulb.png')} //SETUP
                  style={{
                    resizeMode: 'contain',
                    justifyContent: 'center',
                    width: '100%',
                    height: '40%',
                    position: 'absolute',
                    top: 90,
                  }}
                />

                <Text style={{ fontSize: 20, marginTop: 340, marginLeft: 20 }}>
                  Select Your Favorite Area
                </Text>

                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }} //SETUP
                  end={{ x: 1.0, y: 0.0 }}
                  colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                  style={{
                    padding: 2,
                    marginTop: 10,
                    marginLeft: 20,
                    width: '40%',
                  }}></LinearGradient>

                <View>
                  <View
                    style={{
                      marginTop: 10,
                      width: '90%',
                      height: 40,
                      marginLeft: 20, //SETUP
                    }}>
                    <RNPickerSelect
                      style={{ inputAndroid: { color: 'black' } }}
                      placeholder={{
                        label: 'Area',
                        value: '',
                      }}
                      placeholderTextColor="gray"
                      onValueChange={(city) => setCity(city)}
                      items={[
                        { label: 'Beirut 1', value: 'Beirut 1' },
                        { label: 'Beirut 2', value: 'Beirut 2' },
                        { label: 'Beirut 3', value: 'Beirut 3' },
                        { label: 'Beirut 4', value: 'Beirut 4' },
                        { label: 'Mount 1', value: 'Mount 1' },
                        { label: 'Mount 2', value: 'Mount 2' },
                        { label: 'Mount 3', value: 'Mount 3' },
                        { label: 'Mount 4', value: 'Mount 4' },
                        { label: 'Mount 5', value: 'Mount 5' },
                        { label: 'North 1', value: 'North 1' },
                        { label: 'North 2', value: 'North 2' },
                        { label: 'North 3', value: 'North 3' },
                        { label: 'North 4', value: 'North 4' },
                        { label: 'North 5', value: 'North 5' }, //SETUP
                      ]}
                    />
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        width: 150,
                        textAlign: 'center',
                        marginTop: 10,
                        marginLeft: 20,
                        fontSize: 18,
                        color: COLORS.robinEggBlue,
                        fontWeight: 'bold',
                        borderBottomColor: COLORS.robinEggBlue, //SETUP
                        borderBottomWidth: 2,
                      }}>
                      {city}
                    </Text>
                    <Text
                      style={{ fontSize: 17, marginTop: 11, marginLeft: 5 }}>
                      Is Selected
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'column', marginBottom: 55 }}>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 0.0 }}
                    colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]} //SETUP
                    style={{
                      padding: 15,
                      alignItems: 'center',
                      marginTop: 25,
                      width: '100%',
                    }}>
                    <TouchableOpacity onPress={showHome}>
                      <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            padding: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flex: 0.95,
              backgroundColor: COLORS.robinEggBlue,
              borderRadius: 7,
              overflow: 'hidden',
            }}>
            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
              style={{
                padding: 15,
                alignItems: 'center',
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                margin: 5,
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <Text
                style={{ textAlign: 'center', marginTop: 25, fontSize: 40 }}>
                H O M E
              </Text>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 5,
                  alignItems: 'center',
                  position: 'absolute',
                  left: 65,
                  top: 90,
                  width: '65%',
                }}></LinearGradient>

              <Text style={{ fontSize: 20, marginTop: 60, marginLeft: 20 }}>
                The Next Outage Is At:
              </Text>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 2,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 30,
                  width: '40%',
                }}></LinearGradient>

              <View styles={{ width: '100%' }}>
                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                  colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                  style={{
                    padding: 5,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 40,
                      width: '100%',
                      color: 'white',
                    }}>
                    {outageFirst}
                  </Text>
                </LinearGradient>
              </View>

              <Text style={{ fontSize: 20, marginTop: 40, marginLeft: 20 }}>
                Until:
              </Text>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 2,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 30,
                  width: '10%',
                }}></LinearGradient>

              <View styles={{ width: '100%',  marginTop: 20, }}>
                <LinearGradient
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                  colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                  style={{
                    padding: 5,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 40,
                      width: '100%',
                      color: 'white',
                    }}>
                    {outageLast}
                  </Text>
                </LinearGradient>
              </View>

              <Text style={{ fontSize: 20, marginTop: 40, marginLeft: 20 }}>
                Do More With Kahrabati
              </Text>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 2,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 30,
                  width: '50%',
                }}></LinearGradient>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 15,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity onPress={() => navigate('Option')}>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    More Options 
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

function Option() {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 0.95,
          backgroundColor: COLORS.robinEggBlue,
          borderRadius: 7,
          overflow: 'hidden',
        }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
          style={{
            padding: 15,
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            margin: 5,
            borderRadius: 5,
            overflow: 'hidden',
          }}>
          <Text style={{ textAlign: 'center', marginTop: 25, fontSize: 40 }}>
            O P T I O N S
          </Text>

          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              padding: 5,
              alignItems: 'center',
              position: 'absolute',
              left: 65,
              top: 90,
              width: '65%',
            }}></LinearGradient>

          <Text style={{ fontSize: 20, marginTop: 60, marginLeft: 20 }}>
            Check Outages In Lebanon
          </Text>

          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              padding: 2,
              marginTop: 10,
              marginLeft: 20,
              width: '40%',
            }}></LinearGradient>

          <View styles={{ width: '100%' }}>
            <Text style={{ fontSize: 17, marginTop: 15, marginLeft: 20 }}>
              Look Up Cities All Over The Country
            </Text>
          </View>

          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              padding: 15,
              alignItems: 'center',
              marginTop: 20,
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => navigate('Provinces')}>
              <Text style={{ color: 'white', fontSize: 20 }}>
                Electricity Outages
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={{ fontSize: 20, marginTop: 60, marginLeft: 20 }}>
            Customize Your Experience
          </Text>

          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              padding: 2,
              marginTop: 10,
              marginLeft: 20,
              width: '40%',
            }}></LinearGradient>

          <View styles={{ width: '100%' }}>
            <Text style={{ fontSize: 17, marginTop: 15, marginLeft: 20 }}>
              Select The City You Belong To:
            </Text>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 17, marginTop: 4, marginLeft: 20 }}>
                Achrafieh, {'            '}
                Ras Beirut, Rmeil and More!
              </Text>
            </View>
          </View>

          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              padding: 15,
              alignItems: 'center',
              marginTop: 20,
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => navigate('Settings')}>
              <Text style={{ color: 'white', fontSize: 20 }}>Customize</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}
function ProvincesMenu({ route }) {
  const Redirect = (item) => {
    if (item.name == 'Beirut' /*'ach'*/) {
      navigate('Beirut');
    } else if (item.name == 'North') {
      navigate('North');
    } else if (item.name == 'Mount') {
      navigate('Mount');
    }
    //else {
    //  Alert.alert(item.name);
    //}
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.name}
        data={[
          {
            title1: 'Swipe Up to Check Provinces',
            name: 'Beirut',
            image: require('./BeirutBackgroundBlue1.jpeg'),
            button: '',
          },
          {
            title1: 'Lebanon',
            name: 'Mount',
            image: require('./MountLebanonBlue1.jpeg'),
          },
          {
            title1: 'Lebanon',
            name: 'North',
            image: require('./NorthLebanonBlue1.jpeg'),
          },
        ]}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <ImageBackground source={item.image} style={styles.image} />

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.title1}</Text>
              <Text style={styles.subTitle}>{item.title2}</Text>
            </View>

            <View
              style={{ width: '100%', backgroundColor: 'white', opacity: 0.9 }}>
              <Button
                title="Pick This Province"
                color={COLORS.tuftsBlue}
                onPress={Redirect.bind(this, item)}
              />
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height}
      />
      <StatusBar style="auto" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Settings() {
  const [city, setCity] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'K a h r a b a t i',
        body: "Don't forget to check outages in your area happening today!",
        data: { data: 'goes here' },
      },
      trigger: { seconds: 10, repeats: true },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const saveUserDetails = async () => {
    var data_city = city;
    var data_notification = isEnabled;
    var _city = JSON.stringify(data_city);
    AsyncStorage.setItem('_notification', data_notification);
    AsyncStorage.setItem('_city', _city);
    
    if (data_notification === true) {
      schedulePushNotification();
      Alert.alert(
        'Disabling Notification',
        'Note that disabling notifications needs to be done manually from your Settings application',
        [
          {
            text: 'Alright',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  const displayuserDetail = async () => {
    let _city = await AsyncStorage.getItem('_city');
    if (_city == '"Beirut 1"') {
      navigate('Schedule', { area: 'b1' });
    } else if (_city == '"Beirut 2"') {
      navigate('Schedule', { area: 'b2' });
    } else if (_city == '"Beirut 3"') {
      navigate('Schedule', { area: 'b3' });
    } else if (_city == '"Beirut 4"') {
      navigate('Schedule', { area: 'b4' });
    } else if (_city == '"Mount 1"') {
      navigate('Schedule', { area: 'm1' });
    } else if (_city == '"Mount 2"') {
      navigate('Schedule', { area: 'm2' });
    } else if (_city == '"Mount 3"') {
      navigate('Schedule', { area: 'm3' });
    } else if (_city == '"Mount 4"') {
      navigate('Schedule', { area: 'm4' });
    } else if (_city == '"Mount 5"') {
      navigate('Schedule', { area: 'm5' });
    } else if (_city == '"North 1"') {
      navigate('Schedule', { area: 'n1' });
    } else if (_city == '"North 2"') {
      navigate('Schedule', { area: 'n2' });
    } else if (_city == '"North 3"') {
      navigate('Schedule', { area: 'n3' });
    } else if (_city == '"North 4"') {
      navigate('Schedule', { area: 'n4' });
    } else if (_city == '"North 5"') {
      navigate('Schedule', { area: 'n5' });
    } else if (_city == '""') {
      alert('You Must Choose A City And Save');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 0.95,
            backgroundColor: COLORS.robinEggBlue,
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              padding: 15,
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              margin: 5,
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 40 }}>
              Personalize Your Experience
            </Text>

            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
              style={{
                padding: 5,
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 20,
                width: '85%',
              }}></LinearGradient>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 20 }}>
                Toggle Notifications
              </Text>

              <Switch
                style={{
                  marginLeft: 75,
                  marginTop: 40,
                  transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                }}
                trackColor={{ false: '#767577', true: '#26d0ce' }}
                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
              style={{
                padding: 2,
                marginTop: 2,
                marginLeft: 20,
                width: '40%',
              }}></LinearGradient>
            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 20 }}>
              Select Your Favorite Area
            </Text>

            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
              style={{
                padding: 2,
                marginTop: 10,
                marginLeft: 20,
                width: '40%',
              }}></LinearGradient>

            <View>
              <View
                style={{
                  marginTop: 10,
                  width: '90%',
                  height: 40,
                  marginLeft: 20,
                }}>
                <RNPickerSelect
                  style={{ inputAndroid: { color: 'black' } }}
                  placeholder={{
                    label: 'Area',
                    value: '',
                  }}
                  placeholderTextColor="gray"
                  onValueChange={(city) => setCity(city)}
                  items={[
                    { label: 'Beirut 1', value: 'Beirut 1' },
                    { label: 'Beirut 2', value: 'Beirut 2' },
                    { label: 'Beirut 3', value: 'Beirut 3' },
                    { label: 'Beirut 4', value: 'Beirut 4' },
                    { label: 'Mount 1', value: 'Mount 1' },
                    { label: 'Mount 2', value: 'Mount 2' },
                    { label: 'Mount 3', value: 'Mount 3' },
                    { label: 'Mount 4', value: 'Mount 4' },
                    { label: 'Mount 5', value: 'Mount 5' },
                    { label: 'North 1', value: 'North 1' },
                    { label: 'North 2', value: 'North 2' },
                    { label: 'North 3', value: 'North 3' },
                    { label: 'North 4', value: 'North 4' },
                    { label: 'North 5', value: 'North 5' },
                  ]}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    width: 150,
                    textAlign: 'center',
                    marginTop: 10,
                    marginLeft: 20,
                    fontSize: 18,
                    color: COLORS.robinEggBlue,
                    fontWeight: 'bold',
                    borderBottomColor: COLORS.robinEggBlue,
                    borderBottomWidth: 2,
                  }}>
                  {city}
                </Text>
                <Text style={{ fontSize: 17, marginTop: 11, marginLeft: 5 }}>
                  Is Selected
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 8,
                  alignItems: 'center',
                  marginTop: 25,
                  width: '100%',
                }}>
                <TouchableOpacity onPress={saveUserDetails}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Save</Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  marginTop: 15,
                  width: '100%',
                }}>
                <TouchableOpacity onPress={displayuserDetail}>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    Check Area
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <Text style={{ fontSize: 20, marginTop: 30, marginLeft: 20 }}>
              Help Us Improve
            </Text>

            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
              style={{
                padding: 2,
                marginTop: 10,
                marginLeft: 20,
                width: '40%',
              }}></LinearGradient>

            <View styles={{ width: '100%' }}>
              <Text style={{ fontSize: 17, marginTop: 15, marginLeft: 20 }}>
                {' '}
                Support Our Team For Only $0.99
              </Text>
              <Text style={{ fontSize: 17, marginTop: 4, marginLeft: 20 }}>
                {' '}
                We will take care of the adds!
              </Text>

              <LinearGradient
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 0.0 }}
                colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  marginTop: 15,
                  width: '100%',
                }}>
                <Text
                  style={{ color: 'white', fontSize: 20 }}
                  onPress={saveUserDetails}>
                  Contribute Now
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function BeirutMenu({ route }) {
  const Redirect = (item) => {
    if (item.buttonType == 'b1') {
      navigate('Schedule', { area: 'b1' });
    } else if (item.buttonType == 'b2') {
      navigate('Schedule', { area: 'b2' });
    } else if (item.buttonType == 'b3') {
      navigate('Schedule', { area: 'b3' });
    } else {
      navigate('Schedule', { area: 'b4' });
    }
  };

  return (
    <ScrollView style={styles.containerScrollView}>
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.robinEggBlue,
            marginBottom: 30,
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />

          <FlatList
            style={{
              flex: 1,
              backgroundColor: 'white',
              margin: 5,
              padding: 10,
              marginBottom: 5,
              borderRadius: 5,
              overflow: 'hidden',
            }}
            keyExtractor={(item) => item.id}
            data={[
              { name: 'B e i r u t  1  ', id: '1', buttonType: 'b1' },
              { name: 'B e i r u t  2  ', id: '2', buttonType: 'b2' },
              { name: 'B e i r u t  3  ', id: '3', buttonType: 'b3' },
              { name: 'B e i r u t  4  ', id: '4', buttonType: 'b4' },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={Redirect.bind(this, item)}>
                <Text style={styles.itemMenu}>
                  {item.name}
                  <Ionicons name="location-outline" size={32} color="white" />
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function NorthMenu({ route }) {
  const Redirect = (item) => {
    if (item.buttonType == 'n1' /*'ach'*/) {
      navigate('Schedule', { area: 'n1' });
    } else if (item.buttonType == 'n2') {
      navigate('Schedule', { area: 'n2' });
    } else if (item.buttonType == 'n3') {
      navigate('Schedule', { area: 'n3' });
    } else {
      navigate('Schedule', { area: 'n4' });
    }
    //else {
    //  Alert.alert(item.name);
    //}
  };

  return (
    <ScrollView style={styles.containerScrollView}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.robinEggBlue,
            marginBottom: 30,
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />

          <FlatList
            style={{
              flex: 1,
              backgroundColor: 'white',
              margin: 5,
              padding: 10,
              marginBottom: 5,
              borderRadius: 5,
              overflow: 'hidden',
            }}
            keyExtractor={(item) => item.id}
            data={[
              { name: 'N o r t h  1  ', id: '1', buttonType: 'n1' },
              { name: 'N o r t h  2  ', id: '2', buttonType: 'n2' },
              { name: 'N o r t h  3  ', id: '3', buttonType: 'n3' },
              { name: 'N o r t h  4  ', id: '4', buttonType: 'n4' },
              { name: 'N o r t h  5  ', id: '5', buttonType: 'n5' },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={Redirect.bind(this, item)}>
                <Text style={styles.itemMenu}>
                  {item.name}
                  <Ionicons name="location-outline" size={32} color="white" />
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function MountMenu({ route }) {
  const Redirect = (item) => {
    if (item.buttonType == 'm1' /*'ach'*/) {
      navigate('Schedule', { area: 'm1' });
    } else if (item.buttonType == 'm2') {
      navigate('Schedule', { area: 'm2' });
    } else if (item.buttonType == 'm3') {
      navigate('Schedule', { area: 'm3' });
    } else {
      navigate('Schedule', { area: 'm4' });
    }
    //else {
    //  Alert.alert(item.name);
    //}
  };

  return (
    <ScrollView style={styles.containerScrollView}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.robinEggBlue,
            marginBottom: 30,
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={[COLORS.robinEggBlue, COLORS.littleBoyBlue]}
            style={{
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />

          <FlatList
            style={{
              flex: 1,
              backgroundColor: 'white',
              margin: 5,
              padding: 10,
              marginBottom: 5,
              borderRadius: 5,
              overflow: 'hidden',
            }}
            keyExtractor={(item) => item.id}
            data={[
              { name: 'M o u n t  1  ', id: '1', buttonType: 'm1' },
              { name: 'M o u n t  2  ', id: '2', buttonType: 'm2' },
              { name: 'M o u n t  3  ', id: '3', buttonType: 'm3' },
              { name: 'M o u n t  4  ', id: '4', buttonType: 'm4' },
              { name: 'M o u n t  5  ', id: '4', buttonType: 'm5' },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={Redirect.bind(this, item)}>
                <Text style={styles.itemMenu}>
                  {item.name}
                  <Ionicons name="location-outline" size={32} color="white" />
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function Schedule({ route }) {
  const [items, setItems] = useState({});
  let area = route.params.area;
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        //dates to be shown on screen after choosing date
        const time = day.timestamp + i * 24 * 60 * 60 * 1000; //days * 24 * 60 * 60 * 1000 = days * 86400000 ms
        const strTime = timeToString(time); //translates number in time to a string of date
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = 1;
          for (let j = 0; j < numItems; j++) {
            if (area == 'b1') {
              items[strTime].push({
                name: 'Outage' + ' from 6:00 am till 9:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'b2') {
              items[strTime].push({
                name: 'Outage' + ' from 9:00 am till 12:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'b3') {
              items[strTime].push({
                name: 'Outage' + ' from 12:00 pm till 3:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'b4') {
              items[strTime].push({
                name: 'Outage' + ' from 3:00 pm till 6:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'm1') {
              items[strTime].push({
                name: 'Outage' + ' from 6:00 am till 10:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'm2') {
              items[strTime].push({
                name: 'Outage' + ' from 10:00 am till 2:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'm3') {
              items[strTime].push({
                name: 'Outage' + ' from 2:00 pm till 6:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'm4') {
              items[strTime].push({
                name: 'Outage' + ' from 6:00 pm till 12:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'm5') {
              items[strTime].push({
                name: 'Outage' + ' from 12:00 am till 6:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'n1') {
              items[strTime].push({
                name: 'Outage' + ' from 6:00 am till 10:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'n2') {
              items[strTime].push({
                name: 'Outage' + ' from 10:00 am till 2:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'n3') {
              items[strTime].push({
                name: 'Outage' + ' from 2:00 pm till 6:00 pm', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'n4') {
              items[strTime].push({
                name: 'Outage' + ' from 6:00 pm till 12:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            } else if (area == 'n5') {
              items[strTime].push({
                name: 'Outage' + ' from 12:00 am till 6:00 am', //outage number
                height: Math.max(50, Math.floor(Math.random() * 140)),
              });
            }
          }
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    });
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Ionicons name="timer-outline" size={50} color="#13bef2" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString}
        renderItem={renderItem}
      />
    </View>
  );
}

const RootStack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
  },

  title: {
    fontSize: 50,
    fontWeight: '500',
    color: COLORS.tuftsBlue,
  },

  titleContainer: {
    marginTop: '8%',
    width: '100%',
    height: 110,
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.9,
  },

  subTitle: {
    marginTop: -5,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.tuftsBlue,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  containerScrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },

  itemMenu: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    backgroundColor: COLORS.cyanProcess,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    borderRadius: 7,
    overflow: 'hidden',
  },

  introTitleStyle: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    top: 80,
  },

  introTextStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    position: 'absolute',
    bottom: 180,
  },

  introImageStyle: {
    width: '70%',
    height: '70%',
    bottom: 200,
    resizeMode: 'contain',
    position: 'absolute',
  },
});

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.RevealFromBottomAndroid,
        }}>
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="Option" component={Option} />
        <RootStack.Screen name="Settings" component={Settings} />
        <RootStack.Screen name="Provinces" component={ProvincesMenu} />
        <RootStack.Screen name="Beirut" component={BeirutMenu} />
        <RootStack.Screen name="North" component={NorthMenu} />
        <RootStack.Screen name="Mount" component={MountMenu} />
        <RootStack.Screen name="Schedule" component={Schedule} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
