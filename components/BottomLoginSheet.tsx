import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Link
        href={{ pathname: "login", params: { type: "loginWithApple" } }}
        style={[defaultStyles.btn, styles.lightBtn]}
        asChild
      >
        <TouchableOpacity>
          <Ionicons name="logo-apple" size={18} style={[styles.iconBtnLight]} />
          <Text>Continue with Apple</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{ pathname: "login", params: { type: "loginWithGoogle" } }}
        style={[defaultStyles.btn, styles.darkBtn]}
        asChild
      >
        <TouchableOpacity>
          <Ionicons name="logo-google" size={18} style={[styles.iconBtnDark]} />
          <Text style={[styles.iconBtnDark]}>Continue with Google</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{ pathname: "login", params: { type: "createAccount" } }}
        style={[defaultStyles.btn, styles.darkBtn]}
        asChild
      >
        <TouchableOpacity>
          <Text style={[styles.iconBtnDark]}>Create Account</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{ pathname: "login", params: { type: "login" } }}
        style={[defaultStyles.btn, styles.darkBtn]}
        asChild
      >
        <TouchableOpacity>
          <Text style={[styles.iconBtnDark]}>Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default BottomLoginSheet;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#000",
    width: "100%",
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    gap: 15,
  },
  lightBtn: {
    backgroundColor: "white",
    color: "#000",
  },
  darkBtn: {
    backgroundColor: Colors.grey,
    color: "#fff",
  },
  iconBtnLight: {
    color: "#000",
    paddingRight: 6,
  },
  iconBtnDark: {
    color: "#fff",

    paddingRight: 6,
  },
});
