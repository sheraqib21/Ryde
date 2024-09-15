import React from 'react';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native'; // Make sure ScrollView is imported
import { useFonts } from 'expo-font';
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Medium': require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('@/assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <Image
              source={{
                uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
              }}
              style={styles.mapImage}
            />
            <View style={styles.addressContainer}>
              <View style={styles.addressRow}>
                <Image source={icons.to} style={styles.icon} />
                <Text style={styles.addressText} numberOfLines={1}>
                  {ride.origin_address}
                </Text>
              </View>
              <View style={styles.addressRow}>
                <Image source={icons.point} style={styles.icon} />
                <Text style={styles.addressText} numberOfLines={1}>
                  {ride.destination_address}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            {[
              { label: 'Date & Time', value: `${formatDate(ride.created_at)}, ${formatTime(ride.ride_time)}` },
              { label: 'Driver', value: `${ride.driver.first_name} ${ride.driver.last_name}` },
              { label: 'Car Seats', value: ride.driver.car_seats.toString() },
              { label: 'Payment Status', value: ride.payment_status, isPaymentStatus: true },
            ].map((detail, index) => (
              <View key={index} style={[styles.detailRow, index === 3 && styles.lastDetailRow]}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text
                  style={[
                    styles.detailValue,
                    detail.isPaymentStatus && { color: ride.payment_status === "paid" ? "#22C55E" : "#EF4444" },
                  ]}
                >
                  {detail.value}
                </Text>
              </View>
            ))}
            
          </View>
        </View>
      </View>
    
    
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 2, // Add padding to prevent overlap with the nav bar
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#D4D4D4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  contentContainer: {
    padding: 12,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: {
    width: 80,
    height: 90,
    borderRadius: 8,
  },
  addressContainer: {
    marginLeft: 20,
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    
    
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lastDetailRow: {
    marginBottom: 0,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});

export default RideCard;
