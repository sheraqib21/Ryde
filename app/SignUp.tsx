import React, { useState } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const onSignUpPress = async () => {
    if (!validateEmail(form.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!isLoaded) {
      Alert.alert("SignUp process is not ready.");
      return;
    }
    setAuthLoading(true);
    try {
      await signUp.create({
        emailAddress: form.email.trim(),
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setShowVerificationModal(true);
    } catch (error: any) {
      Alert.alert("SignUp Error", error.errors[0]?.longMessage || "An error occurred");
    } finally {
      setAuthLoading(false);
    }
  };

  const onPressVerify = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await fetch("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        Alert.alert("Account Created", "Your account was created and verified successfully.");
        router.replace("/home");
      } else {
        Alert.alert("Verification Failed", "Please try again.");
      }
    } catch (error: any) {
      Alert.alert("Verification Error", error.errors[0]?.longMessage || "An error occurred");
    }
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
            <View style={{ width: "100%", height: 250, position: "relative" }}>
              <Image source={require("../assets/images/signup-car.png")} style={{ width: "100%", height: 250 }} />
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

            <View style={{ padding: 20 }}>
              <InputField
                label="Name"
                placeholder="Enter name"
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Email"
                placeholder="Enter email"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                rightIcon={showPassword ? "eye-off" : "eye"}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />

              <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert("Google Sign-In", "Not implemented yet.")}>
                <Text style={styles.googleText}>Sign Up with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }} onPress={() => router.push("/login")}>
                <Text style={{ color: "#333", marginRight: 5 }}>Already have an account?</Text>
                <Text style={{ color: "#007BFF", fontWeight: "bold" }}>Log in</Text>
              </TouchableOpacity>
            </View>

            {/* Email Verification Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showVerificationModal}
              onRequestClose={() => setShowVerificationModal(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Verify Your Email</Text>
                  <Text>We've sent a verification code to your email.</Text>
                  <InputField
                    label="Verification Code"
                    placeholder="Enter code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                  />
                  <TouchableOpacity style={styles.button} onPress={onPressVerify}>
                    <Text style={styles.buttonText}>Verify</Text>
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
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
    backgroundColor: "#E2E8F0",
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    color: "#A0AEC0",
    fontWeight: "bold",
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SignUp;
