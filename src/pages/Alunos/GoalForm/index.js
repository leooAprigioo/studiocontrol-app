import React from 'react';

import {
    StyleSheet, 
    View, 
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView,
    Alert,
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
    AlunoColor
} from '../../../shared/styles/colors';

import { withFormik } from 'formik';

import * as Yup from 'yup';

import AlunoService from '../../../services/AlunoService';

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

const GoalForm = (props) => {

    return (
        <ScrollView style={styles.Container}>
            <View style={styles.Header}>
                <Text style={fonts.Title}>Qual o objetivo do aluno?</Text>
                <Text style={fonts.SubTitle}>
                    Nos conte qual objetivo o aluno tem em mente
                </Text>
            </View>
            <View style={styles.Content}>
                <View>
                <TextInput 
                    underlineColorAndroid='#111'
                    selectionColor='#111'
                    placeholder="Ex.: Reduzir peso, tonificação muscular, melhora na postura e etc..."
                    placeholderTextColor='#111'
                    style={styles.Input}
                    value={props.values.objetivo}
                    onChangeText={text => props.setFieldValue('objetivo', text)}
                />
                { props.errors.objetivo && <Text style={fonts.ErrorMessage}>{props.errors.objetivo}</Text> }
                </View>
            </View>
            <View style={styles.Footer}>
                <View style={buttons.LargueOutlineButtonContainer}>
                    <TouchableOpacity
                        accessibilityLabel="Cadastrar objetivo"
                        style={[buttons.LargueOutlineButton, {borderColor: AlunoColor}]}
                        onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargueOutlineButtonText, {color: AlunoColor}]}>Cadastrar objetivo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

GoalForm.navigationOptions = ({ navigation }) => {
    return {
        headerLeft: 
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => navigation.navigate('AlunosList')}
            >
                <Icon name='arrow-left' size={30} color='#FFF' />
            </TouchableOpacity>,
        headerTitle: 'Cadastrar Aluno',

    }
}

export default withFormik({

    mapPropsToValues: () => ({ objetivo: '' }),

    validationSchema: Yup.object().shape({
        objetivo: Yup.string()
            .required('Preencha o campo nome'),
      }),
  
    handleSubmit: (values, props) => {
        const id_perfil = props.props.navigation.getParam('id_perfil', 0);
        const type = props.props.navigation.getParam('type');
        if (id_perfil == 0) {
            Alert.alert('Não foi possível cadastrar o objetivo', 'Pedimos desculpas pelo transtorno. Não se preocupe pois será possível cadastrar o objetivo através do menu aluno.', 
            [{
                text: 'Ok',
                onPress: () => props.props.navigation.navigate('CreateAlunoResults', {id_perfil: id_perfil, type: type})
            }],
            {cancelable: false},
            )
        } else {
            values.id_perfil = id_perfil;
            values.id_plano = 1;
            AlunoService.post(values)
            .then((resultsAluno) => {
                if ('error' in resultsAluno) {
                    Alert.alert('Não foi possível cadastrar o objetivo', 'Pedimos desculpas pelo transtorno. Não se preocupe pois será possível cadastrar o objetivo através do menu aluno.', [
                    {
                        text: 'Ok',
                        onPress: () => props.props.navigation.navigate('CreateAlunoResults', {id_perfil: id_perfil, type: type})
                    }
                    ],
                    {cancelable: false},
                    )
                } else {
                    props.props.navigation.navigate('CreateAlunoResults', {id_perfil: id_perfil, type: type})
                }
            })
        }
    }
  })(GoalForm);