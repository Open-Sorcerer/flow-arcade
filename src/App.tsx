import { SafeAreaView, View } from "react-native";
import Auth from "./screens/Auth";
import { useCurrentUser } from "./hooks/useCurrentUser";
import Core from "./screens/Core";
import Collection from "./screens/Collection";
import CoinDash from "./screens/CoinDash";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DegenCoinFlip from "./screens/DegenCoinFlip";
import Spline from "./screens/Spline";

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoggedIn = useCurrentUser()!!;

  return (
    <NavigationContainer>
      <View style={{ backgroundColor: "#f0f0f0", flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator>
            {isLoggedIn ? (
              <>
                <Stack.Screen name="Core" component={Core} />
                <Stack.Screen name="Collection" component={Collection} />
                <Stack.Screen name="CoinDash" component={CoinDash} />
                <Stack.Screen name="DegenCoinFlip" component={DegenCoinFlip} />
                <Stack.Screen name="Spline" component={Spline} />
              </>
            ) : (
              <Stack.Screen name="Auth" component={Auth} />
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
}
