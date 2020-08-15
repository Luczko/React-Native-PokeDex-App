import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import {fetchPokemonDetails} from '../apiService';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

const AbortController = window.AbortController;

export const ListItem = props => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${props.name}`,
  );
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setIsLoading(true);
      const pokemonDetails = await AsyncStorage.getItem(
        `@pokeDex_details_${props.name}`,
      );
      if (pokemonDetails == null) {
        const response = await fetchPokemonDetails(props.url, signal);
        setDetailsSource(response);
      }
      setDetails(detailsSource);
      setIsLoading(false);

      return () => controller.abort();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsSource]);

  const isActive = !isLoading && details != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>No: {details.id}</Text>
        <Image
          source={{
            uri: details.sprites.front_default,
          }}
          style={styles.image}
        />
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Details', {
          name: props.name,
        })
      }
      disabled={!isActive}
      key={props.index}
      style={[
        styles.itemContainer,
        props.isRefreshing && styles.disableItemContainer,
      ]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '100',
    color: 'white',
    textTransform: 'capitalize',
  },

  itemContainer: {
    padding: 5,
    margin: 5,
    width: 130,
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    backgroundColor: 'white',
    // backgroundColor: '#9ACD32',
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
});
