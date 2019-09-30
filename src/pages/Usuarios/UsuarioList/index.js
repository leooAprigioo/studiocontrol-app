import React, { useState, useEffect } from 'react';

import {
    StyleSheet, 
    View, 
    FlatList,
    TouchableOpacity,
    TextInput,
    Text,
    BackHandler
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
    AlunoColor,
    ProfessorColor
} from '../../../shared/styles/colors'

import AddFloatingButton from '../../../components/AddFloatingButton';

import BackButton from '../../../components/BackButton';

import Icon from 'react-native-vector-icons/MaterialIcons';

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

const UsuarioList = (props) => {

    const [alunos, setAlunos] = useState([]);
    const [userFilter, setUserFilter] = useState([])
    const [user_type, setUser_Type] = useState([]);
    const [professores, setProfessores] = useState([]);

    _onLongPressButton = () => {
        
    }

    _onChangeSearchText = (text) => {
        let tempArr = []
        if (user_type == 'aluno')  {
            tempArr = alunos.filter((value) => {
                console.log(value)
                if (value.nome_completo.search(text) != -1) {
                    return value
                }
                
            })
        } else if (user_type == 'professor') {
            tempArr = professores.filter((value) => {
                console.log(value)
                if (value.nome_completo.search(text) != -1) {
                    return value
                }
                
            })
        }

        setUserFilter(tempArr)
    }

    async function fetchData() {
        // TODO User type in useEffect
        const user_type = props.navigation.getParam('user_type', 'aluno')
        setUser_Type(user_type)
        console.log(user_type)
        if (user_type == 'aluno') {
            await PerfilService.listAluno().then((res) => {setAlunos(res), setUserFilter(res)}).catch((error) => console.log(error));
        } else if (user_type == 'professor') {
            await PerfilService.listProfessor().then((res) => {setProfessores(res); setUserFilter(res)}).catch((error) => console.log(error));
        }
        
    }

    function backButtonHandler() {
        props.navigation.navigate('Estudio');
        return true;
    }

    useEffect(() => {
        fetchData();
    }, []);

    /* backButton Handler */
    useEffect(() => {
        
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    })
    
    return (
        <View style={styles.Container}>
            {
                user_type == 'aluno' ?
                    userFilter.length > 0 ?
                <View>
                    {console.log(user_type)}
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={userFilter}
                        renderItem={({item}) => 
                            <TouchableOpacity 
                                style={[styles.ListItem, {borderLeftColor: AlunoColor,}]}
                                onPress={() => props.navigation.navigate('UsuarioDetail', {id_perfil: item.id_perfil, aluno: {id_aluno: item.id, objetivo: item.objetivo, id_plano: item.id_plano}, user_type: user_type})}
                            >
                                <Text style={styles.ListItemTitle}>{item.nome_completo}</Text>
                                <Text style={styles.GoalDescription}>{item.objetivo}</Text>
                            </TouchableOpacity>}
                    />

                </View>
                :
                <View style={{flex: 1, padding: 10}}><Text style={{fontSize: 16, textAlign: 'center'}}>Não há alunos cadastrados</Text></View>
            :
            userFilter.length > 0 ?
            <View>
                {console.log(user_type)}
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={userFilter}
                    renderItem={({item}) => 
                        <TouchableOpacity 
                            style={[styles.ListItem, {borderLeftColor: ProfessorColor,}]}
                            onPress={() => props.navigation.navigate('UsuarioDetail', {id_perfil: item.id_perfil, professor: {id_professor: item.id, graduacao: item.graduacao}, user_type: user_type})}
                        >
                            <Text style={styles.ListItemTitle}>{item.nome_completo}</Text>
                            <Text style={styles.GoalDescription}>{item.graduacao}{console.log(item)}</Text>
                        </TouchableOpacity>}
                />
            </View>
            :
            <View style={{flex: 1, padding: 10}}><Text style={{fontSize: 16, textAlign: 'center'}}>Não há professores cadastrados</Text></View>
            }
                {
                    user_type == 'aluno' ?
                <AddFloatingButton nav='UsuarioForm' backgroundColor={AlunoColor} params={{user_type: 'aluno'}}></AddFloatingButton>
                :
                <AddFloatingButton nav='UsuarioForm' backgroundColor={ProfessorColor} params={{user_type: 'professor'}}></AddFloatingButton>
            }
        </View>
    )
}

UsuarioList.navigationOptions = ({ navigation }) => {
    const user_type = navigation.getParam('user_type', 'aluno')
    return {
        headerStyle: {backgroundColor: user_type == 'aluno' ? AlunoColor : ProfessorColor},
        headerTintColor: '#FFF',
        title: 'Alunos',
        headerLeft: 
            <BackButton nav='Estudio'></BackButton>,
        headerTitle: 
            <View style={styles.HeaderContent}>
                <View style={styles.SearchInput}>
                    <Icon name='search' size={20} color='#CCC' />
                    <TextInput 
                        placeholder={user_type == 'aluno' ? 'Digite o nome do aluno' : 'Digite o nome do professor'}
                        // underlineColorAndroid='#FFF'
                        placeholderTextColor='#CCC'
                        onChangeText={(text) => _onChangeSearchText(text)}
                        style={{flex: 1,}}
                    />
                </View>
            </View>
    }
}

export default UsuarioList;