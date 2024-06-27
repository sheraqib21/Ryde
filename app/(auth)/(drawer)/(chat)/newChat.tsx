import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import MessageInput from "@/components/MessageInput";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import ChatMessage from "@/components/ChatMessage";

const reccomendations = [
  {
    topic: "Training your Dragon",
    message: "Write an essay on how to train a dragon",
  },
  {
    topic: "Grandma Birthday",
    message: "Write a poem for my grandma birthday",
  },
  {
    topic: "Letter to cousin",
    message: "Write a letter to my cousin why i coudlnt come to his marriage",
  },
];
const newChat = () => {
  const { width } = useWindowDimensions();
  const getCompletion = (message: string) => {
    console.log(message);
  };
  const chats = [
  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={[styles.logoContainer]}>
          <Image
            source={require("../../../../assets/images/chatgptLight.png")}
            style={[
              styles.logo,
              { display: chats.length > 0 ? "none" : "flex" },
            ]}
          />
        </View>
        <FlatList
          data={chats}
          renderItem={({ item }) => {
            return <ChatMessage key={item.content} {...item} />;
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={reccomendations}
          renderItem={({ item }) => {
            return (
              <View style={[styles.card, { maxWidth: width * 0.55 }]}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: Colors.grey,
                  }}
                >
                  {item.topic}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "400",
                    color: Colors.grey,
                  }}
                >
                  {item.message.substring(0, 50)}...
                </Text>
              </View>
            );
          }}
        />
        <MessageInput onShouldSend={getCompletion} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  logo: { width: 50, height: 50, backgroundColor: "#000", borderRadius: 26 },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
export default newChat;
