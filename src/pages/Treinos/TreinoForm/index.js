import React, {useState, useEffect} from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Picker,
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
    PlanoColor, TreinoColor
} from '../../../shared/styles/colors'

import { withFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ExercicioService from '../../../services/ExercicioService';
import TreinoExercicioService from '../../../services/TreinoExercicioService';
import TreinoService from '../../../services/TreinoService';

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

const TreinoForm = (props) => {

    const [exercicios, setExercicios] = useState([])
    const [addMore, setAddMore] = useState({data : [0]})

    async function fetchData() {
        await ExercicioService.list().then((res) => setExercicios(res)).catch((error) => console.log(error));
    }

    const AddMore = () => {
        const newObj = {data: addMore.data}
        newObj.data.push(newObj.data[newObj.data.length - 1] + 1)

        props.values.id_exercicio.push('')
        props.values.duracao_exercicio.push('')

        setAddMore(newObj)
        console.log(addMore)
    }

    useEffect(() => {
        fetchData()
    },[])

    return (
        
        <ScrollView>
            {/* container */}
            <View style={styles.Container}>
                {/* header */}
                <View style={styles.Header}>
                    <Text style={[fonts.Title, {color: PlanoColor}]}>Treino</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar um novo treino</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Descrição do treino</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="Nome do treino"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    style={styles.DataInput}
                                    value={props.values.nome}
                                    onChangeText={text => props.setFieldValue('nome', text)}
                                />
                                { props.errors.nome && <Text style={fonts.ErrorMessage}>{props.errors.nome}</Text> }
                            </View>
                        </View>
                    </View>

                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Exercícios</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            {addMore.data.map((index) => {
                                console.log(index)
                                return <View style={styles.DataRow} key={index.toString()}>
                                <View style={[styles.DataPicker]}>
                                    <Picker
                                        style={[styles.DataInput]}
                                        selectedValue={props.values.id_exercicio[index]}
                                        onValueChange={text => props.setFieldValue('id_exercicio['+ index.toString()+ ']', text)}
                                    >
                                        <Picker.Item label='Selecione o exercício' value='' />
                                        {exercicios.map((exercicio) => {
                                            return <Picker.Item label={exercicio.nome} value={exercicio.id} key={exercicio.id.toString()}/>
                                        })}
                                    </Picker>
                                    { props.errors.id_exercicio && <Text style={fonts.ErrorMessage}>{props.errors.id_exercicio}</Text> }
                                </View>
                                <View style={[styles.Data]}>
                                    <TextInput 
                                        placeholder="Duração (mins)"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        keyboardType='number-pad'
                                        style={[styles.DataInput]}
                                        value={props.values.duracao_exercicio[index]}
                                        onChangeText={text => props.setFieldValue('duracao_exercicio[' + index + ']', text)}
                                    />
                                    { props.errors.duracao_exercicio && <Text style={fonts.ErrorMessage}>{props.errors.duracao_exercicio}</Text> }
                                </View>
                            </View>
                            })}
                            {/*  */}
                            <View style={styles.Data}>
                                <TouchableOpacity 
                                    style={styles.AddHorario}
                                    onPress={AddMore}
                                >
                                    <Text style={styles.AddHorarioText}>Adicionar treino</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {/* footer */}
                <View style={styles.Footer}>
                    <View style={[styles.Section, styles.LastSection]}>
                        <View style={[buttons.LargueOutlineButtonContainer]}>
                            
                            <TouchableOpacity
                            accessibilityLabel="Adicionar treino"
                            style={[buttons.LargueOutlineButton, {borderColor: TreinoColor}]}
                            onPress={props.handleSubmit}
                            >
                                <Text style={[buttons.LargueOutlineButtonText, {color: TreinoColor}]}>Cadastrar plano</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

TreinoForm.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Cadastrar treino',
            headerStyle: {backgroundColor: TreinoColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome: '', id_exercicio: [''], duracao_exercicio: ['']}),

    validationSchema: Yup.object().shape({
        nome: Yup.string()
            .required('Preencha o campo nome'),
        id_exercicio: Yup.array()
            .required('Preencha o campo de exercício')
            .min(1),
        duracao_exercicio: Yup.array()
            .required('Preencha o campo duração do exercício')
            .min(1),
      }),
  
    handleSubmit: (values, props) => {
        console.log(values)
        let treinoExercicio = {id_exercicio: values.id_exercicio, duracao_exercicio: values.duracao_exercicio}
        delete values.id_exercicio
        delete values.duracao_exercicio
        TreinoService.post(values).then((resultsTreino) => {
            if ('error' in resultsTreino) {
                Alert.alert('Não foi possível cadastrar o treino', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                treinoExercicio.id_treino = resultsTreino[0].id
                console.log(resultsTreino)
                console.log(treinoExercicio)
                for (let i = 0; i < treinoExercicio.id_exercicio.length; i++) {
                    let newObj = {id_treino: resultsTreino[0].id, id_exercicio: treinoExercicio.id_exercicio[i], duracao_exercicio: parseInt(treinoExercicio.duracao_exercicio[i])}
                    console.log()
                    TreinoExercicioService.post(newObj).then((resultsExercicio) => {
                        if ('error' in resultsExercicio) {
                            Alert.alert('Não foi possível cadastrar o treino', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => props.props.navigation.goBack()
                                }],
                                {cancelable: false},
                            )
                        } 
                    }).catch((error) => {
                        console.log(error)
                        Alert.alert('Não foi possível cadastrar o treino', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                            [{
                                text: 'Ok',
                                onPress: () => props.props.navigation.goBack()
                            }],
                            {cancelable: false},
                        )
                    })


                    Alert.alert('Treino cadastrado com sucesso', 'Agora você pode vincular esse treino com suas aulas.', 
                        [{
                            text: 'Ok',
                            onPress: () => props.props.navigation.goBack()
                        }],
                        {cancelable: false},
                    )
                }
            }
            
        }).catch((error) => {
            console.log(error)
            Alert.alert('Não foi possível cadastrar o treino', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )

        })
    }
})(TreinoForm);