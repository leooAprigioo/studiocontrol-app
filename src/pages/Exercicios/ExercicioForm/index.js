import React, {useState, useEffect} from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native'

import {
    Container,
    Header,
    Content,
    Section,
    SectionHeader,
    SectionTitle,
    SectionContent,
    DataRow,
    Data,
    DataInput,
    DataPicker,
    DateTimeInput,
    DateTimeBox,
    AddHorario,
    AddHorarioText,
    Footer,
    LastSection,
} from './styles'

import {
    Title,
    SubTitle,
    ErrorMessage,
} from '../../../shared/styles/fonts'

import {
    LargueOutlineButton,
    LargueOutlineButtonContainer,
    LargueOutlineButtonText,
} from '../../../shared/styles/buttons'

import {
    TreinoColor
} from '../../../shared/styles/colors'

import { withFormik } from 'formik';
import * as Yup from 'yup';

import ExercicioService from '../../../services/ExercicioService';

const styles = StyleSheet.create({
    Container,
    Header,
    Content,
    Section,
    SectionHeader,
    SectionTitle,
    SectionContent,
    DataRow,
    Data,
    DataInput,
    DataPicker,
    DateTimeBox,
    DateTimeInput,
    AddHorario,
    AddHorarioText,
    Footer,
    LastSection,
})

const fonts = StyleSheet.create({
    Title,
    SubTitle,
    ErrorMessage,
})

const buttons = StyleSheet.create({
    LargueOutlineButton,
    LargueOutlineButtonContainer,
    LargueOutlineButtonText,
})

const ExercicioForm = (props) => {

    // useEffect(() => {
    //     fetchData()
    // },[])

    return (
        
        <ScrollView style={styles.Container}>
                {/* header */}
                <View style={styles.Header}>
                    <Text style={[fonts.Title, {color: TreinoColor}]}>Exercício</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar um novo exercício</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Descrição do exercício</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="Nome do exercício"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    style={styles.DataInput}
                                    value={props.values.nome}
                                    onChangeText={text => props.setFieldValue('nome', text)}
                                />
                                { props.errors.nome && <Text style={fonts.ErrorMessage}>{props.errors.nome}</Text> }
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="Descrição do exercício"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    multiline={true}
                                    style={styles.DataInput}
                                    value={props.values.descricao}
                                    onChangeText={text => props.setFieldValue('descricao', text)}
                                />
                                { props.errors.descricao && <Text style={fonts.ErrorMessage}>{props.errors.descricao}</Text> }
                            </View>
                            <View style={styles.Data}>
                                    <View style={[buttons.LargueOutlineButtonContainer]}>
                                    
                                        <TouchableOpacity
                                        accessibilityLabel="Adicionar exercício"
                                        style={[buttons.LargueOutlineButton, {borderColor: TreinoColor}]}
                                        onPress={props.handleSubmit}
                                        >
                                            <Text style={[buttons.LargueOutlineButtonText, {color: TreinoColor}]}>Cadastrar exercício</Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.Footer}>

                </View>
        </ScrollView>
        
    )
}

ExercicioForm.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Cadastrar exercício',
            headerStyle: {backgroundColor: TreinoColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome: '', descricao: ''}),

    validationSchema: Yup.object().shape({
        nome: Yup.string()
            .required('Preencha o campo nome'),
        descricao: Yup.string()
      }),
  
    handleSubmit: (values, props) => {
        console.log(values)
        ExercicioService.post(values).then((resultsExercicio) => {
            if ('error' in resultsExercicio) {
                Alert.alert('Não foi possível cadastrar o exercício', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                Alert.alert('Exercício cadastrado com sucesso', 'Agora você pode incluir esse exercício em um treino.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
            }
        }).catch((error) => {
            console.log(error)
            Alert.alert('Não foi possível cadastrar o exercício', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
        })

    }
})(ExercicioForm);