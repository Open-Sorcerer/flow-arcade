import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Spline from '@splinetool/react-spline';

const SplineScreen: React.FC = () => {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={{ flex: 1 }}>
            <Spline
                scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                width={width}
                height={height}
            />
        </View>
    );
};

export default SplineScreen;
