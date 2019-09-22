import React, {useState, useEffect} from 'react';

import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView,
    Picker,
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
import { TextInputMask } from 'react-native-masked-text';

import EnderecoService from '../../../services/EnderecoService';

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

const AddressForm = (props) => {

    const [editable, setEditable] = useState(true);
    const type = props.navigation.getParam('type');

    async function foundCep() {
        const address = props.navigation.getParam('address', {});
        console.log(address);

        if (Object.keys(address).length > 0) {
            props.values.nome_rua = address.street;
            props.values.bairro = address.neighborhood;
            props.values.cep = address.cep;
            props.values.estado = address.state;
            props.values.cidade = address.city;
            setEditable(false);
        }   
    }

    useEffect(() => {
        foundCep();
    }, [])

    return (
        <ScrollView style={styles.Container}>
            <View style={styles.Header}>
                <Text style={fonts.Title}>Endereço</Text>
                <Text style={fonts.SubTitle}>
                    Preencha os campos para adicionar um novo aluno
                </Text>
            </View>
            <View style={styles.Content}>
                <View>
                    <TextInput
                        underlineColorAndroid='#111'
                        selectionColor='#111'
                        placeholder="Nome da rua"
                        placeholderTextColor='#AAA'
                        editable={editable}
                        style={styles.Input}
                        value={props.values.nome_rua}
                        onChangeText={text => props.setFieldValue('nome_rua', text)}
                    />
                    { props.errors.nome_rua && <Text style={fonts.ErrorMessage}>{props.errors.nome_rua}</Text> }
                </View>
                
                <View style={{flexDirection: 'row', width: '100%'}}>

                    <View style={{flex: 1}}>
                        <TextInputMask
                                type='only-numbers'
                                underlineColorAndroid='#111'
                                selectionColor='#111'
                                placeholder="Número"
                                placeholderTextColor='#AAA'
                                style={styles.Input}
                                value={props.values.numero}
                                onChangeText={text => props.setFieldValue('numero', text)}
                            />
                            { props.errors.numero && <Text style={fonts.ErrorMessage}>{props.errors.numero}</Text> }
                    </View>

                    <View style={{flex: 2}}>
                        <TextInput
                            underlineColorAndroid='#111'
                            selectionColor='#111'
                            placeholder="Bairro"
                            placeholderTextColor='#AAA'
                            editable={editable}
                            style={styles.Input}
                            value={props.values.bairro}
                            onChangeText={text => props.setFieldValue('bairro', text)}
                        />
                        { props.errors.bairro && <Text style={fonts.ErrorMessage}>{props.errors.bairro}</Text> }
                    </View>
                </View> 

                <View>
                    <TextInputMask
                            type={'zip-code'}
                            underlineColorAndroid='#111'
                            selectionColor='#111'
                            placeholder="Cep"
                            placeholderTextColor='#AAA'
                            editable={editable}
                            maxLength={9}
                            style={styles.Input}
                            value={props.values.cep}
                            onChangeText={text => props.setFieldValue('cep', text)}
                        />
                        { props.errors.cep && <Text style={fonts.ErrorMessage}>{props.errors.cep}</Text> }
                </View>

                <View>
                    <TextInput
                            underlineColorAndroid='#111'
                            selectionColor='#111'
                            placeholder="Complementos"
                            placeholderTextColor='#AAA'
                            style={styles.Input}
                            value={props.values.complementos}
                            onChangeText={text => props.setFieldValue('complementos', text)}
                        />
                        { props.errors.complementos && <Text style={fonts.ErrorMessage}>{props.errors.complementos}</Text> }
                </View>

                <View style={{flexDirection: 'row', width: '100%'}}>

                    <View style={{flex: 3}}>
                        <TextInput
                                underlineColorAndroid='#111'
                                selectionColor='#111'
                                placeholder="Cidade"
                                placeholderTextColor='#AAA'
                                editable={editable}
                                style={styles.Input}
                                value={props.values.cidade}
                                onChangeText={text => props.setFieldValue('cidade', text)}
                            />
                            { props.errors.cidade && <Text style={fonts.ErrorMessage}>{props.errors.cidade}</Text> }
                    </View>
                    <View style={{flex: 2}}>
                        <Picker
                            style={styles.Input}
                            selectedValue={props.values.estado}
                            enabled={editable}
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
                        { props.errors.estado && <Text style={fonts.ErrorMessage}>{props.errors.estado}</Text> }
                    </View>
                </View>
            </View>
            <View style={styles.Footer}>
                <View style={buttons.LargueOutlineButtonContainer}>
                    {type == 'aluno' ?  
                        <TouchableOpacity
                        accessibilityLabel="Adicionar endereço"
                        style={[buttons.LargueOutlineButton, {borderColor: AlunoColor}]}
                        onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargueOutlineButtonText, {color: AlunoColor}]}>Cadastrar endereço</Text>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity
                        accessibilityLabel="Adicionar endereço"
                        style={[buttons.LargueOutlineButton, {borderColor: ProfessorColor}]}
                        onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargueOutlineButtonText, ProfessorColor]}>Cadastrar endereço</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    {<Text style={[fonts.ErrorMessage, {fontSize: 15, textAlign: 'center'}]}>{props.status}</Text> }
                </View>
            </View>
        </ScrollView>
    );
};

AddressForm.navigationOptions = ({ navigation }) => {
    const type = navigation.getParam('type');
    return {
        headerLeft: 
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => navigation.navigate('CreateAlunoResults', {type: type})}
            >
                <Icon name='arrow-left' size={30} color='#FFF' />
            </TouchableOpacity>,
        headerTitle: 'Cadastrar endereço',
    }
}

export default withFormik({

    mapPropsToValues: () => ({ nome_rua: '', bairro: '', cep: '', complementos: '', numero: '', cidade: '', estado: ''}),

    validationSchema: Yup.object().shape({
        nome_rua: Yup.string()
            .required('Preencha o campo do nome da rua'),
        bairro: Yup.string()
            .required('Preencha o campo de nome do bairro'),
        cep: Yup.string()
            .min(8,'Preencha o campo CEP com um CEP válido'),
        numero: Yup.number()
            .required('Preencha o campo de número'),
        cidade: Yup.string()
            .required('Preencha o campo de cidade'),
        estado: Yup.string()
            .required('Selecione um estado'),
      }),
  
    handleSubmit: (values, props) => {
        console.log(props);
        console.log(values);

        const type = props.props.navigation.getParam('type');

        const id_perfil = props.props.navigation.getParam('id_perfil', 0);
        values.id_perfil = id_perfil;
        EnderecoService.post(values).then((resultsEndereco => {
            if ('error' in resultsEndereco) {
                props.setStatus(resultsEndereco.error);
                return false;
            }
            if (resultsEndereco.length > 0) {
                if (type == 'aluno') {
                    props.props.navigation.navigate('UsuarioDetail', {id_perfil: id_perfil});
                } else if (type == 'professor') {
                    props.props.navigation.navigate('ProfessorDetail', {id_perfil: id_perfil});
                }
                
            } else {
                props.setStatus(resultsEndereco.error);
                console.log(resultsEndereco.error);
                return false;
            }

        }))
        .catch((error) => {
            props.setStatus(error);
            return false;
        }) 
    }
  })(AddressForm);