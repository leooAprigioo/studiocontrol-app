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

import {
    ProfessorColor,
} from '../../../shared/styles/colors';

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

import { withFormik } from 'formik';

import * as Yup from 'yup';

import ProfessorService from '../../../services/ProfessorService';

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
                <Text style={fonts.Title}>Qual a graduação do professor?</Text>
                <Text style={fonts.SubTitle}>
                    Adicione a graduação do professor
                </Text>
            </View>
            <View style={styles.Content}>
                <View>
                <TextInput 
                    underlineColorAndroid='#111'
                    selectionColor='#111'
                    placeholder="Ex.: Educação Física, Físiologia e etc..."
                    placeholderTextColor='#111'
                    style={styles.Input}
                    value={props.values.graduacao}
                    onChangeText={text => props.setFieldValue('graduacao', text)}
                />
                { props.errors.graduacao && <Text style={fonts.ErrorMessage}>{props.errors.graduacao}</Text> }
                </View>
            </View>
            <View style={styles.Footer}>
                <View style={buttons.LargueOutlineButtonContainer}>
                    <TouchableOpacity
                        accessibilityLabel="Cadastrar graduação"
                        style={[buttons.LargueOutlineButton, {borderColor: ProfessorColor}]}
                        onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargueOutlineButtonText, ProfessorColor]}>Cadastrar graduação</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

GoalForm.navigationOptions = ({ navigation }) => {
    return {
        // headerLeft: 
        //     <TouchableOpacity
        //         style={{paddingHorizontal: 20}}
        //         onPress={() => navigation.navigate('AlunosList')}
        //     >
        //         <Icon name='arrow-left' size={30} color='#FFF' />
        //     </TouchableOpacity>,
        headerTitle: 'Cadastrar professor',

    }
}

export default withFormik({

    mapPropsToValues: () => ({ graduacao: '' }),

    validationSchema: Yup.object().shape({
        graduacao: Yup.string()
            .required('Preencha o campo graduacao'),
      }),
  
    handleSubmit: (values, props) => {
        const id_perfil = props.props.navigation.getParam('id_perfil', 0);
        const type = props.props.navigation.getParam('type');
        if (id_perfil == 0) {
            Alert.alert('Não foi possível cadastrar a graduação', 'Pedimos desculpas pelo transtorno. Não se preocupe pois será possível cadastrar a graduação através do menu professor.', 
            [{
                text: 'Ok',
                onPress: () => props.props.navigation.navigate('CreateProfessorResults', {id_perfil: id_perfil, type: type})
            }],
            {cancelable: false},
            )
        } else {
            values.id_perfil = id_perfil;
            ProfessorService.post(values)
            .then((resultsAluno) => {
                if ('error' in resultsAluno) {
                    Alert.alert('Não foi possível cadastrar a graduação', 'Pedimos desculpas pelo transtorno. Não se preocupe pois será possível cadastrar a graduação através do menu professor.', [
                    {
                        text: 'Ok',
                        onPress: () => props.props.navigation.navigate('CreateProfessorResults', {id_perfil: id_perfil, type: type})
                    }
                    ],
                    {cancelable: false},
                    )
                } else {
                    props.props.navigation.navigate('CreateProfessorResults', {id_perfil: id_perfil, type: type})
                }
            })
        }
    }
  })(GoalForm);