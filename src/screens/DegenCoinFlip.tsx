import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const coinFlipAnimationGif = require('./../../assets/game-assets/coin_flip_animation.gif');
const headsImage = require('./../../assets/game-assets/buff_doge.png');
const tailsImage = require('./../../assets/game-assets/weak_cheems.png');

const DegenCoinFlipScreen: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentImage, setCurrentImage] = useState(headsImage);

  const handleCoinFlip = (side) => {
    if (!isFlipping) {
      setIsFlipping(true);
      setCurrentImage(headsImage);

      setTimeout(() => {
        setCurrentImage(side === 'heads' ? headsImage : tailsImage);
        setIsFlipping(false);
      }, 2000);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2D2C35',
    },
    coinContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    coinGif: {
      width: 200,
      height: 200,
    },
    coinImage: {
      width: 200,
      height: 200,
    },
    buttonContainer: {
      marginTop: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    button: {
      flex: 1,
      backgroundColor: '#1A1D1F',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#999',
      elevation: 5,
      minWidth: 80,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.coinContainer} onPress={handleCoinFlip} disabled={isFlipping}>
        {isFlipping ? (
          <Image source={coinFlipAnimationGif} style={styles.coinGif} />
        ) : (
          <Image source={currentImage} style={styles.coinImage} />
        )}
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handleCoinFlip('heads')} disabled={isFlipping}>
            <Text style={styles.buttonText}>Heads</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleCoinFlip('tails')} disabled={isFlipping}>
            <Text style={styles.buttonText}>Tails</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>0.05 FLOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>0.10 FLOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>0.25 FLOW</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>0.50 FLOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>1.00 FLOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>2.00 FLOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DegenCoinFlipScreen;
