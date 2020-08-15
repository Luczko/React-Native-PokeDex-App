import * as React from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';

import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );

  if (!detailsSource) return <ActivityIndicator />;
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{
  //           uri: detailsSource.sprites.front_default,
  //         }}
  //         syle={styles.image}
  //       />
  //       <Image
  //         source={{uri: detailsSource.sprites.front_default}}
  //         style={styles.image}
  //       />
  //       <Text>{name}</Text>

  //       {detailsSource.stats.map((item, index) => (
  //         <View key={index} style={styles.statsContainer}>
  //           <Text style={styles.statsText}>
  //             {item.stat.name.toUpperCase()}: {item.base_stat}
  //           </Text>
  //           <AnimatedBar value={item.base_stat} index={index} />
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };
  // //   return (
  // //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  // //       <Text>{name}</Text>
  // //       <Text>{name}</Text>
  // //       {/* {detailsSource.stats.map} */}
  // //     </View>
  // //   );
  // // };

  // const styles = {
  //   container: {
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: 'white',
  //   },
  //   image: {
  //     width: 150,
  //     height: 150,
  //   },
  //   statsContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   statsText: {
  //     marginRight: 4,
  //   },
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Image
        source={{
          uri: detailsSource.sprites.front_default,
        }}
        style={styles.image}
      />

      <View>
        {detailsSource?.stats.map((item, index) => (
          <View key={index} style={styles.statsContainer}>
            <View style={styles.statsText}>
              <Text>{item.stat.name.toUpperCase()}:</Text>
              <Text style={styles.statsNumber}>{item.base_stat}</Text>
            </View>
            <View style={styles.bars}>
              <AnimatedBar value={item.base_stat} index={index} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 30,
    textTransform: 'capitalize',
    fontFamily: 'pokemon solid',
  },

  statsNumber: {
    fontWeight: 'bold',
    position: 'absolute',
    left: 155,
  },

  image: {
    width: 220,
    height: 220,
  },

  bars: {
    display: 'flex',
    position: 'absolute',
    left: 190,
  },

  statsContainer: {
    alignItems: 'center',
    width: 300,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 4,
    marginTop: 10,
  },

  statsText: {
    marginRight: 10,
  },
});

export default DetailsView;
