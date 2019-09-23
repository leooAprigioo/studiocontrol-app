import React, {useEffect, useState} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native'

import {
    Container,
    Header,
    Content,
    Treino,
    TreinoContent,
    ContentTitle,
    ContentData,
    TreinoAddButton,
    PlusBorder,
} from './styles'

import {Title} from '../../../shared/styles/fonts'
import { TreinoColor } from '../../../shared/styles/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

import TreinoService from '../../../services/TreinoService';

const styles = StyleSheet.create({
    Container,
    Header,
    Content,
    Treino,
    TreinoContent,
    ContentTitle,
    ContentData,
    TreinoAddButton,
    PlusBorder
})

const fonts = StyleSheet.create({
    Title
})

const Treinos = (props) => {

    const [treinos, setTreinos] = useState([])
    const [loader, setLoader] = useState(true)

    async function fetchData() {
        await TreinoService.list().then((res) => setTreinos(res)).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData().then(() => setLoader(false))
    }, [])

    function backButtonHandler() {
        props.navigation.navigate('Estudio');
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [])

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#FBFBFB'}}>
            {
                loader ?
               <ActivityIndicator color={TreinoColor} size='large' />
            :
                <View style={styles.Container}>
                    <View style={styles.Header}>
                        <Text style={[fonts.Title, {color: TreinoColor}]}>Treinos</Text>
                        <Text style={{textAlign: 'center'}}>Consulte e cadastre os treinos que serão praticados nas aulas</Text>
                    </View>
                    <View style={styles.Content}>

                        {treinos && treinos.length > 0 ? treinos.map((treino) => {
                            return <TouchableOpacity style={styles.Treino} key={treino.id.toString()}>
                                <View style={styles.TreinoContent}>
                                    <Text style={styles.ContentTitle}>{treino.nome}</Text>
                                    <Text style={styles.ContentData}>10 Exercícios</Text>
                                    <Text style={styles.ContentData}>Tempo: 60 mins</Text>
                                </View>
                            </TouchableOpacity>
                        }) :
                        <View></View>
                        }

                        <TouchableOpacity 
                            style={[styles.TreinoAddButton]}
                            onPress={() => props.navigation.navigate('TreinoForm')}
                        >
                            <View style={styles.PlusBorder}>
                                <Icon name='add' size={40} color='#71C1D9' />
                            </View>
                            <View>
                                <Text style={{color: '#71C1D9', paddingTop: 10}}>Novo treino</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            }
        </ScrollView>
    );
}

Treinos.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: TreinoColor},
        headerTintColor: '#FFF',
        title: 'Treinos e Exercicios',
        headerLeft: 
            <TouchableOpacity
            style={{margin: 3, paddingLeft: 12}}
                onPress={() => navigation.navigate('Estudio')
                }
            >
                <Icon name='arrow-back' size={24} color='#FFF' />
            </TouchableOpacity>,
    }
}

export default Treinos;