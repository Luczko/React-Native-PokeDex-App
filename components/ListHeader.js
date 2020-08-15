import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export const ListHeader = props => {
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textInput}
        placeholder="search"
        onChangeText={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#00BFFF',
    padding: 20,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#E0FFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});
