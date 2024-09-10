import { useEffect } from "react";
import { useRouter } from "expo-router";
import React from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // We can add a slight delay to ensure the layout has fully mounted before navigation.
    const timeout = setTimeout(() => {
      router.replace("/welcome"); // Navigate to the welcome screen
    }, 100); // Adding a slight delay of 100ms

    return () => clearTimeout(timeout); // Cleanup timeout when component unmounts
  }, []);

  return null; // Render nothing, as we're only using this for redirection
};

export default Index;
