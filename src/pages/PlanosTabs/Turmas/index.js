import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    BackHandler,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {
    Container,
    Header,
    Content,
    Turma,
    TurmaColumn,
    TurmaHeader,
    TurmaTitle,
    TurmaDescription,
    TurmaContent,
    TurmaData,
    TurmaDataTitle,
    TurmaDataValue,
    TurmaDataPrice,
    TurmaFooter,
} from './styles';

import {
    Title,
} from '../../../shared/styles/fonts'

import {
    PlanoColor,
} from '../../../shared/styles/colors'

import {
    FloatingButton,
} from '../../../shared/styles/buttons'

import Icon from 'react-native-vector-icons/MaterialIcons';
import TurmaService from '../../../services/TurmaService';

const styles = StyleSheet.create({
    Container,
    Header,
    Content,
    Turma,
    TurmaColumn,
    TurmaHeader,
    TurmaTitle,
    TurmaDescription,
    TurmaContent,
    TurmaData,
    TurmaDataTitle,
    TurmaDataValue,
    TurmaDataPrice,
    TurmaFooter,
    FloatingButton,
});

const fonts = StyleSheet.create({
    Title,
});

const buttons = StyleSheet.create({
    FloatingButton,
});

const Turmas = (props) => {

    const [loader, setLoader] = useState(true);
    const [turmas, setTurmas] = useState([])

    function backButtonHandler() {
        props.navigation.navigate('Estudio');
        return true;
    }

    async function fetchData() {
        await TurmaService.list_Q().then((res) => {
            console.log(res);
            res.map((turma) => {
                turma.horario_aula = turma.horario_aula.split(',');
            })
            console.log(res)
            setTurmas(res)
        }).catch((error) => console.log(error));
    }

    useEffect(() => {

        fetchData().then((res) => setLoader(false));
        console.log(turmas)

        BackHandler.addEventListener("hardwareBackPress", backButtonHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [])

    return  (
        <View>
            <ScrollView>
            {
                loader ? 
                <ActivityIndicator size='large' color={PlanoColor} /> 
                :
                
                <View style={styles.Container}>
                    {/* Content */}
                    <View style={styles.Content}>
                        {/* Turma */}

                        {
                            turmas && turmas.length > 0 ? 
                            turmas.map((turma) => {
                                return <TouchableOpacity style={styles.Turma} key={turma.id_turma.toString()}>
                                {/* TurmaColumn */}
                                <View style={[styles.TurmaColumn, styles.TurmaHeader]}>
                                    {/* Nome da turma */ }
                                    <Text style={styles.TurmaTitle}>{turma.nome_turma}</Text>
                                    {/* Descrição */ }
                                    <Text style={styles.TurmaDescription}>
                                        {turma.descricao_turma}
                                    </Text>
                                </View>
                                <View style={[styles.TurmaColumn, TurmaContent]}>
                                    {/* Alunos matriculados */ }
                                    <View style={styles.TurmaData}>
                                        <Text style={styles.TurmaDataTitle}>Alunos matrículados: </Text>
                                        <Text style={styles.TurmaDataValue}>{turma.alunos_matriculados}</Text>
                                    </View>
                                    <View style={styles.TurmaData}>
                                        <Text style={styles.TurmaDataTitle}>Horário da aula:</Text>
                                        {turma.horario_aula.map((horario) => {return <Text style={styles.TurmaDataValue} key={horario}>{horario}</Text>})}
                                    </View>
                                    <View style={styles.TurmaData}>
                                        <Text style={styles.TurmaDataTitle}>Professor:</Text>
                                        <Text style={styles.TurmaDataValue}>{turma.nome_professor}</Text>
                                    </View>
                                    <View style={[styles.TurmaData, {alignSelf: 'center'}]}>
                                        <Text style={styles.TurmaDataPrice}>R$ {turma.valor_turma.toFixed(2).replace('.', ',')}/Mês</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
    
                            })
                            :
                            <View></View>
                        }
                    </View>
                </View>
            }
            </ScrollView>
            {
                loader ? 
                <View></View> 
                :
                <TouchableOpacity 
                    style={[buttons.FloatingButton, {backgroundColor: PlanoColor}]}
                    onPress={() => props.navigation.navigate('TurmaForm')}
                >
                    <Icon name='add' size={20} color='#FFF' />
                </TouchableOpacity>
            }
        </View>
    );
}

Turmas.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: PlanoColor},
        headerTintColor: '#FFF',
        title: 'Planos e Turmas',
        headerLeft: 
            <TouchableOpacity
            style={{margin: 3, paddingLeft: 12}}
                onPress={() => navigation.navigate('Estudio')
                }
            >
                <Icon name='arrow-back' size={24} color='#FFF' />
            </TouchableOpacity>,
    }
}

export default Turmas;