import React from 'react'
import { Redirect } from 'expo-router';
import auth from './utils/auth';

const index = () => {
  return <Redirect href="/hero" />
}

export default index;