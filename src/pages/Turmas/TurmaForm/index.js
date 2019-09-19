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
import PerfilService from '../../../services/PerfilService';
import TurmaService from '../../../services/TurmaService';
import HorarioTurmaService from '../../../services/HorarioTurmaService';


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

const TurmaForm = (props) => {

    const [aulas, setAulas] = useState([])
    const [professores, setProfessores] = useState([])
    const [showDatetime, setShowDatetime] = useState({data: [false]})
    const [addMore, setAddMore] = useState({data : [0]})

    async function fetchData() {
        await AulaService.list().then((res) => setAulas(res)).catch((error) => console.log(error));
        await PerfilService.listProfessor().then((res) => setProfessores(res)).catch((error) => console.log(error));
    }

    function setTime(id, date){
        console.log(id)
        let horario_inicio = 'horario_inicio[' + id.toString() + ']'
        console.log(horario_inicio)
    
        props.setFieldValue(('horario_inicio[' + id.toString() + ']'), date)
        console.log('horario_inicio[' + id.toString() + ']')
    }

    cancelDateTimePicker = (id) => {
        const newShowDateTime = {data: showDatetime.data}
        newShowDateTime.data[id] = false
        console.log(newShowDateTime)
        setShowDatetime(newShowDateTime);
    }


    const AddMore = () => {
        const newObj = {data: addMore.data}
        newObj.data.push(newObj.data[newObj.data.length - 1] + 1)

        const newShowDateTime = {data: showDatetime.data}
        newShowDateTime.data.push(false)
        setShowDatetime(newShowDateTime);

        props.values.horario_inicio.push(new Date('2020-06-12T00:00:00'))
        props.values.dia_semana.push('')

        console.log(props.values.horario_inicio)
        console.log(props.values.dia_semana)
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
                    <Text style={[fonts.Title, {color: PlanoColor}]}>Turma</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar uma nova turma</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Descrição da turma</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="Nome da turma"
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
                                    placeholder="Descrição da turma"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    multiline={true}
                                    style={styles.DataInput}
                                    value={props.values.descricao}
                                    onChangeText={text => props.setFieldValue('descricao', text)}
                                />
                                { props.errors.descricao && <Text style={fonts.ErrorMessage}>{props.errors.descricao}</Text> }
                            </View>
                            <View style={[styles.Data, styles.DataPicker]}>
                                <Picker
                                    style={styles.DataInput}
                                    selectedValue={props.values.id_aula}
                                    onValueChange={text => props.setFieldValue('id_aula', text)}
                                >
                                    <Picker.Item label='Selecione a aula' value='' />
                                    {aulas.map((aula) => {
                                        return <Picker.Item label={aula.nome} value={aula.id} key={aula.id.toString()}/>
                                    })}
                                </Picker>
                                { props.errors.id_aula && <Text style={fonts.ErrorMessage}>{props.errors.id_aula}</Text> }
                            </View>
                            <View style={[styles.Data, styles.DataPicker]}>
                                <Picker
                                    style={styles.DataInput}
                                    selectedValue={props.values.id_professor}
                                    onValueChange={text => props.setFieldValue('id_professor', text)}
                                >
                                    <Picker.Item label='Selecione o professor' value='' />
                                    {professores.map((professor) => {
                                        return <Picker.Item label={professor.nome_completo} value={professor.id} key={professor.id.toString()}/>
                                    })}
                                </Picker>
                                { props.errors.id_professor && <Text style={fonts.ErrorMessage}>{props.errors.id_professor}</Text> }
                            </View>
                        </View>
                    </View>

                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Horário das aulas</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            {addMore.data.map((index) => {
                                console.log(index)
                                return <View style={styles.DataRow} key={index.toString()}>
                                <View style={[styles.Data, styles.DataPicker]}>
                                    <Picker
                                        style={styles.DataInput}
                                        selectedValue={props.values.dia_semana[index]}
                                        onValueChange={text => props.setFieldValue(('dia_semana[' + index.toString() + ']'), text)}
                                    >
                                        <Picker.Item label='Selecione' value='' />
                                        <Picker.Item label='Segunda-Feira' value='Segunda-Feira' />
                                        <Picker.Item label='Terça-Feira' value='Terça-Feira' />
                                        <Picker.Item label='Quarta-Feira' value='Quarta-Feira' />
                                        <Picker.Item label='Quinta-Feira' value='Quinta-Feira' />
                                        <Picker.Item label='Sexta-Feira' value='Sexta-Feira' />
                                        <Picker.Item label='Sábado' value='Sábado' />
                                        <Picker.Item label='Domingo' value='Domingo' />
                                    </Picker>
                                    { props.errors.dia_semana && <Text style={fonts.ErrorMessage}>{props.errors.dia_semana}</Text> }
                                </View>
                                <View style={[styles.Data, styles.DateTimeBox, {paddingVertical: 10}]}>
                                    <TouchableOpacity 
                                        style={[styles.DateTimeInput]}
                                        onPress={() => {
                                            const newObj = {data: showDatetime.data}
                                            newObj.data[index] = true
                                            console.log(newObj)
                                            setShowDatetime(newObj)
                                        }}
                                    >
                                        <Icon name='clock' size={15} style={{paddingHorizontal: 5}} /><Text>{props.values.horario_inicio[index] ? props.values.horario_inicio[index].getHours().toString() + ':' +  props.values.horario_inicio[index].getMinutes().toString() : 'Hora'}</Text>
                                    </TouchableOpacity>
                                    {showDatetime.data[index] && <DateTimePicker 
                                        value={props.values.horario_inicio[index]}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, date) => {
                                            if (event.type == 'set') {
                                                setTime(index, date)
                                                console.log('horario_inicio[' + index.toString() + ']')
                                            }
                                            cancelDateTimePicker(index)
                                        }}
                                        />}
                                </View>
                            </View>
                            })}
                            { props.errors.dia_semana && <Text style={fonts.ErrorMessage}>{props.errors.dia_semana}</Text> }
                            {/*  */}
                            <View style={styles.Data}>
                                <TouchableOpacity 
                                    style={styles.AddHorario}
                                    onPress={AddMore}
                                >
                                    <Text style={styles.AddHorarioText}>Adicionar horário</Text>
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
                                <Text style={[buttons.LargueOutlineButtonText, {color: PlanoColor}]}>Cadastrar turma</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

