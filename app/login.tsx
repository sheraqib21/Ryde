import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Login = () => {
  const { type } = useLocalSearchParams<{ type?: string }>(); // type can be a string or undefined
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignUp = async () => {
    console.log(
      "User Signed up with credentials Email: " +
        email +
        " and Password: " +
        password
    );
  };
  const onLogin = async () => {
    console.log(
      "User Logged in with credentials Email: " +
        email +
        " and Password: " +
        password
    );
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={1}
      style={[
        styles.container,
        {
          paddingTop: top,
        },
      ]}
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
      {loading ? (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size={"large"} color={"#fff"} />
        </View>
      ) : (
        <View>
          <Image
            style={styles.logo}
            source={require("../assets/images/chatgpt.png")}
          />
          <Text style={styles.title}>
            {type === "login" ? "Welcome Back" : "Create an account"}
          </Text>
          <View style={styles.form}>
            <TextInput
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholder="Email Address"
              style={styles.inputField}
            />
            <TextInput
              onChangeText={setPassword}
              autoCapitalize="none"
              placeholder="Password"
              style={styles.inputField}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={type === "login" ? onLogin : onSignUp}
              style={[defaultStyles.btn, styles.btn]}
            >
              <Text style={styles.btn}>
                {type === "login" ? "Login" : "Create account"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
  },
  form: {
    marginTop: 2,
  },
  inputField: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderColor: Colors.primary,
    color: "#000",
    fontSize: 16,
  },
  btn: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
});
