import React from 'react'

import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import {
    FloatingButton
} from '../../shared/styles/buttons'

import Icon from 'react-native-vector-icons/MaterialIcons';

import { withNavigation } from 'react-navigation'
import { AlunoColor } from '../../shared/styles/colors';

const buttons = StyleSheet.create({
    FloatingButton
})

const AddFloatingButton = (props) => {
    return (
        <TouchableOpacity 
            style={[buttons.FloatingButton, {backgroundColor: props.backgroundColor ? props.backgroundColor : AlunoColor}]}
            onPress={() => props.nav == 'goBack' ? props.navigation.navigate.goBack() : props.navigation.navigate(props.nav, props.params)}
        >
            <Icon name='add' size={20} color={props.textColor ? props.textColor : '#FFF'} />
        </TouchableOpacity>
    )
}

export default withNavigation(AddFloatingButton)