import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CollectionScreen = ({ navigation }) => {
  const games = [
    {
      id: 1,
      title: 'Doge n CoinFlip',
      icon: '🎮',
      onPress: () => navigation.navigate('DegenCoinFlip'),
    },
    {
      id: 2,
      title: 'Coin Dash',
      icon: '🕹️',
      onPress: () => navigation.navigate('CoinDash'),
    },
    { id: 3, 
      title: 'Spline', 
      icon: '🎯',
      onPress: () => navigation.navigate('Spline'), },
    // Add more games as needed
  ];

  return (
    <View style={styles.container}>
      {games.map((game) => (
        <TouchableOpacity key={game.id} style={styles.gameItem} onPress={game.onPress}>
          <Text style={styles.gameIcon}>{game.icon}</Text>
          <Text style={styles.gameTitle}>{game.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  gameIcon: {
    fontSize: 40,
  },
  gameTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
});

export default CollectionScreen;
