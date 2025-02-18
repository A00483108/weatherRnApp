import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card, Snackbar, ActivityIndicator } from 'react-native-paper';
import axios, { AxiosResponse } from 'axios';
import { saveLocation, getLocations } from '../src/database';

// Define types for API responses
interface GeocodingResponse {
  results: Array<{
    latitude: number;
    longitude: number;
  }>;
}

const SearchWeatherScreen = ({ navigation }: { navigation: any }) => {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch latitude & longitude using Open Meteo Geocoding API
      const geocodingResponse: AxiosResponse<GeocodingResponse> = await axios.get(
        'https://geocoding-api.open-meteo.com/v1/search',
        { params: { name: city } }
      );

      if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
        throw new Error('City not found.');
      }

      const { latitude, longitude } = geocodingResponse.data.results[0];
      setLatitude(latitude);
      setLongitude(longitude);

      // Fetch weather data
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: { latitude, longitude, current_weather: true },
      });

      setWeather(response.data.current_weather);
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLocation = async () => {
    if (!city || latitude === null || longitude === null) return;

    const savedLocations = await getLocations();
    if (savedLocations.length == 4) {
      setSnackbarMessage('⚠️ You can only save up to 4 locations.');
      setSnackbarVisible(true);
      return;
    }

    await saveLocation(city, latitude, longitude);
    setSnackbarMessage(`✅ ${city} has been saved.`);
    setSnackbarVisible(true);
    //navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Search Weather
      </Text>

      <TextInput
        label="Enter city name"
        value={city}
        onChangeText={setCity}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSearch} loading={loading} style={styles.searchButton}>
        Search
      </Button>

      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {weather && !loading && !error && (
        <Card mode="outlined" style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Weather in {city}:</Text>
            <Text>🌡 Temperature: {weather.temperature}°C</Text>
            <Text>💨 Wind Speed: {weather.windspeed} km/h</Text>
            <Button mode="contained-tonal" onPress={handleSaveLocation} style={styles.saveButton}>
              Save Location
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* Snackbar for alerts */}
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  searchButton: {
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
  },
  saveButton: {
    marginTop: 15,
  },
});

export default SearchWeatherScreen;
