import React from 'react';
import firebase from '../../config/firebaseConfig';

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { formatDistance } from 'date-fns';
import { enCA } from 'date-fns/locale';
import {
  Container,
  Header,
  Avatar,
  Name,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost
} from './styles';

export default function PostsList({ data, userId }) {

  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: enCA
      }
    )
  };

  async function likePost(id, likes) {
    const docId = `${userId}_${id}`;

    const doc = await firebase.firestore().collection('likes')
      .doc(docId).get();

    if (doc.exists) {
      await firebase.firestore().collection('posts')
        .doc(id).update({
          likes: likes - 1
        });

        await firebase.firestore().collection('likes')
          .doc(docId).delete();
          return;
    };

    await firebase.firestore().collection('likes')
      .doc(docId).set({
        postId: id,
        userId: userId,
      })

      await firebase.firestore().collection('posts')
        .doc(id).update({
          likes: likes + 1
        });
  };

 return (
   <Container>
     <Header>
     {
       data.avatarUrl ?
       (
     <Avatar
       source={{ uri: data.avatarUrl }}
     />
       ) : 
       (
        <Avatar
          source={require('../../assets/avatar.png')}
        />
       )
     }
     <Name>{data?.author}</Name>
     </Header>

     <ContentView>
      <Content>{data?.content}</Content>
     </ContentView>

     <Actions>
       <LikeButton onPress={() => likePost(data.id, data.likes)}>
         <Like>
          {data?.likes === 0 ? '' : data?.likes}
         </Like>
         <MaterialCommunityIcons
           name={data?.likes === 0 ? 'heart-plus-outline' : 'cards-heart'}
           size={20}
           color="#e52246"
         />
       </LikeButton>
       <TimePost>
         {formatTimePost()}
       </TimePost>
     </Actions>
   </Container>
  );
}
