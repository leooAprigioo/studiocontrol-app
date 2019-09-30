import React, {useEffect, useState} from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    BackHandler,
    ActivityIndicator
} from 'react-native'

import {
    Container,
    Header,
    Content,
    Exercicio,
    ExercicioTitle,
    ExercicioDescription,
    ExercicioDuration,
} from './styles'

import { Title } from '../../../shared/styles/fonts';
import { FloatingButton } from '../../../shared/styles/buttons';
import { TreinoColor } from '../../../shared/styles/colors';
import BackButton from '../../../components/BackButton';
import AddFloatingButton from '../../../components/AddFloatingButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ExercicioService from '../../../services/ExercicioService';

const styles = StyleSheet.create({
    Container,
    Header,
    Content,
    Exercicio,
    ExercicioTitle,
    ExercicioDescription,
    ExercicioDuration,
})

const fonts = StyleSheet.create({
    Title,
})

const buttons = StyleSheet.create({
    FloatingButton,
})

const Exercicios = (props) => {


    const [exercicios, setExercicios] = useState([])
    const [loader, setLoader] = useState(true)

    function backButtonHandler() {
        props.navigation.navigate('Estudio');
        return true;
    }

    async function fetchData() {
        await ExercicioService.list().then((res) => setExercicios(res)).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData().then(() => setLoader(false))
    }, [])

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [])

    return (
        <View style={{flex: 1,}}>
            {
                loader ?
                <ActivityIndicator size='large' color={TreinoColor} />
                :
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, backgroundColor: '#FBFBFB'}}>
                    <View style={styles.Container}>
                        <View style={styles.Header}>
                            <Text style={[fonts.Title, {color: TreinoColor}]}>Exercícios</Text>
                            <Text style={{textAlign: 'center'}}>Lista dos exercícios cadastrados</Text>
                        </View>
                        <View style={styles.Content}>
                            <FlatList
                                keyExtractor={item => item.id.toString()}
                                data={exercicios}
                                renderItem={({item}) => 
                                <TouchableOpacity style={[styles.Exercicio]}>
                                    <Text style={styles.ExercicioTitle}>{item.nome}</Text>
                                    <Text style={styles.ExercicioDescription}>{item.descricao}</Text>
                                </TouchableOpacity>
                            }
                            />
                        </View>


                    </View>
                </ScrollView>
                <AddFloatingButton nav='ExercicioForm' backgroundColor={TreinoColor}></AddFloatingButton>
            </View>
            }
        </View>
    );
}

Exercicios.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: TreinoColor},
        headerTintColor: '#FFF',
        title: 'Treinos e Exercícios',
        headerLeft: 
            <BackButton nav='Estudio'></BackButton>
    }
}

export default Exercicios;