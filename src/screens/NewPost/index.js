import React, { useContext, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import firebase from '../../config/firebaseConfig';
import { AuthContext } from '../../contexts/auth';

import { Container, Input, Button, ButtonText } from './styles'

export default function NewPost() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Share</ButtonText>
        </Button>
      )
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      alert('Seu post contem conteúdo inválido');
      return; 
    };

    let avatarUrl = null;
    try {
      let response = await
        firebase.storage().ref('users').child(user?.uid).getDownloadURL();
        avatarUrl = response;
    } catch(err) {
      avatarUrl = null;
    };

    await firebase.firestore().collection('posts')
      .add({
        created: new Date(),
        content: post,
        author: user.name,
        likes: 0,
        avatarUrl,
        userId: user.uid,
      })
      .then(() => {
        alert('post Successful!');
      })
      .catch((error) => {
        console.log(error);
      });

      navigation.goBack();
  };

 return (
   <Container>
       <Input
         placeholder="What's going on?"
         placeholderTextColor="#DDD"
         multiline={true}
         maxlength={500}
         value={post}
         onChangeText={(text) => setPost(text)}
         autoCorrect={false}
       />
   </Container>
  );
};
