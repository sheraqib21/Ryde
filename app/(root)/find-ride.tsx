import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useLocationStore } from "../../store/index"; // Adjust the import path as needed

const FindRide = () => {
    const { userLocation, destinationLocation } = useLocationStore();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Find Ride</Text>
            <View style={styles.locationContainer}>
                <Text style={styles.label}>From:</Text>
                <Text style={styles.locationText}>
                    {userLocation ? `${userLocation.address}` : 'Current Location'}
                </Text>
            </View>
            <View style={styles.locationContainer}>
                <Text style={styles.label}>To:</Text>
                <Text style={styles.locationText}>
                    {destinationLocation ? `${destinationLocation.address}` : 'Select Destination'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    locationContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    locationText: {
        fontSize: 16,
        color: '#555',
    },
});

export default FindRide;