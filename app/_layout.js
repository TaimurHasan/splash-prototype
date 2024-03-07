import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './utils/auth';
import { AuthProvider } from './context/AuthContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
const _layout = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {/* <Stack screenOptions={{ headerShown: false }} /> */}
        <Slot />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})