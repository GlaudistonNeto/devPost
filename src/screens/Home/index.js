import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { Container, ButtonPost } from './styles';

export default function Home() {
  const navigation = useNavigation();
  
 return (
   <Container>
     <ButtonPost onPress={() => navigation.navigate('NewPost')}>
      <Feather
        name="edit-2"
        color="#fff"
        size={25}
      />
     </ButtonPost>
   </Container>
  );
};
