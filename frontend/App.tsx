import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
  const [myData, setMyData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.191.158:3000/api');
        setMyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>response {myData}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
