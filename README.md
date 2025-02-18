# 📌 React Native Weather App  

A simple weather app built with **React Native (Expo)** that allows users to:  
✔ **View weather** at their **current location** 🌍  
✔ **Search for a city** and see its weather 🌤  
✔ **Save up to 4 favorite cities** for quick access 📍  
✔ **Delete saved cities** when needed ❌  

---

## 📸 Screenshots  
| Splash Screen | Current Location Weather | Search & Save | Saved Locations |
|-----------------|-----------------|-----------------|-----------------|
![Current Weather](assets/Screenshot0.jpeg) | ![Current Weather](assets/Screenshot1.jpeg) | ![Search Weather](assets/Screenshot2.jpeg) | ![Saved Locations](assets/Screenshot3.jpeg) |

---

## 🛠️ Technologies Used  
- **React Native** (Expo) ⚛️  
- **TypeScript** 🔹  
- **SQLite** (expo-sqlite) for local storage 🗄️  
- **React Navigation** for tab-based navigation 🔄  
- **Open-Meteo API** for weather data ☁️  
- **React Native Paper** for UI components 🎨  

---

## 📂 Project Structure  
```bash
/weather-app
├── /src
│   ├── /screens
│   │   ├── CurrentLocationWeather.tsx
│   │   ├── SearchWeather.tsx
│   │   ├── SavedLocations.tsx
│   ├── /database
│   │   ├── database.ts
│   ├── /components
│   │   ├── WeatherCard.tsx
│   ├── App.tsx
│   ├── README.md
│   ├── package.json
│   ├── app.json
```

## 📥 Installation & Setup

1️⃣ Clone the repository:  
```sh
git clone https://github.com/A00483108/weatherRnApp.git
cd weatherRnApp
```
2️⃣ Install dependencies:
```sh
npm install
```
3️⃣ Start the development server:
```sh
npx expo start
```


## 🚀 Features
Current Location Weather: Get real-time weather updates for your GPS location.
Search for a City: Look up weather for any city worldwide.
Save Locations: Store up to 4 favorite cities for quick access.
Remove Locations: Easily delete saved locations.
Offline Storage: Uses SQLite to store saved cities locally.


## 📌 API Used
This app uses the Open-Meteo API for weather and geolocation data.
🔗 [Open-Meteo API Documentation](https://open-meteo.com/en/docs)


## 🏗️ How It Works

### 1. **Current Location Weather (Screen 1)**
   - **Purpose**: Uses `expo-location` to automatically show weather data for the user's current location.
   - The app first requests permission to access the device's location. Once granted, it fetches the user's current position (latitude and longitude) using the `expo-location` package.
   - This data is then used to fetch current weather details from the Open-Meteo API.
   - The weather data (e.g., temperature, wind speed) is displayed on the screen.

### 2. **Search & Display Weather (Screen 2)**
   - **Purpose**: Allows the user to search for a city and view the weather information for that location.
   - The user inputs a city name, and the app queries the Open-Meteo API's geocoding service to get the coordinates (latitude, longitude) of the city.
   - The app then fetches the current weather for the provided coordinates using the Open-Meteo API.
   - Users can save their searched locations to access them later, but there is a limit of 4 saved locations.
   - If the user tries to save more than 4 locations, an alert is shown.

### 3. **Saved Locations (Screen 3)**
   - **Purpose**: Displays a list of cities that the user has saved.
   - Each saved location is listed with the option to fetch the current weather.
   - The weather data for each saved location is fetched when the user clicks on the "Fetch Weather" button.
   - The user can also delete a location from their saved list.
   - The list of saved locations is stored in a local SQLite database using `expo-sqlite`.

### 4. **Data Fetching**
   - The app uses the **Open-Meteo API** to fetch both weather and geocoding data. The geocoding API helps get latitude and longitude for the city entered by the user or for the user's current location.
   - The weather data includes details like temperature, wind speed, and other metrics.
   - All data is fetched asynchronously, ensuring the app remains responsive during API calls.



## 🔧 Dependencies
``` json
"dependencies": {
  "expo": "~49.0.0",
  "react": "18.2.0",
  "react-native": "0.72.0",
  "expo-location": "~15.0.1",
  "expo-sqlite": "~11.0.0",
  "axios": "^1.5.0",
  "react-native-paper": "^5.11.2",
  "react-navigation": "^6.1.0",
  "react-navigation-tabs": "^6.5.2"
}
```

## 👨‍💻 Developed By
💡 Sukanta Dey Amit