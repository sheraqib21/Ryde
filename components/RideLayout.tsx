import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";
  import { router } from "expo-router";
  import React, { useRef } from "react";
  import { Image, Text, TouchableOpacity, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  
  import Map from "@/components/Map";
  import { icons } from "@/constants";
  
  const RideLayout = ({
    title,
    snapPoints,
    children,
  }: {
    title: string;
    snapPoints?: string[];
    children: React.ReactNode;
  }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
  
    return (
      <GestureHandlerRootView style={styles.flex1}>
        <View style={styles.flex1}>
          <StatusBar barStyle="light-content" />
          <Map style={styles.map} />
          <SafeAreaView style={styles.overlay}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>{title || "Go Back"}</Text>
            </View>
          </SafeAreaView>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["40%", "85%"]}
            index={0}
            style={styles.bottomSheet}
          >
            {title === "Choose a Rider" ? (
              <BottomSheetView style={styles.bottomSheetContent}>
                {children}
              </BottomSheetView>
            ) : (
              <BottomSheetScrollView style={styles.bottomSheetContent}>
                {children}
              </BottomSheetScrollView>
            )}
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    flex1: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      marginTop:10 // This ensures the map fills its parent container
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    backIcon: {
      width: 20,
      height: 20,
      tintColor: '#3b82f6',
    },
    headerText: {
      fontSize: 20,
      fontFamily: 'JakartaSemiBold',
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    bottomSheet: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    bottomSheetContent: {
      flex: 1,
      padding: 20,
    },
  });
  
  export default RideLayout;