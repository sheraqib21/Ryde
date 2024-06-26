import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import drawer, { Drawer } from "expo-router/drawer";
import Colors from "@/constants/Colors";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, Link } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
const DrawerContent = (props: any) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View
        style={{
          backgroundColor: Colors.input,
          marginHorizontal: 10,
          borderRadius: 5,
          padding: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Ionicons
          style={{ padding: 3 }}
          name="search-outline"
          size={18}
          color={Colors.greyLight}
        />
        <TextInput
          placeholder="Search"
          style={{ flex: 1 }}
          underlineColorAndroid={"transparent"}
        />
      </View>
      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0 }}
        {...props}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={{
          padding: 16,
          marginBottom: bottom,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../../assets/images/avatar.png")}
            style={{
              height: 40,
              width: 40,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Haseeb Ullah Tarkai
          </Text>
        </View>
        <Link href={"/(auth)/(modal)/settings"} asChild>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
const Layout = () => {
  const Navigation = useNavigation();
  const Dimensions = useWindowDimensions();
  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                Navigation.dispatch(DrawerActions.toggleDrawer);
              }}
              style={{ marginLeft: 16 }}
            >
              <FontAwesome6 name="grip-lines" color={Colors.grey} size={20} />
            </TouchableOpacity>
          );
        },
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        drawerLabelStyle: {
          marginLeft: -18,
        },
        drawerStyle: {
          width: Dimensions.width * 0.86,
        },
        drawerItemStyle: {
          borderRadius: 10,
        },
      }}
    >
      <Drawer.Screen
        name="(chat)/newChat"
        options={{
          headerTitleAlign: "center",
          title: "New ChatGpt",
          drawerIcon: () => {
            return (
              <View>
                <Image
                  source={require("../../../assets/images/chatgpt.png")}
                  style={[styles.image]}
                />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                style={{
                  backgroundColor: Colors.light,
                  marginRight: 15,
                  borderRadius: 15,
                }}
              >
                <TouchableOpacity>
                  <Ionicons name="search-outline" style={[styles.icon]} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name="dalle"
        options={{
          headerTitleAlign: "center",
          title: "Dall-E",
          drawerIcon: () => {
            return (
              <View>
                <Image
                  source={require("../../../assets/images/dalle.webp")}
                  style={[styles.image]}
                />
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          title: "Explore",
          headerTitleAlign: "center",
          drawerIcon: () => {
            return (
              <View
                style={{
                  backgroundColor: Colors.light,
                  padding: 3,
                  borderRadius: 15,
                }}
              >
                <Ionicons name="apps-outline" style={[styles.icon]} />
              </View>
            );
          },
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  image: { height: 20, width: 20 },
  icon: { fontSize: 18 },
});
export default Layout;
