import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Define your game data
const games = [
  { id: 1, name: 'Game 1', icon: require('./icons/game1.png') },
  { id: 2, name: 'Game 2', icon: require('./icons/game2.png') },
  { id: 3, name: 'Game 3', icon: require('./icons/game3.png') },
  // Add more game objects as needed
];

const Collection: React.FC = () => {
  const renderItem = ({ item }: { item: typeof games[0] }) => (
    <View style={styles.gameContainer}>
      <Image source={item.icon} style={styles.gameIcon} />
      <Text style={styles.gameName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Icons</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gameContainer: {
    alignItems: 'center',
    margin: 8,
  },
  gameIcon: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  gameName: {
    marginTop: 8,
  },
});

export default Collection;
