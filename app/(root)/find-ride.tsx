import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View style={styles.container}>
        <Text style={styles.label}>From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle={styles.textInputContainer}
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle={styles.textInputContainer}
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find Now"
        onPress={() => router.push(`/(root)/confirm-ride`)}
        style={styles.button}
      />
    </RideLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12, // Replaces "my-3" (which stands for margin-y 12px in Tailwind)
  },
  label: {
    fontSize: 18, // Replaces "text-lg"
    fontFamily: "JakartaSemiBold", // Replaces "font-JakartaSemiBold"
    marginBottom: 12, // Replaces "mb-3"
  },
  textInputContainer: {
    backgroundColor: "#f5f5f5", // Matches the Tailwind background style
  },
  button: {
    marginTop: 20, // Replaces "mt-5"
  },
});

export default FindRide;
