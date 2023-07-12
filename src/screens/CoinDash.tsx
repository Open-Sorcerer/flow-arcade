import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useCurrentUser } from "../hooks/useCurrentUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import mintNFT from "../cadence-integration/mintNFT";
import getTotalSupply from "../cadence-integration/getTotalSupply";
interface Coin {
  id: number;
  position: {
    x: number;
    y: number;
  };
  timer: NodeJS.Timeout | null;
}

const coinImage = require("./../../assets/game-assets/coin.png");
const initialCoinSpawnInterval = 1000; // Initial interval between coin spawns in milliseconds

const CoinDash: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [time, setTime] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  // Hook to obtain information about the current user
  const user = useCurrentUser();

  useEffect(() => {
    if (time > 0 && !gameOver) {
      // Timer logic
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the timer when the component unmounts or game over
      return () => clearInterval(timer);
    } else {
      // Game over logic
      setGameOver(true);
    }
  }, [time, gameOver]);

  useEffect(() => {
    const getHighScore = async () => {
      try {
        const storedHighScore = await AsyncStorage.getItem("highScore");
        if (storedHighScore) {
          setHighScore(parseInt(storedHighScore));
        }
      } catch (error) {
        console.log("Error getting high score from cache:", error);
      }
    };

    getHighScore();
  }, []);

  useEffect(() => {
    if (gameOver) {
      // Cleanup function
      return () => {
        setCoins([]);
      };
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      // Coin spawning logic
      const coinInterval = setInterval(() => {
        setCoins((prevCoins) => [
          ...prevCoins,
          {
            id: prevCoins.length,
            position: {
              x: Math.random() * 300,
              y: Math.random() * 500,
            },
            timer: null, // Timer for tracking the time limit to click the coin
          },
        ]);
      }, initialCoinSpawnInterval);

      // Clean up the coin interval when the component unmounts or game over
      return () => clearInterval(coinInterval);
    }
  }, [gameOver]);

  const handleCoinPress = (coinId: number) => {
    setCoins((prevCoins) =>
      prevCoins.filter((coin) => {
        // Clear the timer for the clicked coin
        if (coin.id === coinId && coin.timer) {
          clearTimeout(coin.timer);
        }
        return coin.id !== coinId;
      })
    );
    setScore((prevScore) => prevScore + 1);
  };

  const handlePlayAgain = () => {
    if (score > highScore) {
      setHighScore(score);
      try {
        AsyncStorage.setItem("highScore", score.toString());
      } catch (error) {
        console.log("Error setting high score in cache:", error);
      }
    }
    setGameOver(false);
    setCoins([]); // Clear the coins state
    setScore(0);
    setTime(30);

    // Clear timers for each coin
    coins.forEach((coin) => {
      if (coin.timer) {
        clearTimeout(coin.timer);
      }
    });
  };

  const checkSuppy = async () => {
    let _totalSupply;
    try {
      _totalSupply = await fcl.query({
        cadence: `${getTotalSupply}`,
      });
      console.log(_totalSupply);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMintNFT = async () => {
    try {
      console.log("Minting NFT");
      console.log(user?.address);

      const transactionId = await fcl.mutate({
        cadence: `${mintNFT}`,
        args: (arg, t) => [
          arg("0x" + user?.address, t.Address),
          arg("Name of the NFT", t.String),
          arg("Description of the NFT", t.String),
          arg(
            "https://ipfs.moralis.io:2053/ipfs/QmXTn6AQuGrUm9SpE9xAa9vg3suxLsuWYNRxHnoB8Ndhhc",
            t.String
          ),
        ],
        limit: 99,
      });
      console.log("Transaction sent to the network:", transactionId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Timer for tracking the time limit to click each coin
    const coinTimers = coins.map((coin) => {
      if (!coin.timer) {
        const coinTimer = setTimeout(() => {
          setCoins((prevCoins) =>
            prevCoins.filter((prevCoin) => prevCoin.id !== coin.id)
          );
        }, 3000); // Time limit to click the coin in milliseconds

        return { id: coin.id, timer: coinTimer };
      }

      return coin;
    });

    // Clear timers when game is reset
    return () => {
      coinTimers.forEach((coin) => {
        if (coin.timer) {
          clearTimeout(coin.timer);
        }
      });
    };
  }, []); // Remove dependency on coins state

  const styles = StyleSheet.create({
    scrollView: {
      padding: 20,
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#2D2C35",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    timer: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: "white",
    },
    score: {
      fontSize: 18,
      marginBottom: 16,
      color: "white",
    },
    coin: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    coinImage: {
      width: 50,
      height: 50,
    },
    overlay: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    gameOverText: {
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
      marginBottom: 16,
    },
    highScoreText: {
      fontSize: 24,
      color: "white",
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 16,
    },
    button: {
      marginHorizontal: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "#1C1C1B",
      borderRadius: 4,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
  });

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            padding: 25,
            borderRadius: 10,
            marginBottom: 10,
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
          <Text
            style={{
              fontSize: 22,
              marginBottom: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Your Account
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 3,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#01EE8B" }}>
              Address
            </Text>
            <Text style={{ fontSize: 18, color: "white" }}>
              {user?.address ?? "Loading..."}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500", color: "#01EE8B" }}>
              Balance
            </Text>
            <Text style={{ fontSize: 18, color: "white" }}>
              {user ? `${user.balance / 10 ** 8} FLOW` : "Loading..."}
            </Text>
          </View>
        </View>
        {gameOver ? (
          <View style={styles.overlay}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.highScoreText}>Score: {score}</Text>
            <Text style={styles.highScoreText}>High Score: {highScore}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
                <Text style={styles.buttonText}>Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleMintNFT}>
                <Text style={styles.buttonText}>Mint NFT</Text>
              </TouchableOpacity>
            </View>
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              explosionSpeed={300}
              fallSpeed={3000}
              colors={["#ff00ff", "#00ffff", "#ffff00"]}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.timer}>{time}</Text>
            <Text style={styles.score}>Score: {score}</Text>
            {coins.map((coin) => (
              <TouchableOpacity
                key={coin.id}
                style={[
                  styles.coin,
                  { left: coin.position.x, top: coin.position.y },
                ]}
                onPress={() => handleCoinPress(coin.id)}
              >
                <Image source={coinImage} style={styles.coinImage} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default CoinDash;
