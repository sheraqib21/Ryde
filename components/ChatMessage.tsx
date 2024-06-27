import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
export type Message = {
  role: string;
  content: string;
  prompt: string;
  imageUrl: string;
};
const ChatMessage = ({ role, content, prompt, imageUrl }: Message) => {
  return (
    <View>
      <View style={[styles.messageContainer]}>
        <Image
          source={require("../assets/images/chatgptLight.png")}
          style={{
            width: 20,
            height: 20,
            backgroundColor: "#000",
            margin: 2,
            borderRadius: 26,
          }}
        />
        <Text style={{ flexWrap: "wrap", flex: 1, paddingRight: 1 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui dolorum
          dignissimos perspiciatis quibusdam nihil amet. Ad totam hic distinctio
          unde debitis, quia quasi iusto voluptas similique impedit excepturi
          corrupti nesciunt?
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 4,
  },
});
