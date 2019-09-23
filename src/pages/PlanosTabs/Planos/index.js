import React, {useEffect, useState} from 'react';
import {
    BackHandler,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {
    Container,
    AulasContainer,
    AulasHeader,
    AulasTitle,
    AulasSubTitle,
    AulasContent,
    SliderAulasItem,
    SliderAulas,
    PlusBorder,
    PlanoAddButton,
    SliderAulasTitle,
    SliderAulasText,
    PlanosContainer,
    PlanosHeader,
    PlanosSubTitle,
    PlanosContent,
    Plano,
    PlanoHeader,
    PlanoHeaderTitle,
    PlanoHeaderDescription,
    PlanoContent,
    PlanoContentAulaByWeek,
    PlanoPrice,
    PlanoFooter,
    PlanoFooterCountAlunos,
    AulaAddButton,
    
} from './styles';

import {
    Title,
    SubTitle,
} from '../../../shared/styles/fonts'

import {
    PlanoColor
} from '../../../shared/styles/colors'

import Icon from 'react-native-vector-icons/MaterialIcons';

import PlanoService from '../../../services/PlanoService';
import AulaService from '../../../services/AulaService';

const styles = StyleSheet.create({
    Container,
    AulasContainer,
    AulasHeader,
    AulasTitle,
    AulasSubTitle,
    AulasContent,
    SliderAulasItem,
    SliderAulas,
    PlusBorder,
    PlanoAddButton,
    SliderAulasTitle,
    SliderAulasText,
    PlanosContainer,
    PlanosHeader,
    PlanosSubTitle,
    PlanosContent,
    Plano,
    PlanoHeader,
    PlanoHeaderTitle,
    PlanoHeaderDescription,
    PlanoContent,
    PlanoContentAulaByWeek,
    PlanoPrice,
    PlanoFooter,
    PlanoFooterCountAlunos,
    AulaAddButton,
    
});

const fonts = StyleSheet.create({
    Title,
    SubTitle,
});

const Planos = (props) => {

    const [loader, setLoader] = useState(true);
    const [planos, setPlanos] = useState([]);
    const [aulas, setAulas] = useState([]);

    function backButtonHandler() {
        props.navigation.navigate('Estudio');
        return true;
    }

    async function fetchData() {
        await PlanoService.list_Q().then((res) => setPlanos(res)).catch((error) => console.log(error));
        await AulaService.list().then((res) => setAulas(res)).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData().then((res) => setLoader(false));
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [])

    return  (
        <ScrollView style={{flex: 1}}>
            {
            loader ? 
                <ActivityIndicator size='large' color={PlanoColor} /> 
                :
            <View style={styles.Container}>
                {/* Aulas container*/}
                <View style={styles.AulasContainer}>
                    {/* Aulas header*/}
                    <View style={styles.AulasHeader}>
                        {/* Aulas Title*/}
                        <Text style={[fonts.Title, styles.AulasTitle]}>Aulas</Text>
                        <Text style={[fonts.SubTitle, styles.AulasSubTitle]}>Cadastre e consulte os tipos de aulas que serão oferecidos nos planos</Text>
                    </View>
                    {/* Aulas Content*/}
                    <View style={styles.AulasContent}>
                        {/* Aulas ScrollView*/}
                        <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.SliderAulas}
                        >
                            {/* Aulas Item*/}
                            {
                                aulas && aulas.length > 0 ? 
                                aulas.map((aula) => {
                                        return <TouchableOpacity style={[styles.SliderAulasItem]} key={aula.id.toString()}>
                                        <View>
                                            <Text style={styles.SliderAulasTitle}>{aula.nome}</Text>
                                            <Text style={styles.SliderAulasText}>{aula.duracao} Mins</Text>
                                            <Text style={styles.SliderAulasText}>R$ {aula.valor_aula.toFixed(2).replace('.', ',')}/aula</Text>
                                            <Text style={styles.SliderAulasText}>Max. {aula.limite_alunos} alunos</Text>
                                        </View>
                                    </TouchableOpacity>
                                }) : <View></View>
                            }

                            <TouchableOpacity 
                            style={[styles.AulaAddButton, {backgroundColor: '#FFF', alignItems: 'center'}]}
                            onPress={() => props.navigation.navigate('AulaForm')}
                            >
                                <View style={styles.PlusBorder}>
                                    <Icon name='add' size={40} color='#71C1D9'></Icon>
                                </View>
                                <View>
                                    <Text style={{color: '#71C1D9', paddingTop: 10}}>Nova aula</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                {/* Planos container*/}
                <View style={styles.PlanosContainer}>
                    {/* Planos Header*/}
                    <View style={styles.PlanosHeader}>
                        <Text style={[fonts.Title, {color: PlanoColor}]}>Planos</Text>
                        <Text style={[fonts.SubTitle, styles.PlanosSubTitle]}>Consulte e cadastre todos os planos pré-configurados que serão oferecidos</Text>
                    </View>
                    {/* Planos Content*/}
                    <View style={styles.PlanosContent}>
                        {
                            planos && planos.length > 0 ? 
                            planos.map((plano) => {
                                if (plano.nome != 'Não cadastrado') {
                                    return <TouchableOpacity style={styles.Plano} key={plano.id_plano.toString()}>
                                        {/* Plano Header */}
                                        <View style={styles.PlanoHeader}>
                                            <Text style={styles.PlanoHeaderTitle}>{plano.nome_plano}</Text>
                                            {/* 39 caracteres para descrição com os 3 pontinhos */}
                                            <Text style={styles.PlanoHeaderDescription}>{plano.descricao_plano? plano.descricao_plano : 'Sem descrição'}</Text>
                                        </View>
                                        {/* Plano content */}
                                        <View style={styles.PlanoContent}>
                                            <Text style={styles.PlanoContentAulaByWeek}>{plano.quantidade_aula} aulas por semana</Text>
                                            <Text style={styles.PlanoPrice}>R$ {plano.valor_plano.toFixed(2).replace('.', ',')}/mês</Text> 
                                        </View>
                                        {/* Plano footer */}
                                        <View style={styles.PlanoFooter}>
                                            <Text style={styles.PlanoFooterCountAlunos}>{plano.quantidade_alunos} alunos aderiram</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            }) :
                            <View></View>
                        }
                        <TouchableOpacity 
                            style={[styles.PlanoAddButton]}
                            onPress={() => props.navigation.navigate('PlanoForm')}
                        >
                            <View style={styles.PlusBorder}>
                                <Icon name='add' size={40} color='#71C1D9' />
                            </View>
                            <View>
                                <Text style={{color: '#71C1D9', paddingTop: 10}}>Novo plano</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }
        </ScrollView>
        
    );
}

Planos.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: PlanoColor},
        headerTintColor: '#FFF',
        title: 'Planos e Turmas',
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


export default Planos;