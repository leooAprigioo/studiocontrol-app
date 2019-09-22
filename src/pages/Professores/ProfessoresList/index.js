import React, { useState, useEffect, useLayoutEffect } from 'react';

import {
    StyleSheet, 
    View, 
    FlatList,
    TouchableOpacity,
    TextInput,
    Text,
    Button,
    ScrollView,
    BackHandler,
} from 'react-native';

import { 
    Container,
    ListItem,
    ListItemTitle,
    GoalDescription,
    PlanoIcon,
    HeaderContent,
    SearchInput,
    HeaderTitle
} from './styles';

import {
    FloatingButton,
} from '../../../shared/styles/buttons'

import {
    ProfessorColor,
} from '../../../shared/styles/colors'

import Icon from 'react-native-vector-icons/FontAwesome5';

import PerfilService from '../../../services/PerfilService';

const styles = StyleSheet.create({
    Container,
    ListItem,
    ListItemTitle,
    GoalDescription,
    PlanoIcon,
    HeaderContent,
    SearchInput,
    HeaderTitle
});

const buttons = StyleSheet.create({
    FloatingButton,
});

const ProfessoresList = (props) => {

    const [professores, setProfessores] = useState([]);
    const [error, setError] = useState(false);

    async function fetchData() {
        await PerfilService.listProfessor().then((res) => {
            if ('error' in res) {
                setError(true);
                console.log(res);
            } else {
                setProfessores(res)
            }
        }).catch((error) => console.log(error));
    }

    function backButtonHandler() {
        props.navigation.navigate('Estudio');
        return true;
    }

    useEffect(() => {
        fetchData();

        BackHandler.addEventListener("hardwareBackPress", backButtonHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };

    }, []);
    
    return (
        <View style={styles.Container}>
            {!error ? 
            <FlatList
            keyExtractor={item => item.id.toString()}
            data={professores}
            renderItem={({item}) => 
                <TouchableOpacity 
                    style={styles.ListItem}
                    onPress={() => props.navigation.navigate('ProfessorDetail', {professor: item})}
                >
                    <Text style={styles.ListItemTitle}>{item.nome_completo}</Text>
                    <Text style={styles.GoalDescription}>{item.graduacao}{console.log(item)}</Text>
                </TouchableOpacity>}
            /> : <Text style={{textAlign: 'center', fontSize: 16, paddingTop: 20}}>Não há professores cadastrados</Text>}{console.log(error)}
            <TouchableOpacity 
                style={[buttons.FloatingButton, {backgroundColor: ProfessorColor}]}
                onPress={() => props.navigation.navigate('UsuarioForm', {type: 'professor'})}
            >
                <Icon name='plus' size={20} color='#FFF' />
            </TouchableOpacity>
        </View>
    )
}

ProfessoresList.navigationOptions = ({ navigation }) => {
    return {
        title: 'Professores',
        headerLeft: 
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => navigation.navigate('Estudio')
                }
            >
                <Icon name='arrow-left' size={30} color='#FFF' />
            </TouchableOpacity>,
        headerTitle: 
            <View style={styles.HeaderContent}>
                <View style={styles.SearchInput}>
                    <Icon name='search' size={20} color='#CCC' />
                    <TextInput 
                        placeholder="Pesquisar por nome ou CPF"
                        // underlineColorAndroid='#FFF'
                        placeholderTextColor='#CCC'
                        style={{flex: 1,}}
                    />
                </View>
            </View>
    }
}

export default ProfessoresList;