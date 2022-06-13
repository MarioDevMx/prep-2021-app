/*
 * Here we could define an axios instance for set our environment,
 * add headers, base url and timeout, for example.
 */
import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://api.mezda.com.mx/api/';
// export const PROFILE_IMG_BASE_PATH = BASE_URL + 'user-logo/';

/*
 * Instance with auth headers and response interceptors
 */
export const http = axios.create({
  baseURL: BASE_URL, // TODO change this constant to production
  timeout: 1000, // ! Ensure this timeout it's okay
});

http.interceptors.request.use(
  async (config) => {
    // const token = JSON.parse(await AsyncStorage.getItem('token'));
    config.headers.Authorization = 'Bearer ' + '|*;ltpr@bjFH6855PtC]EdMdA0S@.*|';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.request.use(
  function (config) {
    console.debug('sending request: ', config);
    console.debug('headers: ', config.headers);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

/*
 * This interceptor add logic for handle errors
 */
http.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      // your failure logic
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/*
 * Instance without auth credentials, for public purposes
 */
// export const axiosPublicInstance = axios.create({
//   baseURL: BASE_URL, // TODO change this constant to production
//   timeout: 1000, // ! Ensure this timeout it's okay
// });

// axiosPublicInstance.interceptors.response.use(
//   function (response) {
//     console.debug('here on interceptor: ', response);
//     return response.data;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );
