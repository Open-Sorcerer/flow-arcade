import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { useCurrentUser } from '../hooks/useCurrentUser';
import Ionicons from '@expo/vector-icons/Ionicons';

const coinFlipAnimationGif = require('./../../assets/game-assets/coin_flip_animation.gif');
const headsImage = require('./../../assets/game-assets/buff_doge.png');
const tailsImage = require('./../../assets/game-assets/weak_cheems.png');

const DegenCoinFlipScreen: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentImage, setCurrentImage] = useState(headsImage);
  // Hook to obtain information about the current user
  const user = useCurrentUser();
  const handleCoinFlip = (side: string) => {
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
    scrollView: {
      padding: 20,
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#2D2C35",
    },
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
      width: '100%',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 8,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#1C1C1B",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 10,
      elevation: 5,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  return (
    <>
      <ScrollView style={styles.scrollView}>
      <View
          style={{
            padding: 25,
            borderRadius: 10,
            marginBottom: 25,
            backgroundColor: "#1C1C1B",
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.75,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: "bold", color: "white" }}>
            Your Account
          </Text>
          <View
            style={{ flexDirection: "row", marginBottom: 3, justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#01EE8B" }}>Address</Text>
            <Text style={{ fontSize: 18, color: "white" }}>
              {user?.address ?? "Loading..."}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#01EE8B" }}>Balance</Text>
            <Text style={{ fontSize: 18, color: "white" }}>
              {user ? `${user.balance / 10 ** 8} FLOW` : "Loading..."}
            </Text>
          </View>
        </View>
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
            <TouchableOpacity style={styles.button} onPress={() => handleCoinFlip('heads')} disabled={isFlipping}>
              <Text style={styles.buttonText}>HEADS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleCoinFlip('tails')} disabled={isFlipping}>
              <Text style={styles.buttonText}>TAILS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
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
          <View style={styles.buttonContainer}>
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
      </ScrollView>
    </>
  );
};

export default DegenCoinFlipScreen;
