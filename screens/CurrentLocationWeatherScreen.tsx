import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { ActivityIndicator, Text, Card, Snackbar } from 'react-native-paper';

const CurrentLocationWeatherScreen = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('⚠️ Permission to access location was denied.');
          setSnackbarVisible(true);
          return;
        }

        // Get current location
        const { coords } = await Location.getCurrentPositionAsync({});
        
        // Fetch weather data
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            current_weather: true,
          },
        });

        setWeather(response.data.current_weather);
      } catch (err) {
        setError('❌ Failed to fetch weather data.');
        setSnackbarVisible(true);
      } finally {
        setLoading(false);
      }
    };

    getLocationAndWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Current Location Weather
      </Text>

      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}

      {weather && !loading && !error && (
        <Card mode="outlined" style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">📍 Weather at Your Location:</Text>
            <Text>🌡 Temperature: {weather.temperature}°C</Text>
            <Text>💨 Wind Speed: {weather.windspeed} km/h</Text>
          </Card.Content>
        </Card>
      )}

      {/* Snackbar for Error Messages */}
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
  card: {
    marginTop: 20,
  },
});

export default CurrentLocationWeatherScreen;
