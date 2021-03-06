import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Profile() {
  const { signOut } = useContext(AuthContext);
 return (
   <View>
     <Text>User Profile</Text>
     <Button title='Log Out' onPress={() => signOut()}/>
   </View>
  );
};
