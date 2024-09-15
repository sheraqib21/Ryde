import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import axios from 'axios';

const geoapifyApiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY; // Replace with your Geoapify API Key

const GeoapifyAutocomplete = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions from Geoapify API
  const fetchSuggestions = async (text) => {
    if (text.trim() === '') {
      // Don't fetch suggestions if input is empty
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
        params: {
          text: text,
          apiKey: geoapifyApiKey,
        },
      });
      setSuggestions(response.data.features);
      setShowSuggestions(true); // Show suggestions
    } catch (error) {
      console.error("Error fetching suggestions from Geoapify:", error);
    }
  };

  const handleInputChange = (text) => {
    setInput(text);
    fetchSuggestions(text);
  };

  const handlePressOutside = () => {
    setShowSuggestions(false); // Hide suggestions when clicking outside
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: textInputBackgroundColor || 'white' },
            ]}
            placeholder={initialLocation || "Where do you want to go?"}
            placeholderTextColor="gray"
            value={input}
            onChangeText={handleInputChange}
            onFocus={() => setShowSuggestions(input.trim() !== '')} // Show suggestions when input is focused
          />
          {icon && (
            <View style={styles.iconContainer}>
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            </View>
          )}
        </View>

        {/* Render Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.properties.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  setInput(item.properties.formatted); // Update input with the selected place
                  handlePress({
                    latitude: item.geometry.coordinates[1],
                    longitude: item.geometry.coordinates[0],
                    address: item.properties.formatted,
                  });
                  setSuggestions([]); // Clear suggestions
                  setShowSuggestions(false); // Hide suggestions
                }}
              >
                <Text>{item.properties.formatted}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 40,
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
    top: 13,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  suggestionsContainer: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default GeoapifyAutocomplete;
