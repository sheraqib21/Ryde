import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { useEffect } from "react";
//Clerk's JWT kinda thing default code!
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
//Expo Router default setting for the splash screen!
SplashScreen.preventAutoHideAsync();
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const Router = useRouter();
  const segments = useSegments();
  //Expo router trying to navigate any errors in the navigation tree default code!!!
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === "(auth)";
    console.log(inAuthGroup + " isSignedIn: " + isSignedIn);
    if (inAuthGroup && !isSignedIn) {
      Router.replace("/");
    } else if (!inAuthGroup && isSignedIn) {
      Router.replace("/(tabs)/home");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#000"} />
      </View>
    );

  }

  //Clerk setup from now on
   return (
    <Stack initialRouteName="welcome">
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          presentation: 'modal',
          headerShown: Platform.OS === 'android' ? false : true,
          title: '',
          headerLeft: () => {
            return (
              <TouchableOpacity>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }} // This hides the header on SignUp screen
      />
      <Stack.Screen name="(root)/find-ride" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(root)/confirm-ride" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/book-ride" options={{ headerShown: false }} /> */}
      <Slot />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
