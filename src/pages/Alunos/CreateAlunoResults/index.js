import React from 'react';

import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    Text,
} from 'react-native';

import { 
    Container,
    Options,
    Option,
    OptionTitle,
} from './styles';

import {
    Title,
    SubTitle,
    Description
} from '../../../shared/styles/fonts';

import {
    AlunoColor,
    PlanoColor,
    MedidasColor,
    AulaColor,
} from '../../../shared/styles/colors';

import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    Container,
    Options,
    Option,
    OptionTitle,
});

const fonts = StyleSheet.create({
    Title,
    SubTitle,
    Description,
});

const CreateAlunoResults = (props) => {
    console.log(props);
    const id_perfil = props.navigation.getParam('id_perfil', 0);
    const type = props.navigation.getParam('type');
    console.log(props);
    return (
        <View style={styles.Container}>
            <Text style={[fonts.Title]}>Aluno cadastrado com sucesso!</Text>
            <Text style={[fonts.SubTitle]}>Aproveite para completar o cadastro do novo aluno com as opções abaixo:</Text>
            <View style={styles.Options}>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('CepSearch', {id_perfil: id_perfil, type: type})}
                    style={[styles.Option, {backgroundColor: AlunoColor}]}
                >
                    <Icon name='user-edit' size={20} color='#FFF' />
                    <Text style={styles.OptionTitle}>Adicionar endereço</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                    style={[styles.Option, {backgroundColor: PlanoColor}]}
                >
                    <Icon name='receipt' size={20} color='#FFF' />    
                    <Text style={styles.OptionTitle}>Adicionar Plano e Turmas</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                    style={[styles.Option, {backgroundColor: MedidasColor}]}
                >
                    <Icon name='ruler' size={20} color='#FFF' />
                    <Text style={styles.OptionTitle}>Adicionar medidas</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                    style={[styles.Option, {backgroundColor: AulaColor}]}
                    >
                    <Icon name='calendar-day' size={20} color='#FFF' />
                    <Text style={styles.OptionTitle}>Agendar primeira aula</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('Estudio')}
                    style={[styles.Option, {backgroundColor: '#FFF'}]}
                    
                    >
                    <Icon name='arrow-left' size={20} color='#111' />
                    <Text style={[styles.OptionTitle, {color: '#111'}]}>Voltar ao menu</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
}

CreateAlunoResults.navigationOptions = ({ navigation }) => {
    return {
        headerLeft: 
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => navigation.navigate('AlunosList')}
            >
                <Icon name='arrow-left' size={30} color='#FFF' />
            </TouchableOpacity>,
        headerTitle: 'Cadastrar Aluno',
    }
}


export default CreateAlunoResults