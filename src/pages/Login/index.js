import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {
    StyleSheet, 
    View, 
    Button,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';

import { 
    Container, 
    AppLogo,
    AppLogoImage,
    AppLogoTitle,
    LoginContainer,
    LoginHeader,
    LoginContent,
    LoginFooter,
    ForgotPassword,
    Title
} from './styles';

import { 
    BackgroundColorLogin,
    BackgroundLocationLogin,
} from '../../shared/styles/colors';

import {
    ErrorMessage,
} from '../../shared/styles/fonts';

import {
    LargeButton,
    LargeButtonTitle,
} from '../../shared/styles/buttons';

import { withFormik } from 'formik';

import * as Yup from 'yup';
import AuthService from '../../services/AuthService';
import PerfilService from '../../services/PerfilService';
import StorageService from '../../services/StorageService';

const styles = StyleSheet.create({
    Container,
    AppLogo,
    AppLogoImage,
    AppLogoTitle,
    LoginContainer,
    LoginHeader,
    LoginContent,
    ForgotPassword,
    Title,
});

const fonts = StyleSheet.create({
    ErrorMessage,
});

const buttons = StyleSheet.create({
    LargeButton,
    LargeButtonTitle,
});

const Login = (props) => {

    return (
        
        <LinearGradient location={BackgroundLocationLogin} colors={BackgroundColorLogin} style={[styles.Container]}>
            <View style={styles.AppLogo}>
                <Image 
                    source={require('../../public/img/Logo.png')} style={styles.AppLogoImage} 
                    resizeMode='stretch'
                 />
                <Text style={styles.AppLogoTitle}>StudioControl</Text>
            </View>
            <View style={styles.LoginContainer}>
                <View style={styles.LoginContent}>
                    <View>
                        <TextInput 
                            placeholder="Nome de usuário"
                            underlineColorAndroid='#FFF'
                            placeholderTextColor='#FFF'
                            value={props.values.nome_usuario}
                            onChangeText={text => props.setFieldValue('nome_usuario', text)}
                        />
                        { props.errors.nome_usuario && <Text style={fonts.ErrorMessage}>{props.errors.nome_usuario}</Text> }
                    </View>
                    <View>
                        <TextInput 
                            underlineColorAndroid='#FFF'
                            selectionColor='#FFF'
                            placeholder="Senha"
                            placeholderTextColor='#FFF'
                            secureTextEntry={true}
                            value={props.values.senha}
                            onChangeText={text => props.setFieldValue('senha', text)}
                        />
                        { props.errors.senha && <Text style={fonts.ErrorMessage}>{props.errors.senha}</Text> }
                    </View>
                    <View>
                        <Text style={styles.ForgotPassword}>Esqueceu a senha?</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            accessibilityLabel="Acesse o sistema"   
                            style={[buttons.LargeButton, {backgroundColor: '#abddd8',}]}
                            onPress={props.handleSubmit}
                        >
                            <Text style={[buttons.LargeButtonTitle, {color: '#FFF',}]}>Entrar</Text>
                        </TouchableOpacity>
                        {<Text style={[fonts.ErrorMessage, {fontSize: 15, textAlign: 'center'}]}>{props.status}</Text> }
                    </View>
                </View>
                <View style={styles.LoginFooter}>
                </View>
            </View>
        </LinearGradient>
    );
}


export default withFormik({

    mapPropsToValues: () => ({ nome_usuario: '', senha: '' }),

    validationSchema: Yup.object().shape({
        nome_usuario: Yup.string()
          .required('Preencha o campo de e-mail'),
        senha: Yup.string()
          .min(8, 'A senha deve ter no mínimo 8 caracteres')
          .required('Preencha o campo de senha'),
      }),
  
    handleSubmit: (values, props) => {


        AuthService.auth(values).then((response) => {
            
            console.log(response);
            if ('error' in response) {
                props.setStatus(response.error);
                return false;
            }
    
            if (response.length > 0) {
                StorageService.store('credencial', JSON.stringify(response));
                PerfilService.get(response[0].id_perfil).then((resultsPerfil) => {
                    if ('error' in resultsPerfil) {
                        props.setStatus('Não foi possivel obter o perfil. Tente novamente mais tarde');
                        StorageService.remove('credencial');
                        return false;
                    }
                    if (resultsPerfil.length > 0) {
                        StorageService.store('perfil', JSON.stringify(resultsPerfil)).then((resultsStoragePerfil) => {
                            if (!('error' in resultsStoragePerfil) ) {
                                props.props.navigation.navigate('HomeTab'); 
                            } else {
                                props.setStatus('Não foi possivel obter o perfil. Tente novamente mais tarde');
                                StorageService.remove('credencial');
                                StorageService.remove('perfil');
                                return false;        
                            }
                        });
                    } else {
                        props.setStatus('Não foi possivel obter o perfil. Tente novamente mais tarde');
                        StorageService.remove('credencial');
                        StorageService.remove('perfil');
                        return false;
                    }
                })
                
            } else {
                props.setStatus('Usuário ou senha incorretos');
            }
        });
    }
  })(Login);