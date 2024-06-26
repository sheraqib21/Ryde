import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const index = () => {
  const {signOut}=useAuth()
  return (
    <View>
      <Text>index</Text>
      <Button onPress={()=>signOut()} title='Signout'/>
    </View>
  )
}

export default index