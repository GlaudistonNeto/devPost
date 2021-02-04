import React, { useEffect, useState } from 'react';

import SearchList from '../../components/SearchList';
import firebase from '../../config/firebaseConfig';
import { Feather } from '@expo/vector-icons';

import { Container, AreaInput, Input, List } from './styles';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState('');

  useEffect(() => {
    if (input === ''|| input === undefined) {
      setUsers([]);
      return;
    }

    const subscriber = firebase.firestore().collection('users')
      .where('name', '>=', input)
      .where('name', '<=', input + '\uf8ff')
      .onSnapshot(snapshot => {
        const listsUsers= [];

        snapshot.forEach(doc => {
          listsUsers.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setUsers(listsUsers);
        console.log(listsUsers);
      });

      return () => subscriber();
  }, [input])
 return (
   <Container>
     <AreaInput>
      <Feather
        name="search"
        color="#e52246"
        size={20}
      />
      <Input
        placeholder="Looking for someone?"
        placeholderTextColor='#353840'
        value={input}
        onChangeText={(text) => setInput(text)}
      />
     </AreaInput>

     <List
       showsVerticalScrollIndicator={false}
       data={users}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => <SearchList data={item} />}
     />
   </Container>
  );
};
