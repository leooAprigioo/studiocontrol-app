import React, {useState, useEffect} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import {
    ScrollContainer,
    Container,
    Header,
    HeaderUserName,
    UserNameText,
    HeaderOption,
    HeaderOptions,
    HeaderOptionText,
    Content,
    Option,
    OptionText
} from './styles'

import BackButton from '../../../components/BackButton'

import Icon from 'react-native-vector-icons/FontAwesome5';

import { ConfiguracaoColor } from '../../../shared/styles/colors'

import StorageService from '../../../services/StorageService'

const styles = StyleSheet.create({
    ScrollContainer,
    Container,
    Header,
    HeaderUserName,
    UserNameText,
    HeaderOption,
    HeaderOptions,
    HeaderOptionText,
    Content,
    Option,
    OptionText,
})

const ConfigHome = (props) => {

    const logout = () => {
        StorageService.remove('credencial').then((resultsCredencial) => {
            StorageService.remove('perfil').then((resultsPerfil) => {
                props.navigation.navigate('Login');
            });
        });
        
    }

    return (
        
        <ScrollView style={StyleSheet.ScrollContainer}>
            {console.log(props)}
            {/* Container */}
            <View style={styles.Container}>
                {/* Header */}
                <View style={styles.Header}>
                    <View style={styles.HeaderUserName}>
                        <Text style={styles.UserNameText}>Leonardo Aprigio da Silva</Text>
                    </View>
                    {/* HeaderOptions */}
                    <View style={styles.HeaderOptions}>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Opcoes */}
                <View style={styles.Content}>
                    <TouchableOpacity style={styles.Option}>
                        <Icon name='user-tie' size={20} />
                        <Text style={styles.OptionText}>Adicionar usuário administrador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.Option}
                        onPress={logout}
                    >
                        <Icon name='sign-out-alt' size={20} />
                        <Text style={styles.OptionText}>Sair</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )

}

ConfigHome.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: ConfiguracaoColor},
        headerTintColor: '#FFF',
        title: 'Configurações',
        headerLeft: 
            <BackButton nav='Estudio'></BackButton>
    }
}

export default ConfigHome