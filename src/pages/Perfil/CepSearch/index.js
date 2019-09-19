import React from 'react';

import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    Text,
    ScrollView,
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
import { TextInputMask } from 'react-native-masked-text'

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

import cep from 'cep-promise';

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

const CepSearch = (props) => {
    
    const type = props.navigation.getParam('type');
    
    return (
        <ScrollView style={styles.Container}>
            <View style={styles.Header}>
                <Text style={fonts.Title}>Localizador de endereço</Text>
                <Text style={fonts.SubTitle}>
                    Digite seu CEP e tentaremos localizar seu endereço
                </Text>
            </View>
            <View style={styles.Content}>
                <View>
                <TextInputMask
                    type={'zip-code'}
                    underlineColorAndroid='#111'
                    selectionColor='#111'
                    placeholder="Digite o seu CEP"
                    placeholderTextColor='#111'
                    maxLength={9}
                    style={styles.Input}
                    value={props.values.cep}
                    includeRawValueInChangeText={true}
                    onChangeText={(text, textRaw) => props.setFieldValue('cep', textRaw)}
                />
                { props.errors.cep && <Text style={fonts.ErrorMessage}>{props.errors.cep}</Text> }
                </View>

            </View>
            <View style={styles.Footer}>
                <View style={buttons.LargueOutlineButtonContainer}>
                    {type == 'aluno' ?  
                        <TouchableOpacity
                        accessibilityLabel="Procurar por CEP"
                        style={[buttons.LargueOutlineButton, {borderColor: AlunoColor}]}
                        onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargueOutlineButtonText, {color: AlunoColor}]}>Procurar CEP</Text>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity
                        accessibilityLabel="Procurar por CEP"
                        style={[buttons.LargueOutlineButton, {borderColor: ProfessorColor}]}
                        onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargueOutlineButtonText, ProfessorColor]}>Procurar CEP</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </ScrollView>
    );
};

CepSearch.navigationOptions = (props) => {
    const id_perfil = props.navigation.getParam('id_perfil', 0);
    return {
        headerLeft: 
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => {
                    // props.navigation.setParams({id_perfil, id_perfil});
                    props.navigation.goBack();
                }}
            >
                <Icon name='arrow-left' size={30} color='#FFF' />
            </TouchableOpacity>,
        headerTitle: 'Procurar CEP',

    }
}

export default withFormik({

    mapPropsToValues: () => ({ cep: '',}),

    validationSchema: Yup.object().shape({
        cep: Yup.string()
            .required('Preencha o campo CEP')
            .min(8, 'Preencha o campo com um CEP válido'),
      }),
  
    handleSubmit: (values, props) => {

        const type = props.props.navigation.getParam('type');
        cep(values.cep)
            .then((cepResults) => {
            console.log(cepResults);
            console.log(props);
            const id_perfil = props.props.navigation.getParam('id_perfil', 0);
            if ('CepPromiseError' in cepResults) {
                props.props.navigation.navigate('AddressForm', {id_perfil: id_perfil, type: type})
            }
            
            props.props.navigation.navigate('AddressForm', {address: cepResults, id_perfil: id_perfil, type: type})
        })
            .catch((error) => {
                console.log(error);
                const id_perfil = props.props.navigation.getParam('id_perfil', 0);
                props.props.navigation.navigate('AddressForm', {id_perfil: id_perfil, type: type})
            })
    }
  })(CepSearch);