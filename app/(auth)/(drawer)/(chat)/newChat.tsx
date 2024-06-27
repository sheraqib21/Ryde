import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import MessageInput from "@/components/MessageInput";
import { ScrollView } from "react-native-gesture-handler";

const newChat = () => {
  const getCompletion = (message: string) => {
    console.log(message);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {[...Array(100)].map((item, i) => {
          return <Text key={i * Math.random()}>{i}</Text>;
        })}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <MessageInput onSend={getCompletion} />
      </View>
    </View>
  );
};

export default newChat;
