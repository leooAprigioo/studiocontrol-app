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

const Aulas = () => {
    return (
        <View
            style={styles.Container}
    ></View>
    )
}

Aulas.navigationOptions = {
    header: null
}

export default Aulas;