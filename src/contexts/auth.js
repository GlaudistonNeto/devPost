import { firestore } from 'firebase';
import React, { createContext, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import firebase from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

LogBox.ignoreAllLogs();

function authProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('devPost');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, [])

  async function signIn(email, password) {
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;
      const userProfile = await firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        name: userProfile.data().name,
        email: value.user.email
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
    })
    .catch((error) => {
      alert(error);
      setLoadingAuth(false);
    })
  };

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firestore().collection('users')
        .doc(uid).set({
          name: name
        })
        .then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email
          };
          
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
        })
      })
      .catch((error) => {
        alert(error);
        setLoadingAuth(false);
      });
  };

  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then(() => {
      setUser(null);
    })
    .catch((error) => {
      alert(error);
    });
  };

  async function storageUser(data) {
    await AsyncStorage.setItem('devPost', JSON.stringify(data));
    
  };

 return (
   <AuthContext.Provider value={{
      signed: !!user, user, signUp, signIn, signOut, loadingAuth, loading
     }}>
     {children}
   </AuthContext.Provider>
  );
};

export default authProvider;
