import React from 'react';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
 } from 'react-native';

import { 
    Container,
    Label,
    Content,
    Option,
    OptionTitle,
    IconBorder,
    Row,
    ContentHeader
 } from './styles'

import { 
    Title,
    Description,
 } from '../../../shared/styles/fonts';

 import { 
     PlanoColor,
     ProfessorColor,
     AlunoColor,
     TreinoColor,
     ConfiguracaoColor,
} from '../../../shared/styles/colors'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { tsPropertySignature } from '@babel/types';

const styles = StyleSheet.create({
    Container,
    Label,
    Content,
    Option,
    OptionTitle,
    IconBorder,
    Row,
    ContentHeader,
});

const fonts = StyleSheet.create({
    Title,
    Description,
});

const Estudio = ({navigation}) => {
    return (
        <View
            style={styles.Container}
        >
            <View style={styles.Content}>
                <View style={styles.ContentHeader}>
                    <Text style={fonts.Title}>Gerencie seu estúdio</Text>
                    <Text style={fonts.Description}>Aqui você pode acessar todos os menus do seu estúdio, como adicionar novos alunos ou criar novo planos.</Text>
                </View>
                <View style={styles.Row}>
                    <TouchableOpacity 
                    style={[styles.Option, {backgroundColor: AlunoColor}]}
                    onPress={() => navigation.navigate('UsuarioList', {user_type: 'aluno'})}
                    >
                        <View style={styles.IconBorder}>
                            <Icon name='portrait' size={30} color='#FFF' />
                        </View>
                        <Text style={styles.OptionTitle}>Alunos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.Option, {backgroundColor: ProfessorColor}]}
                        onPress={() => navigation.navigate('UsuarioList', {user_type: 'professor'})}
                    >
                        <View style={styles.IconBorder}>
                            <Icon name='graduation-cap' size={30} color='#FFF' />
                        </View>
                        <Text style={styles.OptionTitle}>Professores</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Row}>
                    <TouchableOpacity 
                        style={[styles.Option, {backgroundColor: PlanoColor}]}
                        onPress={() => navigation.navigate('Planos')}
                    >
                        <View style={styles.IconBorder}>
                            <Icon name='receipt' size={30} color='#FFF' />
                        </View>
                        <Text style={styles.OptionTitle}>Planos e Turmas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.Option, {backgroundColor: TreinoColor}]}
                    onPress={() => navigation.navigate('Treinos')}
                    >
                        <View style={styles.IconBorder}>
                            <Icon name='dumbbell' size={30} color='#FFF' />
                        </View>
                        <Text style={styles.OptionTitle}>Treinos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Row}>
                    <TouchableOpacity 
                        style={[styles.Option, {backgroundColor: ConfiguracaoColor}]}
                        onPress={() => navigation.navigate('ConfigHome')}
                    >
                        <View style={styles.IconBorder}>
                            <Icon name='cog' size={30} color='#FFF' />
                        </View>
                        <Text style={styles.OptionTitle}>Configurações</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

Estudio.navigationOptions = {
    header: null
}

export default Estudio;