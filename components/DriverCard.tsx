import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.cardContainer,
        selected === item.id ? styles.selectedCard : styles.unselectedCard,
      ]}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        style={styles.profileImage}
      />

      <View style={styles.cardDetails}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.title}</Text>

          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.ratingIcon} />
            <Text style={styles.ratingText}>4</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.priceContainer}>
            <Image source={icons.dollar} style={styles.iconSmall} />
            <Text style={styles.priceText}>${item.price}</Text>
          </View>

          <Text style={styles.separatorText}>|</Text>

          <Text style={styles.generalText}>{formatTime(item.time!)}</Text>

          <Text style={styles.separatorText}>|</Text>

          <Text style={styles.generalText}>{item.car_seats} seats</Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        style={styles.carImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16, // py-5 in tailwind
    paddingHorizontal: 12, // px-3 in tailwind
    borderRadius: 12, // rounded-xl in tailwind
  },
  selectedCard: {
    backgroundColor: "#3b82f6", // bg-general-600
  },
  unselectedCard: {
    backgroundColor: "white",
  },
  profileImage: {
    width: 56, // w-14 in tailwind
    height: 56, // h-14 in tailwind
    borderRadius: 9999, // rounded-full in tailwind
  },
  cardDetails: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 12, // mx-3 in tailwind
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // mb-1 in tailwind
  },
  titleText: {
    fontSize: 18, // text-lg in tailwind
    fontFamily: "JakartaRegular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8, // ml-2 in tailwind
  },
  ratingIcon: {
    width: 14, // w-3.5 in tailwind
    height: 14, // h-3.5 in tailwind
  },
  ratingText: {
    fontSize: 14, // text-sm in tailwind
    fontFamily: "JakartaRegular",
    marginLeft: 2, // space-x-1 in tailwind (adjusted for rating text)
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSmall: {
    width: 16, // w-4 in tailwind
    height: 16, // h-4 in tailwind
  },
  priceText: {
    fontSize: 14, // text-sm in tailwind
    fontFamily: "JakartaRegular",
    marginLeft: 4, // ml-1 in tailwind
  },
  separatorText: {
    fontSize: 14, // text-sm in tailwind
    fontFamily: "JakartaRegular",
    color: "#1f2937", // text-general-800
    marginHorizontal: 4, // mx-1 in tailwind
  },
  generalText: {
    fontSize: 14, // text-sm in tailwind
    fontFamily: "JakartaRegular",
    color: "#1f2937", // text-general-800
  },
  carImage: {
    width: 56, // w-14 in tailwind
    height: 56, // h-14 in tailwind
  },
});

export default DriverCard;
