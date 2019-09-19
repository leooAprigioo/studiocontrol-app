import React from 'react';

import {
    StyleSheet,
    View, 
    Text
} from 'react-native';

import { 
    Container,
 } from './styles'

const styles = StyleSheet.create({
    Container,
});

import {
    BackgroundColorHomeTabs, 
    BackgroundLocationHomeTabs 
} from '../../../shared/styles/colors';

import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
    return (
    <View
        style={styles.Container}
    ></View>
    )
}

Home.navigationOptions = {
    header: null
}

export default Home;