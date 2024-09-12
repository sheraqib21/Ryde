import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import InputField from "@/components/InputField"; // Custom InputField component
import { icons, images } from "@/constants"; // Import your icons and images
import { useRouter } from "expo-router"; // Expo Router
import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-expo"; // Clerk auth for login/signup

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to manage login modal
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false); // For auth requests

  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Handle Sign-Up
  const onSignUpPress = async () => {
    if (!validateEmail(form.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!signUpLoaded) {
      Alert.alert("SignUp process is not ready.");
      return;
    }
    setAuthLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: form.email.trim(),
        password: form.password,
      });
      setSignUpActive({ session: result.createdSessionId });
      Alert.alert("Account Created", "Your account was created successfully.");
    } catch (error: any) {
      Alert.alert("SignUp Error", error.errors[0]?.longMessage || "An error occurred");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Log-In
  const onLoginPress = async () => {
    if (!validateEmail(loginForm.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!signInLoaded) {
      Alert.alert("Login process is not ready.");
      return;
    }
    setAuthLoading(true);
    try {
      const result = await signIn.create({
        identifier: loginForm.email.trim(),
        password: loginForm.password,
      });
      setActive({ session: result.createdSessionId });
      router.replace("/(tabs)/home"); // Navigate to your home or chat screen after login
      setModalVisible(false); // Close modal after successful login
    } catch (error: any) {
      Alert.alert("Login Error", error.errors[0]?.longMessage || "Could not find your account");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Google Sign-In (You will need to implement this)
  const handleGoogleSignIn = async () => {
    Alert.alert("Google Sign-In", "Google sign-in functionality is not implemented yet.");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        {authLoading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
        ) : (
          <View>
            {/* Top Image */}
            <View style={{ width: "100%", height: 250, position: "relative" }}>
              <Image source={images.signUpCar} style={{ width: "100%", height: 250 }} />
              <Text
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Create Your Account
              </Text>
            </View>

            {/* Form Input Fields */}
            <View style={{ padding: 20 }}>
              <InputField
                label="Name"
                placeholder="Enter name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Email"
                placeholder="Enter email"
                icon={icons.email}
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                icon={icons.lock}
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                rightIcon={showPassword ? icons.eyecross : icons.eye}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />

              {/* Sign Up Button */}
              <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.line} />
              </View>

              {/* Google Sign-In */}
              <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                <Image source={icons.google} style={styles.googleIcon} />
                <Text style={styles.googleText}>Log In with Google</Text>
              </TouchableOpacity>

              {/* Already have an account */}
              <TouchableOpacity
                style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}
                onPress={() => setModalVisible(true)} // Open the login modal
              >
                <Text style={{ color: "#333", marginRight: 5 }}>Already have an account?</Text>
                <Text style={{ color: "#007BFF", fontWeight: "bold" }}>Log in</Text>
              </TouchableOpacity>
            </View>

            {/* Login Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Welcome Back 👋 </Text>

                  <InputField
                    label="Email"
                    placeholder="Enter email"
                    icon={icons.email}
                    value={loginForm.email}
                    onChangeText={(value) => setLoginForm({ ...loginForm, email: value })}
                  />
                  <InputField
                    label="Password"
                    placeholder="Enter password"
                    icon={icons.lock}
                    secureTextEntry={!showLoginPassword}
                    value={loginForm.password}
                    onChangeText={(value) => setLoginForm({ ...loginForm, password: value })}
                    rightIcon={showLoginPassword ? icons.eyecross : icons.eye}
                    onRightIconPress={() => setShowLoginPassword(!showLoginPassword)}
                  />

                  {/* Log In Button */}
                  <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableOpacity>

                  {/* Close modal */}
                  <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setModalVisible(false)}>
                    <Text style={{ color: "#007BFF", fontWeight: "bold" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20, // Add margin for space between form and button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#E2E8F0", // Lighter line for divider
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    color: "#A0AEC0", // Lighter text for "Or"
    fontWeight: "bold",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
