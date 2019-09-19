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
    PlanoColor
} from '../../../shared/styles/colors'

import { withFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AulaService from '../../../services/AulaService';
import PlanoService from '../../../services/PlanoService';
import PlanoAulaService from '../../../services/PlanoAulaService';

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

const PlanoForm = (props) => {

    const [aulas, setAulas] = useState([])
    const [addMore, setAddMore] = useState({data : [0]})

    async function fetchData() {
        await AulaService.list().then((res) => setAulas(res)).catch((error) => console.log(error));
    }

    const AddMore = () => {
        const newObj = {data: addMore.data}
        newObj.data.push(newObj.data[newObj.data.length - 1] + 1)

        props.values.id_aula.push('')
        props.values.quantidade.push('')

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
                    <Text style={[fonts.Title, {color: PlanoColor}]}>Plano</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar um novo plano</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Descrição do plano</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="Nome do plano"
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
                                    placeholder="Descrição do plano"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    multiline={true}
                                    style={styles.DataInput}
                                    value={props.values.descricao}
                                    onChangeText={text => props.setFieldValue('descricao', text)}
                                />
                                { props.errors.descricao && <Text style={fonts.ErrorMessage}>{props.errors.descricao}</Text> }
                            </View>
                        </View>
                    </View>

                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Aulas do plano</Text>
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
                                        selectedValue={props.values.id_aula[index]}
                                        onValueChange={text => props.setFieldValue('id_aula['+ index.toString()+ ']', text)}
                                    >
                                        <Picker.Item label='Selecione a aula' value='' />
                                        {aulas.map((aula) => {
                                            return <Picker.Item label={aula.nome} value={aula.id} key={aula.id.toString()}/>
                                        })}
                                    </Picker>
                                    { props.errors.id_aula && <Text style={fonts.ErrorMessage}>{props.errors.id_aula}</Text> }
                                </View>
                                <View style={[styles.Data]}>
                                    <TextInput 
                                        placeholder="Quantidade de aula"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        keyboardType='number-pad'
                                        style={[styles.DataInput]}
                                        value={props.values.quantidade[index]}
                                        onChangeText={text => props.setFieldValue('quantidade[' + index + ']', text)}
                                    />
                                    { props.errors.quantidade && <Text style={fonts.ErrorMessage}>{props.errors.quantidade}</Text> }
                                </View>
                            </View>
                            })}
                            {/*  */}
                            <View style={styles.Data}>
                                <TouchableOpacity 
                                    style={styles.AddHorario}
                                    onPress={AddMore}
                                >
                                    <Text style={styles.AddHorarioText}>Adicionar aula</Text>
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
                            accessibilityLabel="Adicionar turma"
                            style={[buttons.LargueOutlineButton, {borderColor: PlanoColor}]}
                            onPress={props.handleSubmit}
                            >
                                <Text style={[buttons.LargueOutlineButtonText, {color: PlanoColor}]}>Cadastrar plano</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

PlanoForm.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Cadastrar plano',
            headerStyle: {backgroundColor: PlanoColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome: '', descricao: '', id_aula: [''], quantidade: ['']}),

    validationSchema: Yup.object().shape({
        nome: Yup.string()
            .required('Preencha o campo nome'),
        descricao: Yup.string()
            .required('Preencha o campo descrição'),
        id_aula: Yup.array()
            .required('Preencha o campo aula')
            .min(1),
        quantidade: Yup.array()
            .required('Preencha o campo dia da semana')
            .min(1),
      }),
  
    handleSubmit: (values, props) => {
        console.log(values);
        values.id_tipo_plano = 1
        let plano_aula = {
            id_aula: [],
            quantidade: [],
            id_plano: 0
        }
        values.id_aula.map((aula) => {
            plano_aula.id_aula.push(parseInt(aula))
        })

        values.quantidade.map((qnt) => {
            plano_aula.quantidade.push(parseInt(qnt))
        })

        delete values.id_aula
        delete values.quantidade
        console.log(plano_aula)
        console.log(values)
        PlanoService.post(values).then((resultsPlano) => {
            console.log(resultsPlano)
            if ('error' in resultsPlano) {
                Alert.alert('Não foi possível cadastrar o plano', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                plano_aula.id_plano = resultsPlano[0].id
                for (let i = 0; i < plano_aula.id_aula.length; i++) {
                    let aux = {id_plano: plano_aula.id_plano, id_aula: plano_aula.id_aula[i], quantidade: plano_aula.quantidade[i]}
                    PlanoAulaService.post(aux).then((resultsPlanoAula) => {
                        console.log(aux)
                        if ('error' in resultsPlanoAula) {
                            Alert.alert('Não foi possível cadastrar o plano', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => props.props.navigation.goBack()
                                }],
                                {cancelable: false},
                            )
                            
                        }
                    }).catch((error) => {
                        Alert.alert('Não foi possível cadastrar o plano', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                            [{
                                text: 'Ok',
                                onPress: () => props.props.navigation.goBack()
                            }],
                            {cancelable: false},
                        )
                        console.log(error)
                    })
                }
                Alert.alert('Cadastrado com sucesso!', 'Agora você o plano estará disponível para os alunos.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            }
        }).catch((error) => {
            Alert.alert('Não foi possível cadastrar o plano', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
            console.log(error)
        })
    }
})(PlanoForm);