TurmaForm.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Cadastrar turma',
            headerStyle: {backgroundColor: PlanoColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome: '', descricao: '', horario_inicio: [new Date('2020-06-12T00:00:00')], dia_semana: [''], id_aula: '', id_professor: ''}),

    validationSchema: Yup.object().shape({
        nome: Yup.string()
            .required('Preencha o campo nome'),
        descricao: Yup.string()
            .required('Preencha o campo descrição'),
        horario_inicio: Yup.array()
            .required('Preencha o campo horario')
            .min(1),
        dia_semana: Yup.array()
            .required('Preencha o campo dia da semana')
            .min(1),
        id_aula: Yup.string()
            .required('Preencha o campo aula'),
        id_professor: Yup.string()
            .required('Preencha o campo professor')
      }),
  
    handleSubmit: (values, props) => {
        console.log(values);
        let newHorario = {
            horario_inicio: [],
            dia_semana: [],
        }
        values.horario_inicio.map((horario) => {
            newHorario.horario_inicio.push(horario.getHours().toString() + ':' + horario.getMinutes().toString() + ':' + horario.getSeconds().toString())
        })

        values.dia_semana.map((dia) => {
            newHorario.dia_semana.push(dia)
        })

        delete values.horario_inicio
        delete values.dia_semana

        TurmaService.post(values).then((resultsTurma) => {
            console.log(resultsTurma)
            if ('error' in resultsTurma) {
                Alert.alert('Não foi possível cadastrar a turma', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                newHorario.id_turma = resultsTurma[0].id
                for (let i = 0; i < newHorario.horario_inicio.length; i++) {
                    let aux = {id_turma: newHorario.id_turma, horario_inicio: newHorario.horario_inicio[i], dia_semana: newHorario.dia_semana[i]}
                    HorarioTurmaService.post(aux).then((resultsHorario) => {
                        console.log(aux)
                        if ('error' in resultsHorario) {
                            Alert.alert('Não foi possível cadastrar a turma', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => props.props.navigation.goBack()
                                }],
                                {cancelable: false},
                            )
                            
                        }
                    }).catch((error) => {
                        Alert.alert('Não foi possível cadastrar a turma', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                            [{
                                text: 'Ok',
                                onPress: () => props.props.navigation.goBack()
                            }],
                            {cancelable: false},
                        )
                        console.log(error)
                    })
                }
                Alert.alert('Cadastrado com sucesso!', 'Agora você pode vincular os alunos com essa turma.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            }
        }).catch((error) => {
            Alert.alert('Não foi possível cadastrar a turma', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
            console.log(error)
        })
        console.log(newHorario);
        console.log(values)
    }
})(TurmaForm);