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
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setEmail('');
    setPassword('');
    setName('');
  };

  function handleSignIn() {
    if (email === '' || password === '') {
      alert('Fill in all fields');
    };
    
    signIn(email, password);
  };
    

  function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      alert('Fill in all fields');
    };

    signUp(name, email, password);
  };

  if(login) {
    return(
      <Container>
        <Title>Be
        <Text style={{ color: "#000" }}>Grato</Text></Title>

        <Input
          placeholder="mail@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="******"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={handleSignIn}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#ff6666" />
            ) : (
              <ButtonText>Login</ButtonText>
            )
          }
        </Button>

        <SignUpButton onPress={() => toggleLogin()}>
          <SignUpText>Create your account</SignUpText>
        </SignUpButton>
      </Container>
    );
  };
 return (
    <Container>
      <Title>Dev<Text style={{ color: "#000" }}>Post</Text></Title>

      <Input
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="mail@mail.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="******"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <Button onPress={handleSignUp}>
      {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#ff6666" />
            ) : (
              <ButtonText>SignUp</ButtonText>
            )
          }
      </Button>

      <SignUpButton onPress={() => toggleLogin()}>
        <SignUpText>Login</SignUpText>
      </SignUpButton>
    </Container>
  );
};
