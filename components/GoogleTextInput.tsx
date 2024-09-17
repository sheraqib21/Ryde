import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, AppState } from "react-native";
import axios from 'axios';

const geoapifyApiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

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

  useEffect(() => {
    const clearSuggestions = () => {
      setSuggestions([]);
      setShowSuggestions(false);
    };

    clearSuggestions();
    
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        clearSuggestions();
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  // New effect to handle empty input
  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const fetchSuggestions = async (text) => {
    if (text.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
        params: {
          text: text,
          apiKey: geoapifyApiKey,
        },
      });
      setSuggestions(response.data.features);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions from Geoapify:", error);
    }
  };

  const handleInputChange = (text) => {
    setInput(text);
    if (text.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      fetchSuggestions(text);
    }
  };

  const handlePressOutside = () => {
    setShowSuggestions(false);
    setSuggestions([]);
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
            onFocus={() => {
              if (input.trim() !== '') {
                setShowSuggestions(true);
              }
            }}
          />
          {icon && (
            <View style={styles.iconContainer}>
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            </View>
          )}
        </View>

        {showSuggestions && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.properties.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  setInput(item.properties.formatted);
                  handlePress({
                    latitude: item.geometry.coordinates[1],
                    longitude: item.geometry.coordinates[0],
                    address: item.properties.formatted,
                  });
                  setSuggestions([]);
                  setShowSuggestions(false);
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