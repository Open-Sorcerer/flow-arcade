import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated, Easing, Text } from 'react-native';

const headsImage = require('./../../assets/game-assets/buff_doge.png');
const tailsImage = require('./../../assets/game-assets/weak_cheems.png');

const DegenCoinFlipScreen: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinFlipAnimation] = useState(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(headsImage);

  const handleCoinFlip = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setCurrentImage(headsImage); // Reset to heads image before flipping animation

      const flips = Math.floor(Math.random() * 10) + 1; // Random number of flips between 1 and 10

      Animated.sequence([
        ...Array(flips).fill().map((_, index) =>
          Animated.timing(coinFlipAnimation, {
            toValue: index % 2 === 0 ? 1 : 0,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
        Animated.timing(coinFlipAnimation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsFlipping(false);
        setCurrentImage(tailsImage);
      });
    }
  };

  const interpolatedFlip = coinFlipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedStyles = {
    transform: [{ rotateX: interpolatedFlip }],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.coinContainer} onPress={handleCoinFlip} disabled={isFlipping}>
        <Animated.View style={[styles.coinImageContainer, animatedStyles]}>
          <Image source={currentImage} style={[styles.coinImage, { width: 200 }]} />
        </Animated.View>
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinImageContainer: {
    backfaceVisibility: 'hidden',
  },
  coinImage: {
    width: '100%',
    aspectRatio: 1,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999',
    elevation: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DegenCoinFlipScreen;
