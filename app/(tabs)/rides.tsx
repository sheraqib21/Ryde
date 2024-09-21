import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

const Rides = () => {
  const { user } = useUser();

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  style={{ width: 160, height: 160 }} // Adjusting size as per your previous className
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 12 }}>No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <Text style={{ fontSize: 24, fontFamily: 'JakartaBold', marginVertical: 20 }}>
            All Rides
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
