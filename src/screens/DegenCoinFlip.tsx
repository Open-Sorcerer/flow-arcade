import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';

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
});

export default DegenCoinFlipScreen;
