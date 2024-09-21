import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, Polyline } from 'react-native-maps';
import { icons } from '@/constants';
import { calculateRegion, generateMarkersFromData } from '@/lib/map';
import { useDriverStore, useLocationStore } from '@/store';

// Define the structure for MarkerData
interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}

const drivers = [
  {
    id: '1',
    first_name: 'James',
    last_name: 'Wilson',
    profile_image_url: 'https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/',
    car_image_url: 'https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/',
    car_seats: 4,
    rating: '4.80',
  },
  {
    id: '2',
    first_name: 'David',
    last_name: 'Brown',
    profile_image_url: 'https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/',
    car_image_url: 'https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/',
    car_seats: 5,
    rating: '4.60',
  },
  {
    id: '3',
    first_name: 'Michael',
    last_name: 'Johnson',
    profile_image_url: 'https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/',
    car_image_url: 'https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/',
    car_seats: 4,
    rating: '4.70',
  },
  {
    id: '4',
    first_name: 'Robert',
    last_name: 'Green',
    profile_image_url: 'https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/',
    car_image_url: 'https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/',
    car_seats: 4,
    rating: '4.90',
  },
];

const Map = () => {
    const {
      userLongitude,
      userLatitude,
      destinationLongitude,
      destinationLatitude,
    } = useLocationStore();
  
    const { selectedDrivers, setDrivers } = useDriverStore();
    const [markers, setMarkers] = useState([]);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
  
    const region = calculateRegion({
      userLongitude,
      userLatitude,
      destinationLongitude,
      destinationLatitude,
    });
  
    useEffect(() => {
      if (Array.isArray(drivers)) {
        if (!userLatitude || !userLongitude) return;
  
        const newMarkers = generateMarkersFromData({
          data: drivers,
          userLatitude,
          userLongitude,
        });
  
        setMarkers(newMarkers);
      }
    }, [drivers, userLatitude, userLongitude]);
  
    useEffect(() => {
      const fetchRoute = async () => {
        if (!userLatitude || !userLongitude || !destinationLatitude || !destinationLongitude) return;
  
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/routing?waypoints=${userLatitude},${userLongitude}|${destinationLatitude},${destinationLongitude}&mode=drive&apiKey=b5c7f4c229a34d9f9b2805d1b0c8c411`
          );
          const data = await response.json();
  
          if (data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates[0].map(coord => ({
              latitude: coord[1],
              longitude: coord[0]
            }));
            setRouteCoordinates(coordinates);
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };
  
      fetchRoute();
    }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);
  
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsPointsOfInterest={false}
          showsUserLocation={true}
          userInterfaceStyle="dark"
          showsCompass={true}
          initialRegion={region}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              image={
                selectedDrivers === marker.id
                  ? icons.selectedMarker
                  : icons.marker
              }
            />
          ))}
  
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#0000FF" // Blue color for the route
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%', // Adjust height as needed to match the UI
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 40,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
