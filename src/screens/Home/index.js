import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../config/firebaseConfig';


import { Feather } from '@expo/vector-icons';

import { Container, ButtonPost, ListPosts } from './styles';
import Header from '../../components/Header';
import PostsList from '../../components/PostsList';

export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        const postList = [];

        snapshot.forEach(doc => {
          postList.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setPosts(postList);
        setLoading(false);
      })

      return () => subscriber();
  }, []);
  
 return (
   <Container>
    <Header />
    {
      loading ?
      (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size={50} color='#e52246'
          />
        </View>
      ) :
      (
        <ListPosts
          showVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <PostsList data={item} userId={ user.uid } />}
        />
      )
    }

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
