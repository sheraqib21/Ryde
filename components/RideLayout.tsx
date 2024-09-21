import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";
  import { router } from "expo-router";
  import React, { useRef } from "react";
  import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  
  import Maps from "@/components/Maps";
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
      <GestureHandlerRootView style={styles.flexOne}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => router.back()}>
                <View style={styles.backButton}>
                  <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    style={styles.backIcon}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.titleText}>
                {title || "Go Back"}
              </Text>
            </View>
  
            <Maps />
          </View>
  
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["40%", "85%"]}
            index={0}
          >
            {title === "Choose a Rider" ? (
              <BottomSheetView style={styles.bottomSheetView}>
                {children}
              </BottomSheetView>
            ) : (
              <BottomSheetScrollView style={styles.bottomSheetScrollView}>
                {children}
              </BottomSheetScrollView>
            )}
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    flexOne: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    mapContainer: {
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#b3b1b1', // blue-500
    },
    headerContainer: {
      flexDirection: 'row',
      position: 'absolute',
      zIndex: 10,
      top: 64, // top-16 in tailwind
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20, // px-5 in tailwind
    },
    backButton: {
      width: 45, // w-10 in tailwind
      height: 45, // h-10 in tailwind
      backgroundColor: 'white',
      borderRadius: 9999, // rounded-full in tailwind
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -10,
      fontWeight:'bold' // text-lg in tailwind
    },
    backIcon: {
      width: 24, // w-6 in tailwind
      height: 24, // h-6 in tailwind
       // mt-0.5 in tailwind
    },
    titleText: {
      fontSize: 25, // text-xl in tailwind
      fontWeight:'bold', // font-JakartaSemiBold in tailwind
      marginLeft: 10, 
      marginTop: -10,// ml-5 in tailwind
    },
    bottomSheetView: {
      flex: 1,
      padding: 20,
    },
    bottomSheetScrollView: {
      flex: 1,
      padding: 20,
    },
  });
  
  export default RideLayout;
  