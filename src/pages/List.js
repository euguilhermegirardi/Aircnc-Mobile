import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, Image, Text, AsyncStorage, StyleSheet } from 'react-native';
import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';
import socketio from 'socket.io-client';

export default function List() {
  const [techs, setTechs] = useState([]);

  // Socket.io
  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://172.20.10.6:3333', {
        query: { user_id },
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Your request in ${booking.spot.company} on ${booking.date} has been ${booking.approved ? 'ACCEPTED' : 'DECLINED'} `);
      })
    })
  }, []);

  // Fire when the page is opened.
  useEffect(() => {
    // ReactJS, Node.js 'string' => storedTechs => [ReactJS, [ Node.js]
    AsyncStorage.getItem('techs').then(storedTechs => {
      const techsArray = storedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
      {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10,
  },
});

