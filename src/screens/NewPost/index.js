import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Input, Button, ButtonText } from './styles'

export default function NewPost() {
  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => { alert('Test!') }}>
          <ButtonText>Share</ButtonText>
        </Button>
      )
    });
  }, []);

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
