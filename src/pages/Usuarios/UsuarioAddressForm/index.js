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

import { withFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text'

import cep from 'cep-promise';
import EnderecoService from '../../../services/EnderecoService';

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

const UsuarioAddressForm = (props) => {

    const user_type = props.navigation.getParam('user_type', 'aluno')

    const [showAddressForm, setShowAddressForm] = useState(false)
    const [cepNotFound, setCepNotFound] = useState(false)
    const [editable, setEditable] = useState(true)

    const ClearAddressProps = () => {
        props.values.nome_rua = '';
        props.values.bairro = '';
        props.values.estado = '';
        props.values.cidade = '';
    }

    const CepSearch = ()  => {
        setEditable(true)
        ClearAddressProps
        cepNumber = props.values.cep
        cep(cepNumber).then((results) => {
            if ('CepPromiseError' in results) {
                setCepNotFound(true)
                setShowAddressForm(true)
                setEditable(true)
            } else {
                console.log(results)
                props.values.nome_rua = results.street;
                props.values.bairro = results.neighborhood;
                props.values.estado = results.state;
                props.values.cidade = results.city;
                setCepNotFound(false)
                setShowAddressForm(true)
                setEditable(false)
                console.log(props)
            }
        }).catch((error) => {
            console.log(error)
            setCepNotFound(true)
            setShowAddressForm(true)
            setEditable(true)
        })
    }

    return (
        
        <ScrollView>
            {/* container */}
            <View style={styles.Container}>
                {/* header */}
                <View style={styles.Header}>
                    <Text style={[fonts.Title, {color: user_type == 'aluno' ? AlunoColor : ProfessorColor}]}>Endereço</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para atualizar o endereço</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>CEP</Text>
                            <Text>Digite o seu CEP e tentaremos localizar seu endreço</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            {/* Data */}
                            <View style={styles.Data}>
                                <TextInputMask
                                    type={'zip-code'}
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder="Digite o seu CEP"
                                    maxLength={9}
                                    style={styles.DataInput}
                                    value={props.values.cep}
                                    includeRawValueInChangeText={true}
                                    onChangeText={(text, textRaw) => props.setFieldValue('cep', textRaw)}
                                />
                                    { (props.errors.cep && props.isSubmitting) && <Text style={fonts.ErrorMessage}>{props.errors.cep}</Text> }
                            </View>
                            <View style={styles.Data}>
                                <TouchableOpacity 
                                    style={styles.AddHorario}
                                    onPress={CepSearch}
                                >
                                    <Text style={styles.AddHorarioText}>Procurar CEP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {
                        showAddressForm ?
                        <View style={styles.Section}>
                            {/* SectionHeader */}
                            <View style={styles.SectionHeader}>
                                <Text style={styles.SectionTitle}>Endereço</Text>
                                {cepNotFound ? <Text style={fonts.ErrorMessage}>Não foi possivel localizar o CEP</Text> : <View></View>}
                            </View>
                            {/* SectionContent */}
                            <View style={styles.SectionContent}>
                                <View style={styles.Data}>
                                    <TextInput 
                                        placeholder="Nome da rua"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        editable={editable}
                                        style={styles.DataInput}
                                        value={props.values.nome_rua}
                                        onChangeText={text => props.setFieldValue('nome_rua', text)}
                                    />
                                    { props.errors.nome_rua &&  <Text style={fonts.ErrorMessage}>{props.errors.nome_rua}</Text> }
                                </View>
                                <View style={styles.DataRow}>
                                    <View style={[styles.Data, {flex:2}]}>
                                        <TextInput 
                                            placeholder="Bairro"
                                            underlineColorAndroid='#111'
                                            selectionColor='#111'
                                            editable={editable}
                                            style={styles.DataInput}
                                            value={props.values.bairro}
                                            onChangeText={text => props.setFieldValue('bairro', text)}
                                        />
                                        { props.errors.bairro && <Text style={fonts.ErrorMessage}>{props.errors.bairro}</Text> }
                                    </View>
                                    <View style={styles.Data}>
                                        <TextInput 
                                            placeholder="Numero"
                                            underlineColorAndroid='#111'
                                            selectionColor='#111'
                                            keyboardType='number-pad'
                                            style={styles.DataInput}
                                            value={props.values.numero}
                                            onChangeText={text => props.setFieldValue('numero', text)}
                                        />
                                        { props.errors.numero && <Text style={fonts.ErrorMessage}>{props.errors.numero}</Text> }
                                    </View>
                                </View>
                                <View style={styles.Data}>
                                    <TextInput 
                                        placeholder="Complementos"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        style={styles.DataInput}
                                        value={props.values.complementos}
                                        onChangeText={text => props.setFieldValue('complementos', text)}
                                    />
                                    { props.errors.complementos && <Text style={fonts.ErrorMessage}>{props.errors.complementos}</Text> }
                                </View>
                                <View style={styles.Data}>
                                    <TextInput 
                                        placeholder="Cidade"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        editable={editable}
                                        style={styles.DataInput}
                                        value={props.values.cidade}
                                        onChangeText={text => props.setFieldValue('cidade', text)}
                                    />
                                    { props.errors.cidade && <Text style={fonts.ErrorMessage}>{props.errors.cidade}</Text> }
                                </View>
                                <View style={[styles.Data, styles.DataPicker]}>
                                    <Picker
                                        style={styles.DataInput}
                                        enabled={editable}
                                        selectedValue={props.values.estado}
                                        onValueChange={text => props.setFieldValue('estado', text)}
                                    >
                                        <Picker.Item label='Selecione' value='' />
                                        <Picker.Item label='AC' value='AC' />
                                        <Picker.Item label='AL' value='AL' />
                                        <Picker.Item label='AP' value='AP' />
                                        <Picker.Item label='AM' value='AM' />
                                        <Picker.Item label='BA' value='BA' />
                                        <Picker.Item label='CE' value='CE' />
                                        <Picker.Item label='DF' value='DF' />
                                        <Picker.Item label='ES' value='ES' />
                                        <Picker.Item label='GO' value='GO' />
                                        <Picker.Item label='MA' value='MA' />
                                        <Picker.Item label='MS' value='MS' />
                                        <Picker.Item label='MT' value='MT' />
                                        <Picker.Item label='MG' value='MG' />
                                        <Picker.Item label='PA' value='PA' />
                                        <Picker.Item label='PB' value='PB' />
                                        <Picker.Item label='PR' value='PR' />
                                        <Picker.Item label='PE' value='PE' />
                                        <Picker.Item label='PI' value='PI' />
                                        <Picker.Item label='RJ' value='RJ' />
                                        <Picker.Item label='RN' value='RN' />
                                        <Picker.Item label='RS' value='RS' />
                                        <Picker.Item label='RO' value='RO' />
                                        <Picker.Item label='RR' value='RR' />
                                        <Picker.Item label='SC' value='SC' />
                                        <Picker.Item label='SP' value='SP' />
                                        <Picker.Item label='SE' value='SE' />
                                        <Picker.Item label='TO' value='TO' />
                                    </Picker>
                                </View>
                                { props.errors.estado && <Text style={fonts.ErrorMessage}>{props.errors.estado}</Text> }
                            </View>
                        </View>
                    :
                    <View></View>
                    }
                    {
                        showAddressForm ?
                        <View style={styles.Footer}>
                            <View style={[styles.Section, styles.LastSection]}>
                                <View style={[buttons.LargueOutlineButtonContainer]}>
                                    
                                    <TouchableOpacity
                                    accessibilityLabel="Atualizar endereço"
                                    style={[buttons.LargueOutlineButton, {borderColor: user_type == 'aluno' ? AlunoColor : ProfessorColor}]}
                                    onPress={props.handleSubmit}
                                    >
                                        <Text style={[buttons.LargueOutlineButtonText, {color: user_type == 'aluno' ? AlunoColor : ProfessorColor}]}>Atualizar endereço</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        :
                        <View></View>
                    }
                    {/* footer */}

                </View>
            </View>
        </ScrollView>
        
    )
}

UsuarioAddressForm.navigationOptions = ({ navigation }) => {
    const user_type = navigation.getParam('user_type', 'aluno')
    return {
        headerTitle: user_type == 'aluno' ? 'Cadastrar aluno' : 'Cadastrar professor',
        headerStyle: {backgroundColor: user_type == 'aluno' ? AlunoColor : ProfessorColor},
        headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ nome_rua: '', bairro: '', cep: '', complementos: '', numero: '', cidade: '', estado: ''}),

    validationSchema: Yup.object().shape({
        nome_rua: Yup.string()
            .required('Preencha o campo nome da rua'),
        bairro: Yup.string()
            .required('Preencha o campo bairro'),
        cep: Yup.string()
            .required('Preencha o campo CEP'),
        numero: Yup.string()
            .required('Preencha o campo numero'),
        cidade: Yup.string()
            .required('Preencha o campo cidade'),
        estado: Yup.string()
            .required('Preencha o campo estado'),
    }),
  
    handleSubmit: (values, props) => {
        console.log(values)
        
        const id_perfil = props.props.navigation.getParam('id_perfil');
        const user_type = props.props.navigation.getParam('user_type');
        const id_aluno_prof = props.props.navigation.getParam('id_aluno_prof');
        values.id_perfil = id_perfil;
        EnderecoService.post(values).then((resultsEndereco) => {
            console.log(EnderecoService)
            if ('error' in resultsEndereco) {
                Alert.alert('Não foi possível atualizar o endereço', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
                return false
            } else {
                Alert.alert('Endereço atualizado com sucesso', 'O endereço foi cadastrado com sucesso.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.navigate('UsuarioResult', {id_perfil: id_perfil, user_type: user_type, id_aluno_prof: id_aluno_prof})
                }],
                {cancelable: false},
            )
            }
        }).catch((error) => {
            Alert.alert('Não foi possível atualizar o endereço', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
        })
    }
})(UsuarioAddressForm);