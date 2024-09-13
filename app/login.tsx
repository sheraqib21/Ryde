import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputField from '@/components/InputField';
import { useRouter } from 'expo-router';
import { useSignIn, useAuth } from '@clerk/clerk-expo';

const Login = () => {
  const [form, setForm] = useState({
    emailAddress: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const onLoginPress = async () => {
    if (!validateEmail(form.emailAddress)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(form.password)) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
      return;
    }

    setAuthLoading(true);
    try {
      if (isSignedIn) {
        Alert.alert(
          'Account Already Signed In',
          'You are already signed in to an account. Do you want to sign out and sign in with the new account?',
          [
            {
              text: 'Cancel',
              onPress: () => setAuthLoading(false),
              style: 'cancel',
            },
            {
              text: 'Sign Out & Sign In',
              onPress: async () => {
                await signOut();
                await performSignIn();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        await performSignIn();
      }
    } catch (error) {
      console.error('Login Error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      Alert.alert('Login Error', error.message || 'An error occurred. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const performSignIn = async () => {
    const completeSignIn = await signIn.create({
      identifier: form.emailAddress.trim(),
      password: form.password,
    });

    if (completeSignIn.status === 'complete') {
      await setActive({ session: completeSignIn.createdSessionId });
      Alert.alert('Login Successful', 'You have successfully logged in.');
      router.replace('/home');
    } else {
      console.log('Additional steps needed:', completeSignIn.status);
      // Handle additional steps if needed
    }
  };

  const onGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    Alert.alert('Google Sign-In', 'Google Sign-In functionality not implemented yet.');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {authLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
        ) : (
          <View>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/images/signup-car.png')} style={styles.image} />
              <Text style={styles.welcomeText}>Welcome Back</Text>
            </View>

            <View style={styles.formContainer}>
              <InputField
                label="Email"
                placeholder="Enter email"
                value={form.emailAddress}
                onChangeText={(value) => setForm({ ...form, emailAddress: value })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                rightIcon={showPassword ? 'eye-off' : 'eye'}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />

              <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.line} />
              </View>

              <TouchableOpacity style={styles.googleButton} onPress={onGoogleSignIn}>
                <Text style={styles.googleText}>Log In with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signUpContainer} onPress={() => router.push('/SignUp')}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  welcomeText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#E2E8F0',
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    color: '#A0AEC0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#333',
    marginRight: 5,
  },
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Login;