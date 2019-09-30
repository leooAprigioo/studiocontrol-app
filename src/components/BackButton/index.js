import React from 'react'

import {
    TouchableOpacity,
    Text
} from 'react-native'
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton = (props) => {
    return (
        
        <TouchableOpacity
        style={{margin: 3, paddingLeft: 12}}
            onPress={() => props.nav == 'goBack' ? props.navigation.navigate.goBack() : props.navigation.navigate(props.nav)
            }
        >
            
            <Icon name='arrow-back' size={24} color='#FFF' />

        </TouchableOpacity>
    )
}

export default withNavigation(BackButton)