import { SignedIn, useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  // Invoke the useUser hook to get the user data
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        {/* Check if the user exists and emailAddress array is present */}
        <Text>Hello {user?.emailAddresses?.[0]?.emailAddress || 'User'}</Text>
      </SignedIn>
    </SafeAreaView>
  );
}
