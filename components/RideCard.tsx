import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import { Ride } from '@/types/type';
import Constants from 'expo-constants';
import { icons } from '@/constants';

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
const getMapImageUrl = (latitude: string, longitude: string): string | null => {
  const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
  if (!apiKey) {
    console.error('Geoapify API Key is missing');
    return null;
  }
  return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=14&apiKey=${apiKey}`;
};

const RideCard = ({ ride }: { ride: Ride }) => {
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = getMapImageUrl(ride.destination_latitude, ride.destination_longitude);
    setMapUrl(url);
    if (!url) {
      setError('Failed to generate map URL');
    }
    // Log for debugging
    console.log('Map URL:', url);
    console.log('API Key:', process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY);
  }, [ride]);

  return (
    <View style={styles.cardContainer}>
      {mapUrl ? (
        <Image
          source={{ uri: mapUrl }}
          style={styles.mapImage}
          onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
            console.log('Image loading error:', e.nativeEvent.error);
            setError('Failed to load map image');
          }}
        />
      ) : (
        <View style={[styles.mapImage, styles.placeholderImage]}>
          <Text>{error || 'Map not available'}</Text>
        </View>
      )}
      
      <View style={styles.container}>
        {/* Origin and Destination details */}
        <View style={styles.detailContainer}>
          <Image source={icons.to} style={styles.icon} />
          <Text style={styles.detailText} numberOfLines={1}>
            {ride.origin_address}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Image source={icons.point} style={styles.icon} />
          <Text style={styles.detailText} numberOfLines={1}>
            {ride.destination_address}
          </Text>
        </View>

        {/* New block with additional ride details */}
        
        <View style={styles.additionalInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value} numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Driver</Text>
            <Text style={styles.value}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Car Seats</Text>
            <Text style={styles.value}>{ride.driver.car_seats}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Payment Status</Text>
            <Text
              style={[
                styles.value,
                { color: ride.payment_status === "paid" ? "green" : "red" },
              ]}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    marginBottom: 15,
    padding: 10,
  },
  mapImage: {
    width: 80,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  placeholderImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  additionalInfoContainer: {
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RideCard;
