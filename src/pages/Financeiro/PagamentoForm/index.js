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
    ProfessorColor,
    FinanceiroColor
} from '../../../shared/styles/colors'

import { withFormik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInputMask } from 'react-native-masked-text'

import PagamentoService from '../../../services/PagamentoService'
import MensalidadeService from '../../../services/MensalidadeService';

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

const PagamentoForm = (props) => {

    const [user_type, setUser_Type] = useState([])
    const nome_aluno = props.navigation.getParam('nome_aluno')
    const valor_total = props.navigation.getParam('valor_total')
    // const [formas_pagamento, setFormasPagamento] = useState([])

    async function fetchData() {
    }

    useEffect(() => {
        // const operation = props.navigation.getParam('operation', 'create');
        // console.log(operation)
        // if (operation == 'create') {
        //     fetchData()
        // } else if (operation == 'update'){
        //     updateData()
        // }
        
    },[])

    return (
        
        <ScrollView>
            {/* container */}

            <View style={styles.Container}>
                {/* header */}
                <View style={styles.Header}>
                    <Text style={[fonts.Title, {color: FinanceiroColor}]}>Pagar mensalidade</Text>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Preencha os campos para adicionar um novo pagamento da mensalidade</Text>
                </View>
                {/* content */}
                <View style={styles.Content}>
                    {/* Section */}
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Resumo do pagamento</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            <Text style={[fonts.SubTitle, {textAlign: 'center', fontSize: 15}]}>{nome_aluno}</Text>
                            <Text style={[fonts.SubTitle, {textAlign: 'center', fontSize: 13}]}>Valor a pagar: R$ {valor_total.toFixed(2).replace('.', ',')}</Text>
                        </View>
                    </View>
                    <View style={styles.Section}>
                        {/* SectionHeader */}
                        <View style={styles.SectionHeader}>
                            <Text style={styles.SectionTitle}>Dados do pagamento</Text>
                        </View>
                        {/* SectionContent */}
                        <View style={styles.SectionContent}>
                            <View style={[styles.Data, styles.DataPicker]}>
                                <Picker
                                    style={styles.DataInput}
                                    selectedValue={props.values.id_forma_pagamento}
                                    onValueChange={text => props.setFieldValue('id_forma_pagamento', text)}
                                >
                                    <Picker.Item label='Forma de pagamento' value='' />
                                    <Picker.Item label='Crédito/Débito' value={1} />
                                    <Picker.Item label='Dinheiro' value={2} />
                                </Picker>
                                { props.errors.id_forma_pagamento && <Text style={fonts.ErrorMessage}>{props.errors.id_forma_pagamento}</Text> }
                            </View>

                            <View style={styles.Data}>
                                <TextInputMask
                                    type={'money'}
                                    style={styles.DataInput}
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Valor do pagamento'
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: 'R$',
                                        suffixUnit: ''
                                    }}
                                    value={props.values.valor_pago}
                                    includeRawValueInChangeText
                                    onChangeText={(text, raw) => props.setFieldValue('valor_pago', raw)}
                                />
                                { props.errors.valor_pago && <Text style={fonts.ErrorMessage}>{props.errors.valor_pago}</Text> }
                            </View>
                            <View style={[styles.Data, styles.DataPicker]}>
                                <Picker
                                    style={styles.DataInput}
                                    selectedValue={props.values.parcelas}
                                    onValueChange={text => props.setFieldValue('parcelas', text)}
                                >
                                    <Picker.Item label='1x - Parcela' value={1} />
                                    <Picker.Item label='2x - Parcelas' value={2} />
                                    <Picker.Item label='3x - Parcelas' value={3} />
                                    <Picker.Item label='4x - Parcelas' value={4} />
                                    <Picker.Item label='5x - Parcelas' value={5} />
                                    <Picker.Item label='6x - Parcelas' value={6} />
                                    <Picker.Item label='7x - Parcelas' value={7} />
                                    <Picker.Item label='8x - Parcelas' value={8} />
                                    <Picker.Item label='9x - Parcelas' value={9} />
                                    <Picker.Item label='10x - Parcelas' value={10} />
                                </Picker>
                                { props.errors.parcelas && <Text style={fonts.ErrorMessage}>{props.errors.parcelas}</Text> }
                            </View>
                            <View style={styles.Data}>
                                    <TextInput 
                                        placeholder="Observação"
                                        underlineColorAndroid='#111'
                                        selectionColor='#111'
                                        multiline={true}
                                        style={styles.DataInput}
                                        value={props.values.observacao}
                                        onChangeText={text => props.setFieldValue('observacao', text)}
                                    />
                                { props.errors.observacao && <Text style={fonts.ErrorMessage}>{props.errors.observacao}</Text> }
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
                            style={[buttons.LargueOutlineButton, {borderColor: FinanceiroColor}]}
                            onPress={props.handleSubmit}
                            >
                                <Text style={[buttons.LargueOutlineButtonText, {color: FinanceiroColor}]}>Adicionar pagamento</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}

PagamentoForm.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Adicionar pagamento',
            headerStyle: {backgroundColor: FinanceiroColor},
            headerTintColor: '#FFF'
        }  
}

export default withFormik({

    mapPropsToValues: () => ({ id_forma_pagamento: 0, valor_pago: '', parcelas: 1, observacao: ''}),

    validationSchema: Yup.object().shape({
        id_forma_pagamento: Yup.number()
            .required('Selecione uma forma de pagamento')
            .min(1, 'Selecione uma forma de pagamento'),
        valor_pago: Yup.string()
            .required('Informe o valor do pagamento.'),
      }),
  
    handleSubmit: (values, props) => {
        const id_mensalidade = props.props.navigation.getParam('id_mensalidade')
        let mensalidade = props.props.navigation.getParam('mensalidade')
        delete mensalidade.cpf
        delete mensalidade.nome_completo
        mensalidade.id = mensalidade.id_mensalidade
        delete mensalidade.id_mensalidade
        mensalidade.data_vencimento = mensalidade.data_vencimento.getFullYear().toString() + '-' + (mensalidade.data_vencimento.getMonth() + 1).toString() + '-' + mensalidade.data_vencimento.getDate().toString()
        mensalidade.status = 'Pago'
        console.log(mensalidade)
        const now = new Date()
        values.id_mensalidade = id_mensalidade
        values.data_pagamento = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString() + '-' + now.getDate().toString() + ' ' + now.getHours().toString() + ':' + now.getMinutes().toString() + ':' + now.getSeconds().toString()
        console.log(values)
        PagamentoService.post(values).then((res) => {
            if ('error' in res) {
                Alert.alert('Não foi possível adicionar o pagamento', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                )
            } else {
                MensalidadeService.put(mensalidade).then((resMensalidade) => {
                    if ('error' in resMensalidade) {
                        Alert.alert('Não foi possível adicionar o pagamento', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                            [{
                                text: 'Ok',
                                onPress: () => props.props.navigation.goBack()
                            }],
                            {cancelable: false},
                        )
                    } else {
                        Alert.alert('Pagamento realizado com sucesso', 'O seu pagamento foi incluido com sucesso.', 
                        [{
                            text: 'Ok',
                            onPress: () => props.props.navigation.goBack()
                        }],
                        {cancelable: false},
                    )
                    }
                })

            }
        }).catch((error) => {
            Alert.alert('Não foi possível adicionar o pagamento', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                [{
                    text: 'Ok',
                    onPress: () => props.props.navigation.goBack()
                }],
                {cancelable: false},
            )
        })
    }
})(PagamentoForm);