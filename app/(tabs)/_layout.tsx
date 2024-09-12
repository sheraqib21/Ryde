import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: focused ? 'transparent' : '',
    }}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: focused ? '#00C853' : '#333333', // Green when focused, gray when not
      }}
    >
      <Image
        source={source}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? 'white' : '#fff',
        }}
        resizeMode="contain"
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
  initialRouteName="home"
  screenOptions={{
    headerShown: false, // Hides the header for all tabs
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "white",
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: "#333333",
      borderRadius: 50,
      paddingBottom: 0,
      overflow: "hidden",
      marginHorizontal: 20,
      marginBottom: 20,
      height: 78,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      position: "absolute",
    },
  }}
>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false, // Hide the header for the home screen
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}