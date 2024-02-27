import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import React from 'react'
import { Stack } from 'expo-router'

const client = new ApolloClient({
  uri: 'http://192.168.0.188:8000/graphql',
  cache: new InMemoryCache()
});

const _layout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack
          screenOptions={{
              headerShown: false,
          }}
      />
    </ApolloProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})