import React from 'react';
import {
  Button,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as fcl from '@onflow/fcl/dist/fcl-react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import NoWalletsView from '../components/NoWalletsView';
import WalletServiceCard from '../components/WalletServiceCard';
import WalletDiscoveryWrapper from '../components/WalletDiscoveryWrapper';

const Auth = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#2D2C35',
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: 'white',
        }}
        adjustsFontSizeToFit={true}
      >
        Welcome to the
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          fontFamily: 'monospace',
          marginBottom: 10,
          color: '#01EE8B',
        }}
        adjustsFontSizeToFit={true}
      >
        Flow-Arcade
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          lineHeight: 24,
          color: 'white',
        }}
      >
        Please choose a wallet to continue
      </Text>

      <View
        style={{
          backgroundColor: '#1C1C1B',
          borderRadius: 10,
          marginTop: 20,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.75,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <fcl.ServiceDiscovery
          fcl={fcl}
          Loading={LoadingIndicator}
          Empty={NoWalletsView}
          ServiceCard={WalletServiceCard}
          Wrapper={WalletDiscoveryWrapper}
        />
      </View>

    </ScrollView>
  );
};

export default Auth;
