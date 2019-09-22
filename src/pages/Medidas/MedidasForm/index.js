import React from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';

import {
    Container,
    Header,
    Content,
    Section,
    SectionTitle,
    SectionContent,
    Data,
    DataLabel,
    DataInput
} from './styles';

import {
    Title,
    SubTitle,
} from '../../../shared/styles/fonts';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MedidasService from '../../../services/MedidasService';
import { MedidasColor } from '../../../shared/styles/colors';

const styles = StyleSheet.create({
    Container,
    Header,
    Content,
    Section,
    SectionTitle,
    SectionContent,
    Data,
    DataLabel,
    DataInput
});

const fonts = StyleSheet.create({
    Title,
    SubTitle,
});

const MedidasForm = (props) => {

    return (
        <ScrollView>
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <View style={{flexDirection: 'row'}}>
                        
                        <Text style={[fonts.Title, {paddingHorizontal : 7, color: MedidasColor}]}>
                            Medidas
                        </Text>
                    </View>
                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>
                        Preencha os campos para cadastrar uma nova medida
                    </Text>
                </View>
                <View style={styles.Content}>

                    <View style={styles.Section}>
                        <Text style={styles.SectionTitle}>
                            Base
                        </Text>
                        <View style={styles.SectionContent}>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Peso (kg)'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.peso}
                                    onChangeText={text => props.setFieldValue('peso', text)}
                                />
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Peitoral (cm)'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.peitoral}
                                    onChangeText={text => props.setFieldValue('peitoral', text)}
                                />
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Quadril (cm)'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.quadril}
                                    onChangeText={text => props.setFieldValue('quadril', text)}
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.Section}>
                        <Text style={styles.SectionTitle}>
                            Biceps (cm)
                        </Text>
                        <View style={styles.SectionContent}>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Direito'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.biceps_direito}
                                    onChangeText={text => props.setFieldValue('biceps_direito', text)}
                                />
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    keyboardType='decimal-pad'
                                    placeholder='Esquerdo'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.biceps_esquerdo}
                                    onChangeText={text => props.setFieldValue('biceps_esquerdo', text)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.Section}>
                        <Text style={styles.SectionTitle}>
                            Cintura (cm)
                        </Text>
                        <View style={styles.SectionContent}>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Direita'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.cintura_direita}
                                    onChangeText={text => props.setFieldValue('cintura_direita', text)}
                                />
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Esquerda'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.cintura_esquerda}
                                    onChangeText={text => props.setFieldValue('cintura_esquerda', text)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.Section}>
                        <Text style={styles.SectionTitle}>
                            Coxa (cm)
                        </Text>
                        <View style={styles.SectionContent}>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Direita'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.coxa_direita}
                                    onChangeText={text => props.setFieldValue('coxa_direita', text)}
                                />
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Esquerda'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.coxa_esquerda}
                                    onChangeText={text => props.setFieldValue('coxa_esquerda', text)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.Section}>
                        <Text style={styles.SectionTitle}>
                            Gêmeos (cm)
                        </Text>
                        <View style={styles.SectionContent}>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Direito'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.gemeos_direito}
                                    onChangeText={text => props.setFieldValue('gemeos_direito', text)}
                                />
                            </View>
                            <View style={styles.Data}>
                                <TextInput 
                                    underlineColorAndroid='#111'
                                    selectionColor='#111'
                                    placeholder='Esquerdo'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor='#000'
                                    style={styles.DataInput} 
                                    value={props.values.gemeos_esquerdo}
                                    onChangeText={text => props.setFieldValue('gemeos_esquerdo', text)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal: 10, paddingBottom: 10}}>
                    <TouchableOpacity
                    style={{borderWidth: 2, borderColor: '#C374FF', flex:1, paddingVertical: 15}}
                    onPress={props.handleSubmit}
                    >
                        <Text style={{color: '#C374FF', fontSize: 18, textAlign: 'center'}}>Cadastrar medida</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )

}

MedidasForm.navigationOptions = ({ navigation }) => {
    return {
        title: 'Cadastrar medida',
        headerStyle: {
            backgroundColor: MedidasColor
        },
        headerTintColor: '#FFF',
    }
}

export default withFormik({
    mapPropsToValues: () => ({ peso: '', peitoral: '', quadril: '', biceps_direito: '', biceps_esquerdo: '', cintura_direita: '', cintura_esquerda: '', coxa_direita: '', coxa_esquerda: '', gemeos_direito: '', gemeos_esquerdo: '' }),

    validationSchema: Yup.object().shape({
        peso: Yup.string(),
        peitoral: Yup.string(),
        quadril: Yup.string(),
        biceps_direito: Yup.string(),
        biceps_esquerdo: Yup.string(),
        cintura_direita: Yup.string(),
        cintura_esquerda: Yup.string(),
        coxa_direita: Yup.string(),
        coxa_esquerda: Yup.string(),
        gemeos_direito: Yup.string(),
        gemeos_esquerdo: Yup.string(),
        }),

    handleSubmit: (values, props) => {
        console.log(values);
        let found = false;
        for (prop in values) {
            if (values[prop] != '') {
                found = true;
            }
        }
        if (!found) {
            Alert.alert('Medidas sem valor', 'Por favor, atribua valor a uma medida.', 
            [{
                text: 'Ok',
            }],
            {cancelable: false},
            )
            return;
        }
        const id_aluno = props.props.navigation.getParam('id_aluno', 0);
        console.log(id_aluno);
        console.log(props);
        let newValues = {};
        for (let prop in values) {
            console.log(prop);
            console.log(values[prop]);
            if (values[prop] != '') {
                newValues[prop] = parseFloat(values[prop].replace(",", "."));
            } else {
                newValues[prop] = 0.;
            }
            
        }
        console.log(newValues);
        let now = new Date();
        newValues.data_atualizacao = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        newValues.id_aluno = id_aluno;
        MedidasService.post(newValues)
            .then((resultsMedidas) => {
                if ('erro' in resultsMedidas) {
                    Alert.alert('Não foi possível cadastrar as medidas', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                    )
                } else {
                    Alert.alert('Medidas cadastradas com sucesso!', 'Suas medidas foram cadastradas com sucesso.', 
                    [{
                        text: 'Ok',
                        onPress: () => props.props.navigation.goBack()
                    }],
                    {cancelable: false},
                    )
                }
            console.log(resultsMedidas);
        }).catch((error) => {
            console.log(error);
            Alert.alert('Não foi possível cadastrar as medidas', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
            [{
                text: 'Ok',
                onPress: () => props.props.navigation.goBack()
            }],
            {cancelable: false},
            )
        })
        console.log(newValues);
    }
})(MedidasForm);