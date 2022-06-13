import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const Header = (props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor: props.color ? props.color : '#bdc3c7'}]}>
      {props.menuBtn ? 
        <IconButton
          icon="menu"
          size={35}
          color={props.dark ? '#fff' : '#000'}
          onPress={() => navigation.toggleDrawer()}
        /> : null}
      {props.backBtn ? 
        <IconButton
          icon="arrow-left"
          size={35}
          color={props.dark ? '#fff' : '#000'}
          onPress={() => navigation.goBack()}
        /> : null}
      <Text style={props.dark ? styles.darkTitle : styles.title}>{props.title ? props.title : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bdc3c7',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
  },
  darkTitle: {
    fontSize: 20,
    marginLeft: 5,
    color: '#fff',
  },
})

export default Header;