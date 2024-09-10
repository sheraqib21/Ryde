import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity
        onPress={() => {
          router.replace("/login");
        }}
        style={{ width: '100%', alignItems: 'flex-end', padding: 20 }}
      >
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={{ width: 32, height: 4, marginHorizontal: 4, backgroundColor: '#E2E8F0', borderRadius: 2 }} />}
        activeDot={<View style={{ width: 32, height: 4, marginHorizontal: 4, backgroundColor: '#0286FF', borderRadius: 2 }} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image
              source={item.image}
              style={{ width: '100%', height: 300 }}
              resizeMode="contain"
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20 }}>
              <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginHorizontal: 20 }}>
                {item.title}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', color: '#858585', marginHorizontal: 20, marginTop: 10 }}>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/login")
            : swiperRef.current?.scrollBy(1)
        }
        style={{ width: '90%', marginTop: 20, marginBottom: 20, alignSelf: 'center' }}
      />
    </SafeAreaView>
  );
};

export default Home;