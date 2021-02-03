import React, { useContext, useState } from 'react';
import { Text, ActivityIndicator, LogBox } from 'react-native';
import {
   Container,
   Title,
   Input,
   Button,
   ButtonText,
   SignUpButton,
   SignUpText,
} from './styles';

import { AuthContext } from '../../contexts/auth';

LogBox.ignoreAllLogs();

export default function SignInUp() {
  const { signIn, signUp, loadingAuth } = useContext(AuthContext);

  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin(){
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  function handleLogin(){
    if(email === '' || password === ''){
      console.log('Preencha todos os campos!');
      return;
    }

    signIn(email, password);
  }

  function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      console.log('Preencha todos os campos!');
      return;  
    }

    signUp(email, password, name);
  }


  if(login){
    return(
    <Container>
      <Title>
        Dev 
        <Text style={{ color: '#e52246' }}>Post</Text>
      </Title>

      <Input
      placeholder="email@email.com"
      value={email}
      onChangeText={ (text) => setEmail(text) }
      />
      <Input
      placeholder="******"
      secureTextEntry={true}
      value={password}
      onChangeText={ (text) => setPassword(text) }
      />

      <Button onPress={handleLogin}>
        {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <ButtonText>Acess</ButtonText>
          )
        }
      </Button>

      <SignUpButton onPress={ () => toggleLogin() }>
        <SignUpText>Create an account.</SignUpText>
      </SignUpButton>
    </Container> 
    )
  }

 return (
  <Container>
    <Title>Dev<Text style={{ color: '#e52246' }}>Post</Text>
    </Title>

    <Input
      placeholder="Name"
      value={name}
      onChangeText={(text) => setName(text)}
    />
    <Input
      placeholder="mail@mail.com"
      value={email}
      onChangeText={ (text) => setEmail(text) }
    />
    <Input
      placeholder="******"
      secureTextEntry={true}
      value={password}
      onChangeText={ (text) => setPassword(text) }
    />

    <Button onPress={handleSignUp}>
      {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <ButtonText>Register</ButtonText>
          )
      }
    </Button>

    <SignUpButton onPress={ () => toggleLogin() }>
      <SignUpText>I already have an account.</SignUpText>
    </SignUpButton>
  </Container> 
  );
};
