import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import { ProfessorColor, PlanoColor, TreinoColor } from '../../shared/styles/colors';

import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
            <Text style={{color: '#3c88ab', fontSize: 30, paddingVertical: 20}}>Bem-Vindo</Text>
            <Image 
                source={require('../../public/img/Logo-Circ-Nome.png')} style={{width: 110, height: 110}} 
                resizeMode='stretch'
            />
            
        </View>
    )
}

export default SplashScreen;