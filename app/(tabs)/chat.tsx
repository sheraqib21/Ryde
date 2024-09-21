import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";

const Chat = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Chat</Text>
                <View style={styles.messageContainer}>
                    <Image
                        source={images.message}
                        style={styles.messageImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.noMessagesText}>
                        No Messages Yet
                    </Text>
                    <Text style={styles.descriptionText}>
                        Start a conversation with your friends and family
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: "JakartaBold",
    },
    messageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 'auto', // Use 'auto' instead of 'fit' for better responsiveness
    },
    messageImage: {
        width: '100%',
        height: 160, // Adjusted height for consistency
    },
    noMessagesText: {
        fontSize: 24,
        fontFamily: "JakartaBold",
        marginTop: 12,
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 8,
        textAlign: "center",
        paddingHorizontal: 28,
    },
});

export default Chat;
