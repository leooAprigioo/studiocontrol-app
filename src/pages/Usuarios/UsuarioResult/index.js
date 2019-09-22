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
    ProfessorColor,
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

const UsuarioResult = (props) => {
    const user_type = props.navigation.getParam('user_type', 'aluno');
    const id_perfil = props.navigation.getParam('id_perfil')
    const id_aluno_prof = props.navigation.getParam('id_aluno_prof')
    return (
        <View style={styles.Container}>
            <Text style={[fonts.Title, {textAlign: 'center', paddingVertical: 10}]}>Cadastro realizado com sucesso!</Text>
            <Text style={[fonts.SubTitle, {textAlign: 'center', paddingVertical: 10}]}>Aproveite para completar o cadastro do novo {user_type} com as opções abaixo:</Text>
            {
                user_type == 'aluno' ?
                <View style={styles.Options}>
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
                :
                <View style={styles.Options}>
                    <TouchableOpacity 
                        style={[styles.Option, {backgroundColor: PlanoColor}]}
                    >
                        <Icon name='receipt' size={20} color='#FFF' />    
                        <Text style={styles.OptionTitle}>Adicionar Turma</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        onPress={() => props.navigation.navigate('Estudio')}
                        style={[styles.Option, {backgroundColor: '#FFF'}]}
                        
                        >
                        <Icon name='arrow-left' size={20} color='#111' />
                        <Text style={[styles.OptionTitle, {color: '#111'}]}>Voltar ao menu</Text>
                    </TouchableOpacity> 
                </View>
            }
        </View>
    );
}

UsuarioResult.navigationOptions = ({ navigation }) => {
    const user_type = navigation.getParam('user_type', 'aluno')
    return {
            headerTitle: user_type == 'aluno' ? 'Cadastrar aluno' : 'Cadastrar professor',
            headerStyle: {backgroundColor: user_type == 'aluno' ? AlunoColor : ProfessorColor},
            headerTintColor: '#FFF'
        } 
}


export default UsuarioResult