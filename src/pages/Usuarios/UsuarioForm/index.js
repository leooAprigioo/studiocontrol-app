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
    AlunoColor, 
    ProfessorColor
} from '../../../shared/styles/colors'

import { withFormik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInputMask } from 'react-native-masked-text'

import PerfilService from '../../../services/PerfilService';
import AlunoService from '../../../services/AlunoService';
import ProfessorService from '../../../services/ProfessorService';
import TelefoneService from '../../../services/TelefoneService';
import PlanoService from '../../../services/PlanoService';


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

const UsuarioForm = (props) => {

    const [user_type, setUser_Type] = useState([])
    const [showDatetime, setShowDatetime] = useState({data: false})
    const [labelChange, setLabelChange] = useState(false)
    const [planos, setPlanos] = useState([])

    async function fetchData() {
        const user_type = props.navigation.getParam('user_type', 'aluno')
        setUser_Type(user_type);

        await PlanoService.list_pre_cadastrado().then((res) => {console.log(res); setPlanos(res)}).catch((error) => {console.log(error)})
    }

    toggleDateTimePicker = (isOpen) => {
        const newShowDateTime = {data: showDatetime.data}
        newShowDateTime.data = isOpen
        console.log(newShowDateTime)
        setShowDatetime(newShowDateTime);
    }

    useEffect(() => {
        fetchData()
    },[])

    return (
        
        <ScrollView>
            {/* container */}
            {console.log(planos)}
            <View style={styles.Container}>
                {/* header */}
                <View style={styles.Header}>
                    <Text style={[fonts.Title, {color: user_type == 'aluno' ? AlunoColor : ProfessorColor}]}>{user_type == 'aluno' ? "Aluno" : "Professor"}</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar um novo {user_type == 'aluno' ? "aluno" : "professor"}</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Dados Pessoais</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="Nome completo"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    style={styles.DataInput}
                                    value={props.values.nome_completo}
                                    onChangeText={text => props.setFieldValue('nome_completo', text)}
                                />
                                { props.errors.nome_completo && <Text style={fonts.ErrorMessage}>{props.errors.nome_completo}</Text> }
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder="E-mail"
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    style={styles.DataInput}
                                    value={props.values.email}
                                    onChangeText={text => props.setFieldValue('email', text)}
                                />
                                { props.errors.email && <Text style={fonts.ErrorMessage}>{props.errors.email}</Text> }
                            </View>
                            <View style={styles.Data}>
                                <TextInputMask
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',
                                        withDDD: true,
                                        dddMask: '(99) '
                                    }}
                                    style={styles.DataInput}
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    maxLength={15}
                                    placeholder='Telefone'
                                    includeRawValueInChangeText={true}
                                    value={props.values.telefone}
                                    onChangeText={(text, textRaw) => props.setFieldValue('telefone', textRaw)}
                                />
                                { props.errors.telefone && <Text style={fonts.ErrorMessage}>{props.errors.telefone}</Text> }
                            </View>
                            <View style={[styles.Data, styles.DateTimeBox, {paddingVertical: 10}]}>
                                <TouchableOpacity 
                                    style={[styles.DateTimeInput]}
                                    onPress={() => {
                                        toggleDateTimePicker(true)
                                    }}
                                >
                                    <Icon name='calendar-alt' size={15} style={{marginHorizontal: 5}} />
                                    <Text>
                                    {
                                        labelChange ?
                                         props.values.data_nascimento ? props.values.data_nascimento.getDate().toString() + '/' +  props.values.data_nascimento.getMonth().toString() + '/' + props.values.data_nascimento.getFullYear().toString() : 'Data de nascimento'
                                         :
                                         "Data de nascimento"
                                    }
                                    </Text>
                                    
                                </TouchableOpacity>
                                {showDatetime.data && <DateTimePicker   
                                    value={props.values.data_nascimento}
                                    mode='date'
                                    minimumDate={new Date(1900, 1, 1)}
                                    maximumDate={new Date()}
                                    display="spinner"
                                    onChange={(event, date) => {
                                        if (event.type == 'set') {
                                            props.setFieldValue(('data_nascimento'), date)
                                            setLabelChange(true)
                                        }
                                        toggleDateTimePicker(false)
                                    }}
                                    />}
                            </View>
                            <View style={styles.DataRow}>
                                <View style={styles.Data}>
                                    <TextInput 
                                        placeholder="RG"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        keyboardType='numeric'
                                        style={styles.DataInput}
                                        value={props.values.rg}
                                        onChangeText={text => props.setFieldValue('rg', text)}
                                    />
                                    { props.errors.rg && <Text style={fonts.ErrorMessage}>{props.errors.rg}</Text> }
                                </View>
                                <View style={styles.Data}>
                                    <TextInputMask
                                        type={'cpf'}
                                        style={styles.DataInput}
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        maxLength={14}
                                        placeholder='CPF'
                                        value={props.values.cpf}
                                        includeRawValueInChangeText={true}
                                        onChangeText={(text, rawText) => {props.setFieldValue('cpf', rawText)}}
                                    />
                                    { props.errors.cpf && <Text style={fonts.ErrorMessage}>{props.errors.cpf}</Text> }
                                </View>
                            </View>
                        </View>
                    </View>
                {
                    user_type == 'aluno' ?
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Plano</Text>
                            <Text>Informe o plano que o aluno ira aderir</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            <View style={[styles.Data, styles.DataPicker]}>
                                <Picker
                                    style={styles.DataInput}
                                    selectedValue={props.values.id_plano}
                                    onValueChange={text => props.setFieldValue('id_plano', text)}
                                >
                                    <Picker.Item label='Selecione o professor' value='' />
                                    {planos.map((plano) => {
                                        return <Picker.Item label={plano.nome} value={plano.id} key={plano.id.toString()}/>
                                    })}
                                </Picker>
                                { props.errors.id_plano && <Text style={fonts.ErrorMessage}>{props.errors.id_plano}</Text> }
                            </View>
                        </View>
                    </View>
                    :
                    <View></View>
                }
                    
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>{user_type == 'aluno' ? "Objetivo": "Graduação"}</Text>
                            <Text>{user_type == 'aluno' ? "Informe o objetivo do aluno": "Informe a graduação do professor"}</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}

                            {/*  */}
                            <View style={styles.Data}>
                                <TextInput 
                                    placeholder={user_type == 'aluno' ? "Objetivo": "Graduação"}
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    style={styles.DataInput}
                                    value={props.values.complemento_aluno_prof}
                                    onChangeText={text => props.setFieldValue('complemento_aluno_prof', text)}
                                />
                                { props.errors.complemento_aluno_prof && <Text style={fonts.ErrorMessage}>{props.errors.complemento_aluno_prof}</Text> }
                            </View>
                        </View>
                    </View>
                </View>
                {/* footer */}
                <View style={styles.Footer}>
                    <View style={[styles.Section, styles.LastSection]}>
                        <View style={[buttons.LargueOutlineButtonContainer]}>
                            
                            <TouchableOpacity
                            accessibilityLabel="Adicionar"
                            style={[buttons.LargueOutlineButton, {borderColor: user_type == 'aluno' ? AlunoColor : ProfessorColor}]}
                            onPress={props.handleSubmit}
                            >
                                <Text style={[buttons.LargueOutlineButtonText, {color: user_type == 'aluno' ? AlunoColor : ProfessorColor}]}>Cadastrar {user_type == 'aluno' ? 'aluno' : 'professor' }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

