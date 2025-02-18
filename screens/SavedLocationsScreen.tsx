import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Text, Button, List } from 'react-native-paper';
import axios from 'axios';
import { getLocations, deleteLocation, Location } from '../src/database';

const SavedLocationsScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState<{ [key: number]: any }>({});

  const fetchLocations = async () => {
    const savedLocations = await getLocations();
    setLocations(savedLocations);
    setWeatherData({});
  };

  useFocusEffect(
    useCallback(() => {
      fetchLocations();
    }, [])
  );

  const fetchWeatherForLocation = async (id: number, latitude: number, longitude: number) => {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          current_weather: true,
        },
      });
      setWeatherData((prev) => ({
        ...prev,
        [id]: response.data.current_weather,
      }));
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteLocation(id);
    fetchLocations();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.header}>
          Saved Locations
        </Text>

        {locations.length === 0 ? (
          <Text variant="bodyLarge" style={styles.emptyMessage}>
            No saved locations yet.
          </Text>
        ) : (
          locations.map((item) => (
            <Card key={item.id} mode="outlined" style={styles.card}>
              <Card.Content>
                <List.Item
                  title={item.city}
                  description={`Latitude: ${item.latitude}, Longitude: ${item.longitude}`}
                  left={(props) => <List.Icon {...props} icon="map-marker" />}
                />
                {weatherData[item.id] && (
                  <Text variant="bodyLarge" style={styles.weatherInfo}>
                    🌡 Temp: {weatherData[item.id].temperature}°C | 💨 Wind: {weatherData[item.id].windspeed} km/h
                  </Text>
                )}
                <View style={styles.buttonContainer}>
                  <Button mode="contained-tonal" onPress={() => fetchWeatherForLocation(item.id, item.latitude, item.longitude)}>
                    Fetch Weather
                  </Button>
                  <Button mode="text" textColor="red" onPress={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  weatherInfo: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SavedLocationsScreen;
