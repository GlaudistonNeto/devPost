import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import { Container, ButtonPost, ListPosts } from './styles';
import { Text } from 'react-native';

export default function Home() {
  const navigation = useNavigation();
  const [posts, setposts] = useState([
    {id: '01', name: 'user1', },
    {id: '02', name: 'user2', },
    {id: '03', name: 'user3', },
  ]);
  
 return (
   <Container>
    <Header />

    <ListPosts
      data={posts}
      renderItem={(item) => (<Text>Test</Text>)}
    />

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
