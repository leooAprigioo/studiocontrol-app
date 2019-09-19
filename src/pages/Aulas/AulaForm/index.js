import React, {useState, useEffect} from 'react';

import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView,
    Alert,x
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

import { TextInputMask } from 'react-native-masked-text'

import AulaService from '../../../services/AulaService';

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
    AulaColor,
} from '../../../shared/styles/colors';

import { withFormik } from 'formik';

import * as Yup from 'yup';

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

const AulaForm = (props) => {

    const type = props.navigation.getParam('type');
    const [currentDate, setCurrentDate] = useState(new Date())

    return (
        <ScrollView style={styles.Container}>
            <View style={styles.Header}>
                <Text style={fonts.Title}>Aula</Text>
                <Text style={fonts.SubTitle}>
                    Preencha os campos para adicionar uma nova aula
                </Text>
            </View>
            <View style={styles.Content}>
                <View style={{width: '100%'}}>
                    <TextInput 
                        underlineColorAndroid='#111'
                        selectionColor='#111'
                        placeholder="Nome da aula"
                        
                        style={styles.Input}
                        value={props.values.nome}
                        onChangeText={text => props.setFieldValue('nome', text)}
                    />
                { props.errors.nome && <Text style={fonts.ErrorMessage}>{props.errors.nome}</Text> }
                </View>          
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <TextInput
                            underlineColorAndroid='#111'
                            selectionColor='#111'
                            placeholder='Duração da aula (min)'
                            keyboardType='number-pad'
                            maxLength={3}
                            style={styles.Input}
                            value={props.values.duracao}
                            onChangeText={text => props.setFieldValue('duracao', text)}
                        />
                        <Text style={{fontSize: 12, color: '#ccc'}}>Apenas números</Text>
                        { props.errors.duracao && <Text style={fonts.ErrorMessage}>{props.errors.duracao}</Text> }
                    </View>
                    <View style={{flex: 1}}>
                        <TextInputMask
                            type={'money'}
                            style={styles.Input}
                            underlineColorAndroid='#111'
                            selectionColor='#111'
                            placeholder='Valor da aula'
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                                suffixUnit: ''
                            }}
                            value={props.values.valor_aula}
                            onChangeText={(text) => props.setFieldValue('valor_aula', text)}
                        />
                        { props.errors.valor_aula && <Text style={fonts.ErrorMessage}>{props.errors.valor_aula}</Text> }
                    </View>
                </View>
                <View style={{width: '100%'}}>
                    <TextInput
                        underlineColorAndroid='#111'
                        selectionColor='#111'
                        placeholder="Limite máximo de alunos"
                        keyboardType='number-pad'    
                        maxLength={3}
                        style={styles.Input}
                        value={props.values.limite_alunos}
                        onChangeText={text => props.setFieldValue('limite_alunos', text)}
                    />
                    <Text style={{fontSize: 12, color: '#ccc'}}>Apenas números</Text>
                    { props.errors.limite_alunos && <Text style={fonts.ErrorMessage}>{props.errors.limite_alunos}</Text> }
                </View>
                <View style={[buttons.LargueOutlineButtonContainer, {width: '100%', marginTop: 10}]}>
                
                    <TouchableOpacity
                    accessibilityLabel="Adicionar aula"
                    style={[buttons.LargueOutlineButton, {borderColor: AulaColor}]}
                    onPress={props.handleSubmit}
                    >
                        <Text style={[buttons.LargueOutlineButtonText, {color: AulaColor}]}>Cadastrar aula</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.Footer}>
            </View>
            <View>
                {<Text style={[fonts.ErrorMessage, {fontSize: 15, textAlign: 'center'}]}>{props.status}</Text> }
            </View>
        </ScrollView>
    );
};

AulaForm.navigationOptions = ({ navigation }) => {
    const type = navigation.getParam('type');
    let tabBarVisible = false;
    return {
            headerTitle: 'Cadastrar aula',
            headerStyle: {backgroundColor: AulaColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome: '', duracao: '', valor_aula: '', limite_alunos: ''}),

    validationSchema: Yup.object().shape({
        nome: Yup.string()
            .required('Preencha o campo nome'),
        duracao: Yup.number()
            .min(1,'Preencha o campo com um valor igual ou maior que 1')
            .positive('Preencha o campo com um valor positivo')
            .integer('O campo não pode conter pontos ou virgulas')
            .required('Preencha o campo')
            .truncate(),
        valor_aula: Yup.string()
            .required('Preencha o campo'),
        limite_alunos: Yup.number()
            .min(1,'Preencha o campo com um valor igual ou maior que 1')
            .positive('Preencha o campo com um valor positivo')
            .integer('O campo não pode conter pontos ou virgulas')
            .required('Preencha o campo')
            .truncate(),
      }),
  
    handleSubmit: (values, props) => {

        console.log(values);
        values.valor_aula = parseFloat(values.valor_aula.toString().substr(2).replace('.', '').replace(',', '.'));
        values.duracao = parseInt(values.duracao)
        values.limite_alunos = parseInt(values.limite_alunos)
        AulaService.post(values).then((res) => {
            if ('error' in res) {
                Alert.alert('Não foi possível cadastrar a aula', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                Alert.alert('Aula cadastrada com sucesso', 'Pronto! Agora você pode começar a montar seus planos.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            }
        }).catch((error) => {
            Alert.alert('Não foi possível cadastrar a aula', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
        })
        console.log(values);
    }
  })(AulaForm);