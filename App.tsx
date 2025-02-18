import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createTable } from './src/database';
import CurrentLocationWeather from './screens/CurrentLocationWeatherScreen';
import SearchWeather from './screens/SearchWeatherScreen';
import SavedLocations from './screens/SavedLocationsScreen';
import { PaperProvider } from 'react-native-paper';

// Create Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  useEffect(() => {
    // Create the database table on app startup
    createTable();
  }, []);

  return (
    <PaperProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'CurrentWeather') {
              iconName = 'location-outline';
            } else if (route.name === 'SearchWeather') {
              iconName = 'search-outline';
            } else if (route.name === 'SavedLocations') {
              iconName = 'bookmark-outline';
            }
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="CurrentWeather" component={CurrentLocationWeather} options={{ title: "Current Weather" }} />
        <Tab.Screen name="SearchWeather" component={SearchWeather} options={{ title: "Search Weather" }} />
        <Tab.Screen name="SavedLocations" component={SavedLocations} options={{ title: "Saved Locations" }} />
      </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;