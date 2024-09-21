import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";

interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: string;
  price: number;
}

const drivers: Driver[] = [
  {
    id: "1",
    first_name: "James",
    last_name: "Wilson",
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: "4.80",
    price: 20,
  },
  {
    id: "2",
    first_name: "David",
    last_name: "Brown",
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    rating: "4.60",
    price: 25,
  },
];

const BookRide: React.FC = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { selectedDriver } = useDriverStore();
  const driverDetails = drivers.find(
    (driver) => driver.id === selectedDriver?.toString()
  );

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const confirmRide = () => {
    setIsConfirmationModalVisible(true);
  };

  return (
    <RideLayout title="Book Ride">
      <>
        <Text style={styles.title}>Ride Information</Text>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            style={styles.profileImage}
          />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>
              {driverDetails?.first_name} {driverDetails?.last_name}
            </Text>
            <View style={styles.ratingContainer}>
              <Image
                source={icons.star}
                style={styles.ratingIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>{driverDetails?.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideInfoContainer}>
          <View style={styles.rideInfoRow}>
            <Text style={styles.infoText}>Ride Price</Text>
            <Text style={styles.priceText}>
              ${driverDetails?.price || 0}
            </Text>
          </View>

          <View style={styles.rideInfoRow}>
            <Text style={styles.infoText}>Pickup Time</Text>
            <Text style={styles.infoText}>
              {formatTime(driverDetails?.id ? 5 : 10)}
            </Text>
          </View>

          <View style={styles.rideInfoRow}>
            <Text style={styles.infoText}>Car Seats</Text>
            <Text style={styles.infoText}>
              {driverDetails?.car_seats}
            </Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Image source={icons.to} style={styles.addressIcon} />
            <Text style={styles.addressText}>{userAddress}</Text>
          </View>

          <View style={styles.addressRow}>
            <Image source={icons.point} style={styles.addressIcon} />
            <Text style={styles.addressText}>{destinationAddress}</Text>
          </View>
        </View>

        {/* Confirm Ride Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={confirmRide}>
          <Text style={styles.buttonText}>Confirm Ride</Text>
        </TouchableOpacity>

        {/* Confirmation Modal */}
        <Modal
          visible={isConfirmationModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ride Booked!</Text>
              <Text>Your ride has been successfully booked.</Text>
              <TouchableOpacity
                style={styles.confirmationButton}
                onPress={() => setIsConfirmationModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    </RideLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  driverName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  ratingIcon: {
    width: 24,
    height: 24,
  },
  ratingText: {
    fontSize: 18,
    color: "#000",
  },
  rideInfoContainer: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ADD8E6",
    marginTop: 20,
  },
  rideInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
  },
  infoText: {
    fontSize: 16,
    color: "#000",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0CC25F",
  },
  addressContainer: {
    marginTop: 20,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
  },
  addressIcon: {
    width: 24,
    height: 24,
  },
  addressText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#0CC25F",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  confirmationButton: {
    backgroundColor: "#0CC25F",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default BookRide;
