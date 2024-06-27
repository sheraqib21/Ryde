import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
export type MessageProps = {
  onSend: (message: string) => void;
};
const MessageInput = ({ onSend }: MessageProps) => {
  const { bottom } = useSafeAreaInsets();
  const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  const [message, setMessage] = useState("");
  const expand = () => {
    console.log("expand");
  };
  return (
    <BlurView
      tint="extraLight"
      style={{ paddingBottom: bottom, paddingTop: 0 }}
      intensity={100}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 3,
          padding: 12,
          alignItems: "center",
        }}
      >
        {/* <Ionicons name="camera" size={20} />
        <Ionicons name="document" size={20} />
        <Ionicons name="mic" size={20} /> */}
        <ATouchableOpacity onPress={expand} style={[styles.roundButton]}>
          <Ionicons name="add" size={20} />
        </ATouchableOpacity>
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={setMessage}
            style={[styles.input]}
            autoFocus
            placeholder=" Message"
          />
        </View>
        <ATouchableOpacity>
          {message === "" ? (
            <FontAwesome5 name={"headphones"} size={20} />
          ) : (
            <Ionicons name={"send"} size={20} />
          )}
        </ATouchableOpacity>
      </View>
    </BlurView>
  );
};
const styles = StyleSheet.create({
  roundButton: {
    borderRadius: 15,
    backgroundColor: Colors.input,
    padding: 2,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
export default MessageInput;