UsuarioForm.navigationOptions = ({ navigation }) => {
    const user_type = navigation.getParam('user_type', 'aluno')
    return {
            headerTitle: user_type == 'aluno' ? 'Cadastrar aluno' : 'Cadastrar professor',
            headerStyle: {backgroundColor: user_type == 'aluno' ? AlunoColor : ProfessorColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome_completo: '', email: '', data_nascimento: new Date(), rg: '', cpf: '', complemento_aluno_prof: ''}),

    validationSchema: Yup.object().shape({
        nome_completo: Yup.string()
            .required('Preencha o campo nome'),
        email: Yup.string()
            .email('Insira um e-mail válido')
            .required('Preencha o campo e-mail'),
        data_nascimento: Yup.date()
            .required('Preencha o campo data de nascimento'),
        rg: Yup.string()
            .required('Preencha o campo RG')
            .min(1),
        cpf: Yup.string()
            .required('Preencha o campo CPF'),
      }),
  
    handleSubmit: (values, props) => {
        console.log(values)
        let usuario = {}
        let telefone = {telefone: values.telefone}
        let now = new Date()
        const user_type = props.props.navigation.getParam('user_type', 'aluno')
        if (user_type == 'aluno') {
            usuario.objetivo = values.complemento_aluno_prof
            if (values.id_plano == '') {
                usuario.id_plano = 1;    
            } else {
                usuario.id_plano = values.id_plano;
            }
        }  else {
            usuario.graduacao = values.complemento_aluno_prof
        } 
        values.ativo = 1
        values.data_cadastro = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString() + '-' + now.getDate().toString()
        values.data_nascimento = values.data_nascimento.getFullYear().toString() + '-' + (values.data_nascimento.getMonth() + 1).toString() + '-' + values.data_nascimento.getDate().toString()
        delete values.complemento_aluno_prof
        delete values.telefone 
        delete values.id_plano     
        console.log(values)
        console.log(usuario)
        console.log(telefone)
        PerfilService.post(values).then((resultsPerfil) => {
            if ('error' in resultsPerfil) {
                Alert.alert('Não foi possível cadastrar o aluno', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
                return false
            } 
            usuario.id_perfil = resultsPerfil[0].id
            telefone.id_perfil = resultsPerfil[0].id
            console.log(resultsPerfil)
            TelefoneService.post(telefone).then((resultsTelefone) => {
                if ('error' in resultsTelefone) {
                    Alert.alert('Não foi possível cadastrar o telefone', 'Pedimos desculpas pelo transtorno. Não se preocupe, o telefone pode ser cadastrado mais tarde.', 
                        [{
                            text: 'Ok',
                            onPress: () => props.props.navigation.goBack()
                        }],
                        {cancelable: false},
                    )
                    return false
                } else {
                    if (user_type == 'aluno') {
                        AlunoService.post(usuario).then((resultsAluno) => {
                            if ('error' in resultsAluno) {
                                Alert.alert('Não foi possível cadastrar o usuario', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                    [{
                                        text: 'Ok',
                                        onPress: () => props.props.navigation.goBack()
                                    }],
                                    {cancelable: false},
                                )
                                return false
                            } else {
                                props.props.navigation.navigate('UsuarioResult', {user_type: user_type, id_perfil: resultsPerfil[0].id, id_aluno_prof: resultsAluno[0].id })
                            }
                            console.log(resultsAluno)
                        }).catch((error) => {
                            Alert.alert('Não foi possível cadastrar o aluno', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => props.props.navigation.goBack()
                                }],
                                {cancelable: false},
                            )
                            console.log(error)
                            return false
                        })
                    } else {
                        ProfessorService.post(usuario).then((resultsProfessor) => {
                            if ('error' in resultsProfessor) {
                                Alert.alert('Não foi possível cadastrar o usuario', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                    [{
                                        text: 'Ok',
                                        onPress: () => props.props.navigation.goBack()
                                    }],
                                    {cancelable: false},
                                )
                                return false
                            } else {
                                props.props.navigation.navigate('UsuarioResult', {user_type: user_type, id_perfil: resultsPerfil[0].id, id_aluno_prof: resultsProfessor[0].id })
                            }
                        }).catch((error) => {
                            Alert.alert('Não foi possível cadastrar o professor', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => props.props.navigation.goBack()
                                }],
                                {cancelable: false},
                            )
                            console.log(error)
                            return false
                        })
                    }
                }
            }).catch((error) => {
                Alert.alert('Não foi possível cadastrar o telefone', 'Pedimos desculpas pelo transtorno. Não se preocupe, o telefone pode ser cadastrado mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
                console.log(error)
                return false
            })

        }).catch((error) => {
            Alert.alert('Não foi possível cadastrar o usuario', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
            console.log(error)
            return false
        })
    }
})(UsuarioForm);