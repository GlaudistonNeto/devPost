import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from  '../../config/firebaseConfig';
import PostsList from '../../components/PostsList';

import { AuthContext } from '../../contexts/auth'

import { ActivityIndicator, Text, View } from 'react-native';
import { Container, ListPosts } from './styles';

export default function PostsUser({ route }) {
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params.title);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    });
    
  }, [navigation, title]);

  useEffect(() => {
    const subscriber = firebase.firestore().collection('posts')
      .where('userId', '==',  route.params.userId)
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        const postList = [];

        snapshot.forEach(doc => {
          postList.push({
            ...doc.data(),
            id: doc.id
          });
        });

        setPosts(postList);
        setLoading(false);
      })
      return () => subscriber();

  }, []);

 return (
   <Container>
     {
       loading ?
       (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={50} color="#e52246" />
         </View>
       ) :
       (
         <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <PostsList data={item} userId={user.uid} />}
         />
       )
     }
   </Container>
  );
};
