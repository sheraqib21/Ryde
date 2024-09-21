import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';  // For icons like edit and verified

const Profile = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.primaryPhoneNumber?.phoneNumber || "");
    const [profileImage, setProfileImage] = useState(user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        // Save the updated user information here
        console.log({ firstName, lastName, phoneNumber, profileImage });
        // Add logic to update the user profile via your backend or API
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Your Profile</Text>

                <View style={styles.profileImageContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    {/* First Name */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="First name"
                        />
                        <TouchableOpacity style={styles.editIcon}>
                            <FontAwesome name="edit" size={20} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    {/* Last Name */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last name"
                        />
                        <TouchableOpacity style={styles.editIcon}>
                            <FontAwesome name="edit" size={20} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={user?.primaryEmailAddress?.emailAddress || "Not Found"}
                            editable={false}
                            placeholder="Email"
                        />
                        <TouchableOpacity style={styles.editIcon}>
                            <FontAwesome name="edit" size={20} color="#ccc" />
                        </TouchableOpacity>
                    </View>

                    {/* Email Status */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.verifiedText}>✓ Verified</Text>
                    </View>

                    {/* Phone Number */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Phone"
                        />
                        <TouchableOpacity style={styles.editIcon}>
                            <FontAwesome name="edit" size={20} color="#ccc" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "left",
        color: "#333",
    },
    profileImageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    profileImage: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "#fff",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    infoContainer: {
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    editIcon: {
        marginLeft: 10,
    },
    verifiedText: {
        color: "#22c55e",
        fontSize: 14,
        backgroundColor: "#e6f9ec",
        padding: 8,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: "#10b981",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Profile;
