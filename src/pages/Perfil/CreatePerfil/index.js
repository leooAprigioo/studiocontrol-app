import React, {useState, useEffect} from 'react';

import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView,
    Button
} from 'react-native';

import { 
    Container,
    Header,
    Content,
    Footer,
    Input
} from './styles';

import {
    Title,
    SubTitle,
    Description,
    ErrorMessage,
} from '../../../shared/styles/fonts';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInputMask } from 'react-native-masked-text'

const styles = StyleSheet.create({
    Container,
    Header,
    Content,
    Footer,
    Input
});

import {
    LargueOutlineButton,
    LargueOutlineButtonContainer,
    LargueOutlineButtonText,
} from '../../../shared/styles/buttons';

import {
    AlunoColor,
    ProfessorColor,
} from '../../../shared/styles/colors';

import { withFormik } from 'formik';
import DatePicker from 'react-native-datepicker'

import * as Yup from 'yup';

import PerfilService from '../../../services/PerfilService';
import TelefoneService from '../../../services/TelefoneService';

const fonts = StyleSheet.create({
    Title,
    SubTitle,
    Description,
    ErrorMessage,
});

const buttons = StyleSheet.create({
    LargueOutlineButton,
    LargueOutlineButtonContainer,
    LargueOutlineButtonText,
});

const CreatePerfil = (props) => {

    const type = props.navigation.getParam('type');

    return (
        <ScrollView style={styles.Container}>
            <View style={styles.Header}>
                <Text style={fonts.Title}>Dados Pessoais</Text>
                <Text style={fonts.SubTitle}>
                    Preencha os campos para adicionar um novo {type}
                </Text>
            </View>
            <View style={styles.Content}>
                <View>
                <TextInput 
                    underlineColorAndroid='#111'
                    selectionColor='#111'
                    placeholder="Nome completo"
                    placeholderTextColor='#111'
                    style={styles.Input}
                    value={props.values.nome_completo}
                    onChangeText={text => props.setFieldValue('nome_completo', text)}
                />
                { props.errors.nome_completo && <Text style={fonts.ErrorMessage}>{props.errors.nome_completo}</Text> }
                </View>
                <View>
                    <TextInput 
                        underlineColorAndroid='#111'
                        selectionColor='#111'
                        placeholder="E-mail"
                        placeholderTextColor='#111'
                        style={styles.Input}
                        value={props.values.email}
                        onChangeText={text => props.setFieldValue('email', text)}
                    />
                    { props.errors.email && <Text style={fonts.ErrorMessage}>{props.errors.email}</Text> }
                </View>
            </View>
            <View>
                {<Text style={[fonts.ErrorMessage, {fontSize: 15, textAlign: 'center'}]}>{props.status}</Text> }
            </View>
        </ScrollView>
    );
};

CreatePerfil.navigationOptions = ({ navigation }) => {
    const user_type = navigation.getParam('user_type');
    if (type == 'aluno') {
        return {
            // headerLeft:
            
            //     <TouchableOpacity
            //         style={{paddingHorizontal: 20}}
            //         onPress={() => navigation.navigate('AlunosList')}
            //     >
            //         <Icon name='arrow-left' size={30} color='#FFF' />
            //     </TouchableOpacity>,
            headerTitle: 'Cadastrar ' + user_type,
    
        }
    } else {
        return {
            headerLeft:
            
                <TouchableOpacity
                    style={{paddingHorizontal: 20}}
                    onPress={() => navigation.navigate('ProfessoresList')}
                >
                    <Icon name='arrow-left' size={30} color='#FFF' />
                </TouchableOpacity>,
            headerTitle: 'Cadastrar ' + type,
    
        }
    }
    
}

export default withFormik({

    mapPropsToValues: () => ({ nome_completo: '', data_nascimento: '', email: '', telefone: '', rg: '', cpf: '' }),

    validationSchema: Yup.object().shape({
        nome_completo: Yup.string()
            .required('Preencha o campo nome'),
        data_nascimento: Yup.string()
            .min(10,'Preencha o campo data de nascimento com uma data válida')
            .required('Preencha o campo de data de nascimento'),
        email: Yup.string()
            .email('Preencha o campo e-mail com um e-mail válido'),
        telefone: Yup.string()
            .min(10,'Preencha o campo telefone com um telefone válido'),
        rg: Yup.string()
            .required('Preencha o campo de RG'),
        cpf: Yup.string()
            .required('Preencha o campo de CPF'),
      }),
  
    handleSubmit: (values, props) => {
        console.log(values);
    }
  })(CreatePerfil);