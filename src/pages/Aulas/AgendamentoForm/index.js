import React, {useState, useEffect, useRef} from 'react';

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
    PlanoColor, AulaColor
} from '../../../shared/styles/colors'

import { withFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AulaService from '../../../services/AulaService';
import AgendamentoService from '../../../services/AgendamentoService';
import TreinoService from '../../../services/TreinoService';
import PerfilService from '../../../services/PerfilService';

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

const AgendamentoForm = (props) => {

    const [aulas, setAulas] = useState([])
    const [aluno, setAluno] = useState([])
    const [aulasRestantes, setAulasRestantes] = useState([])
    const [professores, setProfessores] = useState([])
    const [treinos, setTreinos] = useState([])
    const [horarios, setHorarios] = useState([])
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [showDatetime, setShowDatetime] = useState({data: false})
    const [disabledDateTime, setDisabledDateTime] = useState({data: true})
    const [labelChange, setLabelChange] = useState(false)
    const [datas, setDatas] = useState([])
    const showDatetimeRef = useRef(null)

    const toogleDateTime = (state) => {
        setShowDatetime(state);
    }

    function generateHours() {
        let hours = []
        for (let i = 6; i <= 23; i++) {
            hours.push(((i < 10?'0':'') + i.toString() + ":00" ))
        }
        console.log(hours)
        return hours
    }

    function getAulaDisponivel(agendamento) {
        let disponivel = false
        aulas.map((aula) => {
            if (agendamento.id_aula === aula.id_aula) {
                if (agendamento.quantidade_agendados < aula.limite_alunos) {
                    console.log(agendamento.quantidade_agendados)
                    console.log(aula.limite_alunos)
                    disponivel = true
                } 
            }
        })
        return disponivel
    }

    function changeHorariosDisponiveis(date, id_aula) {
        let shortDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
        let horarioDisponivel = generateHours()
        console.log(horarios)
        horarios.map((horario) => {
            let shortHorario = horario.data_horario.getFullYear().toString() + '-' + (horario.data_horario.getMonth() + 1).toString() + '-' + horario.data_horario.getDate().toString()
            console.log(shortDate)
            console.log(horario)
            if (shortDate === shortHorario && id_aula === horario.id_aula) {

                if (!getAulaDisponivel(horario)) {
                    let horarioValue = ((horario.data_horario.getHours() < 10?'0':'') + horario.data_horario.getHours().toString() + ":" + (horario.data_horario.getMinutes() < 10 ? '0' : '') + horario.data_horario.getMinutes().toString())
                    let horarioIdx = horarioDisponivel.indexOf(horarioValue)
                    horarioDisponivel.splice(horarioIdx, 1)
                    console.log(horarioValue)
                    console.log(horarioDisponivel)
                    console.log(horarioIdx)
                }
            }
        })
        console.log(horarioDisponivel)
        setHorariosDisponiveis(horarioDisponivel);
    }

    function getAulasRestantes(aulas) {
        let aulasDisponiveis = []
        aulas.map((aula) => {
            console.log(aula)
            if (aula.aulas_restantes > 0) {
                aulasDisponiveis.push(aula)
            }
        })
        console.log(aulasDisponiveis)
        setAulasRestantes(aulasDisponiveis)

    }

    function horarioToDateTime(agendamentos) {
        agendamentos.map((agendamento) => {
            agendamento.data_horario = new Date(agendamento.data_horario);
        })
        return agendamentos
    }

    function semanaToDateTime(agendamentos) {
        agendamentos.map((agendamento) => {
            agendamento.inicio_semana = new Date(agendamento.inicio_semana);
            agendamento.fim_semana = new Date(agendamento.fim_semana);
        })
        return agendamentos
    }

    async function fetchData() {

        const aluno = props.navigation.getParam('aluno');
        console.log(aluno)
        setAluno(aluno)
        await AulaService.listByAluno(aluno.id).then((res) => {setAulas(res); getAulasRestantes(res);}).catch((error) => console.log(error));
        await AgendamentoService.listAgendados().then((res) => {res = horarioToDateTime(res); setHorarios(res)}).catch((error) => console.log(error));
        await AgendamentoService.getSemana().then((res) => {res = semanaToDateTime(res); setDatas(res)}).catch((error) => console.log(error));
        await PerfilService.listProfessor().then((res) => setProfessores(res)).catch((error) => console.log(error));
        await TreinoService.list().then((res) => setTreinos(res)).catch((error) => console.log(error));
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
                    <Text style={[fonts.Title, {color: AulaColor}]}>Agendamento de aula</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar um novo agendamento</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    {console.log(aulas)}
                    <View style={styles.Section}>

                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}            

                            <View style={[styles.DataPicker]}>
                                <Picker
                                    style={[styles.DataInput]}
                                    selectedValue={props.values.id_aula}
                                    onValueChange={text => {props.setFieldValue('id_aula', text); text != '' ? setDisabledDateTime({data: false}) : setDisabledDateTime({data: true})}}
                                >
                                    <Picker.Item label='Selecione a aula' value='' />
                                    {aulasRestantes.map((aula) => {
                                        return <Picker.Item label={aula.nome_aula} value={aula.id_aula} key={aula.id_aula.toString()}/>
                                    })}
                                </Picker>
                                { props.errors.id_aula && <Text style={fonts.ErrorMessage}>{props.errors.id_aula}</Text> }
                            </View>
                            <View style={[styles.DataPicker]}>
                                <Picker
                                    style={[styles.DataInput]}
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
                            <View style={[styles.DataPicker]}>
                                <Picker
                                    style={[styles.DataInput]}
                                    selectedValue={props.values.id_treino}
                                    onValueChange={text => props.setFieldValue('id_treino', text)}
                                >
                                    <Picker.Item label='Selecione o treino' value='' />
                                    {treinos.map((treino) => {
                                        return <Picker.Item label={treino.nome} value={treino.id} key={treino.id.toString()}/>
                                    })}
                                </Picker>
                                { props.errors.id_treino && <Text style={fonts.ErrorMessage}>{props.errors.id_treino}</Text> }
                            </View>
                        </View>
                        <View style={styles.DataRow}>
                            <View style={[styles.Data, styles.DateTimeBox, {paddingVertical: 10}]}>
                                <TouchableOpacity 
                                    style={[styles.DateTimeInput]}
                                    disabled={disabledDateTime.data}
                                    onPress={() => {
                                        setShowDatetime({data: true})
                                    }}
                                >
                                    <Icon name='calendar-alt' size={15} style={{marginHorizontal: 5}} />
                                    <Text>
                                    {
                                        disabledDateTime.data ?
                                            "Selecione a aula":
                                            labelChange ?
                                                props.values.data ? props.values.data.getDate().toString() + '/' +  props.values.data.getMonth().toString() + '/' + props.values.data.getFullYear().toString() : 'Dia da aula'
                                                :
                                                "Dia da aula"
                                    }
                                    </Text>
                                    
                                </TouchableOpacity>
                                <View ref={showDatetimeRef}>
                                    {showDatetime.data && <DateTimePicker  
                                        value={props.values.data}
                                        mode='date'
                                        minimumDate={datas && datas.length > 0? datas[0].inicio_semana: new Date()}
                                        maximumDate={datas && datas.length > 0? datas[0].fim_semana: new Date(2099, 12, 31)}
                                        display="default"
                                        onChange={(event, date) => {
                                            if (event.type == 'set') {
                                                props.setFieldValue(('data'), date)
                                                console.log(date)
                                                changeHorariosDisponiveis(date, props.values.id_aula)
                                                setLabelChange(true)
                                            }
                                            setShowDatetime({data: false});
                                        }}
                                        />}
                                </View>
                            </View>

                            
                            <View style={[styles.DataPicker]}>
                                <Picker
                                    style={[styles.DataInput]}
                                    selectedValue={props.values.hora}
                                    onValueChange={text => props.setFieldValue('hora', text)}
                                >
                                    <Picker.Item label='Selecione o horário' value='' />
                                    {
                                        (horariosDisponiveis && horariosDisponiveis.length > 0) ? horariosDisponiveis.map((horario) => {
                                            // return <Picker.Item label={
                                            //     ((horario.data_horario.getHours() < 10?'0':'') + horario.data_horario.getHours().toString() + ":" + (horario.data_horario.getMinutes() < 10 ? '0' : '') + horario.data_horario.getMinutes().toString())
                                            // } value={
                                            //     ((horario.data_horario.getHours() < 10?'0':'') + horario.data_horario.getHours().toString() + ":" + (horario.data_horario.getMinutes() < 10 ? '0' : '') + horario.data_horario.getMinutes().toString())
                                            // } key={horario.id.toString()}/>

                                            return <Picker.Item label={horario} value={horario} key={horario} />
                                        }): <Picker.Item label='Não há horarios disponíveis' value='' />
                                    }
                                    
                                </Picker>
                                { props.errors.hora && <Text style={fonts.ErrorMessage}>{props.errors.hora}</Text> }
                            </View>
                            
                        </View>
                        
                    </View>
                </View>
                {/* footer */}
                <View style={styles.Footer}>
                    <View style={[styles.Section, styles.LastSection]}>
                        <View style={[buttons.LargueOutlineButtonContainer]}>
                            
                            <TouchableOpacity
                            accessibilityLabel="agendar horário"
                            style={[buttons.LargueOutlineButton, {borderColor: AulaColor}]}
                            onPress={props.handleSubmit}
                            >
                                <Text style={[buttons.LargueOutlineButtonText, {color: AulaColor}]}>Realizar agendamento</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

AgendamentoForm.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Agendar aula',
            headerStyle: {backgroundColor: AulaColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ id_aula: '', id_professor: '', id_treino: '', data: new Date(), hora: ''}),

    validationSchema: Yup.object().shape({
        id_aula: Yup.string()
            .required('Selecione a aula'),
        id_professor: Yup.string()
            .required('Selecione o professor'),
        id_treino: Yup.string()
            .required('Selecione o treino'),
        data: Yup.date()
            .required('Selecione o dia da aula'),
        hora: Yup.string()
            .required('Selecione a hora da aula'),
        }),
  
    handleSubmit: (values, props) => {
        const aluno = props.props.navigation.getParam('aluno')
        values.id_aluno = aluno.id
        values.status = 'Pendente'
        console.log(values);
        values.data_horario = (values.data.getFullYear().toString() + '-' + (values.data.getMonth() + 1).toString() + '-' + values.data.getDate().toString() + ' ' + values.hora)
        console.log(values.data_horario)
        delete values.data
        delete values.hora
    
        AgendamentoService.post(values).then((resultsAgendamento) => {
            console.log(resultsAgendamento)
            if ('error' in resultsAgendamento) {
                Alert.alert('Não foi possível realizar o agendamento', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                Alert.alert('Agendado com sucesso!', 'Você pode consultar seus agendamentos através do menu Alunos.', 
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
})(AgendamentoForm);