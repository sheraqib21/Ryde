import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useAuth, useSignIn, useSignUp, useSession } from "@clerk/clerk-expo";

const Login = () => {
  const { type } = useLocalSearchParams<{ type?: string }>(); // type can be 'login' or 'signup'
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState("ihaseebullahtarakai@gmail.com");
  const [password, setPassword] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: setSignUpActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const { session } = useSession();
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(false);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Check if session is active (user is already logged in)
  useEffect(() => {
    if (isSignedIn && session) {
      router.replace("/(auth)/(drawer)/(chat)/(new)/"); // Replace with the target screen
    }
  }, [isSignedIn, session]);

  // Signup handler
  const onSignUp = async () => {
    setAuthLoading(true);

    // Validate email format before signup
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      setAuthLoading(false);
      return;
    }

    if (!signUpLoaded) {
      Alert.alert("SignUp process is not ready.");
      setAuthLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await signUp.create({
        emailAddress: email.trim(),
        password: password,
      });
      setSignUpActive({ session: result.createdSessionId });

      // Show success modal on account creation
      setSuccessModalVisible(true);
    } catch (error: any) {
      Alert.alert("Signup Error", error.errors[0]?.longMessage || "An error occurred");
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  // Login handler
  const onLogin = async () => {
    setAuthLoading(true);

    // Validate email format before login
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      setAuthLoading(false);
      return;
    }

    if (!signInLoaded) {
      Alert.alert("Login process is not ready.");
      setAuthLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });
      setActive({ session: result.createdSessionId });
      router.replace("/(auth)/(drawer)/(chat)/newChat/"); // Navigate to the chat screen after login
    } catch (error: any) {
      Alert.alert("Login Error", error.errors[0]?.longMessage || "An error occurred");
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <>
      {authLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <View style={[styles.container, { paddingTop: top }]}>
          {loading ? (
            <View style={defaultStyles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <View>
              <Image
                style={styles.logo}
                source={require("../assets/images/chatgpt.png")}
              />
              <Text style={styles.title}>
                {type === "login" ? "Welcome Back" : "Create an Account"}
              </Text>
              <View style={styles.form}>
                <TextInput
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  placeholder="Email Address"
                  style={styles.inputField}
                  value={email}
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
                  <Text style={styles.btnText}>
                    {type === "login" ? "Login" : "Create Account"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Success Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => setSuccessModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Account Created Successfully!</Text>
                    <TouchableOpacity
                      style={[styles.btn, styles.modalButton]}
                      onPress={() => {
                        setSuccessModalVisible(false);
                        router.replace("/(auth)/(drawer)/(chat)/newChat/"); // Navigate after closing modal
                      }}
                    >
                      <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
      )}
    </>
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
    padding: 10,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
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
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    marginTop: 10,
    width: 100,
  },
});
