import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View, StyleSheet } from "react-native";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";

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

const BookRide = () => {
    const { user } = useUser();
    const { userAddress, destinationAddress } = useLocationStore();
    const { selectedDriver } = useDriverStore();

    const driverDetails = drivers?.filter(
        (driver) => +driver.id === selectedDriver,
    )[0];

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
                            <Text style={styles.ratingText}>
                                {driverDetails?.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.rideInfoContainer}>
                    <View style={styles.rideInfoRow}>
                        <Text style={styles.infoText}>Ride Price</Text>
                        <Text style={styles.priceText}>
                            ${driverDetails?.price}
                        </Text>
                    </View>

                    <View style={styles.rideInfoRow}>
                        <Text style={styles.infoText}>Pickup Time</Text>
                        <Text style={styles.infoText}>
                            {formatTime(driverDetails?.time || 5)}
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
                        <Text style={styles.addressText}>
                            {userAddress}
                        </Text>
                    </View>

                    <View style={styles.addressRow}>
                        <Image source={icons.point} style={styles.addressIcon} />
                        <Text style={styles.addressText}>
                            {destinationAddress}
                        </Text>
                    </View>
                </View>
            </>
            
        </RideLayout>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333", // Adjusted color for better visibility
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
        borderRadius: 60, // Adjusted for a perfect circle
    },
    driverInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    driverName: {
        fontSize: 20,
        fontWeight: "600", // Semi-bold
        color: "#000", // Driver name color
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
        color: "black", // Gold for rating
    },
    rideInfoContainer: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#ADD8E6", // Updated background color
        marginTop: 20,
    },
    rideInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#fff", // White border
    },
    infoText: {
        fontSize: 16,
        color: "black", // White text for better contrast
    },
    priceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0CC25F", // Green for price
    },
    addressContainer: {
        marginTop: 20,
    },
    addressRow: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB", // Light grey border
        paddingVertical: 10,
    },
    addressIcon: {
        width: 24,
        height: 24,
    },
    addressText: {
        fontSize: 16,
        marginLeft: 8,
        color: "#000", // Adjusted color for address text
    },
});

export default BookRide;
