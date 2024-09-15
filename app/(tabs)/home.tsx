import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import { useLocationStore } from '@/store';
import { SignedIn, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';//#F3F4F9
import * as Location from 'expo-location';

const recentRides = [
  {
    "ride_id": "1",
    "origin_address": "Kathmandu, Nepal",
    "destination_address": "Pokhara, Nepal",
    "origin_latitude": "27.717245",
    "origin_longitude": "85.323961",
    "destination_latitude": "28.209583",
    "destination_longitude": "83.985567",
    "ride_time": 391,
    "fare_price": "19500.00",
    "payment_status": "paid",
    "driver_id": 2,
    "user_id": "1",
    "created_at": "2024-08-12 05:19:20.620007",
    "driver": {
      "driver_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"
    }
  },
  {
    "ride_id": "2",
    "origin_address": "Jalkot, MH",
    "destination_address": "Pune, Maharashtra, India",
    "origin_latitude": "18.609116",
    "origin_longitude": "77.165873",
    "destination_latitude": "18.520430",
    "destination_longitude": "73.856744",
    "ride_time": 491,
    "fare_price": "24500.00",
    "payment_status": "paid",
    "driver_id": 1,
    "user_id": "1",
    "created_at": "2024-08-12 06:12:17.683046",
    "driver": {
      "driver_id": "1",
      "first_name": "James",
      "last_name": "Wilson",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
    }
  },
  {
    "ride_id": "3",
    "origin_address": "Zagreb, Croatia",
    "destination_address": "Rijeka, Croatia",
    "origin_latitude": "45.815011",
    "origin_longitude": "15.981919",
    "destination_latitude": "45.327063",
    "destination_longitude": "14.442176",
    "ride_time": 124,
    "fare_price": "6200.00",
    "payment_status": "paid",
    "driver_id": 1,
    "user_id": "1",
    "created_at": "2024-08-12 08:49:01.809053",
    "driver": {
      "driver_id": "1",
      "first_name": "James",
      "last_name": "Wilson",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
    }
  },
  {
    "ride_id": "4",
    "origin_address": "Okayama, Japan",
    "destination_address": "Osaka, Japan",
    "origin_latitude": "34.655531",
    "origin_longitude": "133.919795",
    "destination_latitude": "34.693725",
    "destination_longitude": "135.502254",
    "ride_time": 159,
    "fare_price": "7900.00",
    "payment_status": "paid",
    "driver_id": 3,
    "user_id": "1",
    "created_at": "2024-08-12 18:43:54.297838",
    "driver": {
      "driver_id": "3",
      "first_name": "Michael",
      "last_name": "Johnson",
      "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.70"
    }
  }
]

export default function Home() {
  // Invoke the useUser hook to get the user data
  const {setUserLocation,setDestinationLocation} = useLocationStore();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [hasPermissions,setHasPermissions] = useState(false);
  const handleSignOut = () => {
    // Implement your sign out logic here
  };
  const handleDestinationPress = () => {
    // Implement your destination press logic here
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F9' }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={recentRides}
          keyExtractor={(item) => item.ride_id}
          renderItem={({ item }) => <RideCard ride={item} icons={icons} />}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 90 : 90,
            paddingHorizontal: 16, // Add horizontal padding
          }}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {!loading ? (
                <>
                  <Image
                    source={images.noResult}
                    style={{ width: 160, height: 160 }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 14 }}>No recent rides found</Text>
                </>
              ) : (
                <ActivityIndicator size="small" color="#000" />
              )}
            </View>
          )}
          ListHeaderComponent={
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  Welcome {user?.firstName}👋
                </Text>
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 20, backgroundColor: 'white' }}
                >
                  <Image source={icons.out} style={{ width: 16, height: 16 }} />
                </TouchableOpacity>
              </View>
              <GoogleTextInput
              
                icon={icons.search}
                containerStyle={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
                handlePress={handleDestinationPress}
              />
              <View style={{ marginBottom: 10 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginTop: 15,
                  marginBottom: 15,
                  
                }}>Your current location</Text>
                <Map/>
               <Text style={{fontSize:16,fontWeight:'bold',marginTop:8}}>Recent Rides</Text>
              </View>
            </>
          }
        />
      </View>
      {Platform.OS === 'ios' && <View style={{ height: 34, backgroundColor: '#F3F4F9' }} />}
    </SafeAreaView>
  );
}


