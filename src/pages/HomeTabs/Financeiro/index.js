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
const Financeiro = () => {
    return (
    <View
        style={styles.Container}
    ></View>
    )
}

Financeiro.navigationOptions = {
    header: null
}

export default Financeiro;