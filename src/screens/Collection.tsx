import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
    { id: 3, title: 'Game 3', icon: '🎯' },
    // Add more games as needed
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#2D2C35',
    },
    gameItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderRadius: 10,
      backgroundColor: '#1A1D1F',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
    },
    gameIcon: {
      fontSize: 30,
      marginRight: 10,
      color: 'white',
    },
    gameTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {games.map((game) => (
        <TouchableOpacity key={game.id} style={styles.gameItem} onPress={game.onPress}>
          <Text style={styles.gameIcon}>{game.icon}</Text>
          <Text style={styles.gameTitle}>{game.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CollectionScreen;
