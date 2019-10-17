import React, {useState, useEffect} from 'react'

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native'

import {
    Container,
    Header,
    HorizontalDateList,
    DateItem,
    DateActiveItem,
    DateText,
    DateActiveText,
    Content,
    Footer,
    Diviser,
    DiviserText,
    DiviserRow,
    AulaAgendada,
    AulaAgendadaHeader,
    HeaderItem,
    HeaderTitle,
    HeaderSubTitle,
    AulaAgendadaContent,
    Section,
    SectionContent,
    QuantidadeAlunos,
    QuantidadeAlunosText,
    SectionItem,
    SectionItemLabel,
    SectionItemValue,
    Duracao,
    DuracaoText,
    AulaAgendadaFooter,
    FooterItem,
    FooterText,
    SearchInput,
} from './styles'

const styles = StyleSheet.create({
    Container,
    Header,
    HorizontalDateList,
    DateItem,
    DateActiveItem,
    DateText,
    DateActiveText,
    Content,
    Footer,
    Diviser,
    DiviserText,
    DiviserRow,
    AulaAgendada,
    AulaAgendadaHeader,
    HeaderItem,
    HeaderTitle,
    HeaderSubTitle,
    AulaAgendadaContent,
    Section,
    SectionContent,
    QuantidadeAlunos,
    QuantidadeAlunosText,
    SectionItem,
    SectionItemLabel,
    SectionItemValue,
    Duracao,
    DuracaoText,
    AulaAgendadaFooter,
    FooterItem,
    FooterText,
    SearchInput,

});

import Icon from 'react-native-vector-icons/MaterialIcons';
import AddFloatingButton from '../../../components/AddFloatingButton';
import BackButton from '../../../components/BackButton';
import { AulaColor, AlunoColor } from '../../../shared/styles/colors';

import AgendamentoService from '../../../services/AgendamentoService';



const AgendamentoList = (props) => {

    const [agendamentos, setAgendamentos] = useState([])
    const [datas, setDatas] = useState([
        {
            id: 1,
            mes: 'Janeiro',
            dias: [1, 2, 3, 4, 5,  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 2,
            mes: 'Fevereiro',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        },
        {
            id: 3,
            mes: 'Março',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 4,
            mes: 'Abril',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        },
        {
            id: 5,
            mes: 'Maio',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 6,
            mes: 'Junho',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        },
        {
            id: 7,
            mes: 'Julho',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 8,
            mes: 'Agosto',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 9,
            mes: 'Setembro',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 10,
            mes: 'Outubro',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        {
            id: 11,
            mes: 'Novembro',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        },
        {
            id: 12,
            mes: 'Dezembro',
            dias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
    ])

    const [dias, setDias] = useState([])
    const [activeData, setActiveData] = useState(1)
    const [activeDia, setActiveDia] = useState(1)
    const [aluno, setAluno] = useState([])
    const [operation, setOperation] = useState('')
    const [agendamentoOnDisplay, setAgendamentoOnDisplay] = useState([])

    const changeActiveData = (dataId) => {
        setActiveData(dataId);
    }

    const changeActiveDia = (dia) => {
        setActiveDia(dia)
    }

    function horarioToDateTime(agendamentos) {
        agendamentos.map((agendamento) => {
            agendamento.data_horario = new Date(agendamento.data_horario);
        })
        return agendamentos
    }

    function changeDisplay(data, dia) {
        if (!data) {
            data = activeData
        }

        if (!dia) {
            dia = activeDia
        }

        let agendamentoNewList = []
        agendamentos.map((agendamento) => {
            console.log(data + ' - ' + dia)
            if (((agendamento.data_horario.getMonth() + 1) == data) && agendamento.data_horario.getDate() == dia) {
                agendamentoNewList.push(agendamento)
            }
        })

        setAgendamentoOnDisplay(agendamentoNewList)
    }

    async function fetchData() {
        const operation = props.navigation.getParam('operation', 'list')
        setOperation(operation)
        switch (operation) {
            case 'list':
                await AgendamentoService.listResumo().then((res) => {res = horarioToDateTime(res); setAgendamentos(res)}).catch((error) => console.log(error));
                break;
            case 'get':
                const aluno = props.navigation.getParam('aluno')
                setAluno(aluno)
                console.log(aluno)
                await AgendamentoService.getResumo(aluno.id).then((res) => {res = horarioToDateTime(res); setAgendamentos(res)}).catch((error) => console.log(error));
                break
        }
            //await AgendamentoService.listResumo().then((res) => {res = horarioToDateTime(res); setAgendamentos(res)}).catch((error) => console.log(error));
        
    }

    useEffect(() => {
        setDias(datas[0].dias);
    }, [])

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <View style={styles.Container}>
            <ScrollView>
                {console.log(agendamentos)}
                <View style={styles.Header}>
                    <ScrollView 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                        style={styles.HorizontalDateList}>
                            {datas.map((data) => {
                                return <TouchableOpacity
                                            style={[styles.DateItem, data.id == activeData? styles.DateActiveItem:{}]}
                                            onPress={() => {
                                                changeActiveData(data.id); 
                                                changeDisplay(data.id, activeDia); 
                                                setDias(data.dias)
                                            }}
                                            key={data.id.toString()}
                                        >
                                            <Text style={[styles.DateText, data.id == activeData? styles.DateActiveText: {}]}>{data.mes.substr(0, 3)}</Text>
                                        </TouchableOpacity>
                                })
                            }
                    </ScrollView>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={[styles.HorizontalDateList, {backgroundColor: '#FFF', shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        
                        elevation: 5,}]}
                    >
                        {
                            dias.map((dia) => {
                                return <TouchableOpacity
                                style={[styles.DateItem, dia == activeDia? styles.DateActiveItem:{}]}
                                onPress={() => {changeActiveDia(dia); changeDisplay(activeData, dia)}}
                                key={dia.toString()}
                            >
                                <Text style={[styles.DateText, dia == activeDia? styles.DateActiveText: {}]}>{dia}</Text>
                            </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.Content}>

                    {
                        agendamentoOnDisplay && agendamentoOnDisplay.length > 0?
                        agendamentoOnDisplay.map((agendamento) => {
                            return <TouchableOpacity 
                                        style={styles.AulaAgendada}
                                        onPress={() => props.navigation.navigate('AgendamentoDetail')}
                                        key={agendamento.id_agendamento.toString()}
                                    >
                                        <View style={styles.AulaAgendadaHeader}>
                                            <View style={styles.HeaderItem}>
                                                <Text style={styles.HeaderTitle}>{(agendamento.data_horario.getHours() < 10?'0':'') + agendamento.data_horario.getHours().toString() + ":" + (agendamento.data_horario.getMinutes() < 10 ? '0' : '') + agendamento.data_horario.getMinutes().toString()}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.AulaAgendadaContent}>
                                            <View style={styles.Section}>
                                                <View style={styles.QuantidadeAlunos}>
                                                    <Icon name='person' size={20} color={AlunoColor} />
                                                    <Text style={styles.QuantidadeAlunosText}>{agendamento.quantidade_agendados}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.Section, styles.SectionContent]}>
                                                <View style={styles.SectionItem}>
                                                    <Text style={styles.SectionItemLabel}>Professor:</Text>
                                                    <Text style={styles.SectionItemValue}>{agendamento.nome_professor}</Text>
                                                </View>
                                                <View style={styles.SectionItem}>
                                                    <Text style={styles.SectionItemLabel}>Treino:</Text>
                                                    <Text style={styles.SectionItemValue}>{agendamento.nome_treino}</Text>
                                                </View>
                                                <View style={styles.SectionItem}>
                                                    <Text style={styles.SectionItemLabel}>Aula:</Text>
                                                    <Text style={styles.SectionItemValue}>{agendamento.nome_aula}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.Section}>
                                                <View style={styles.Duracao}>
                                                    <Icon name='timer' size={20} color='#AAA' />
                                                    <Text style={styles.DuracaoText}>{agendamento.duracao}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.AulaAgendadaFooter}>
                                            <View style={styles.FooterItem}>
                                                <Text style={styles.FooterText}>{agendamento.status_agendamento}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                        }) :
                        <View style={{flex: 1, paddingTop: 10}}>
                            <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>Não há agendamentos nessa data</Text>
                        </View>
                    }
                </View>
                <View style={styles.Footer}>
                
                </View>
            </ScrollView>
            {operation === 'get' ? <AddFloatingButton nav='AgendamentoForm' params={{aluno: aluno}} backgroundColor={AulaColor}></AddFloatingButton> : <View></View>}
        </View>
    )
}

// AgendamentoList.navigationOptions = ({ navigation }) => {
//     return {
//         headerStyle: {backgroundColor: AulaColor},
//         headerTintColor: '#FFF',
//         title: 'Agendamentos',
//         headerTitle: 
//             <View style={styles.HeaderContent}>
//                 <View style={styles.SearchInput}>
//                     <Icon name='search' size={20} color='#CCC' />
//                     <TextInput 
//                         placeholder='Digite a data do agendamento'
//                         // underlineColorAndroid='#FFF'
//                         placeholderTextColor='#CCC'
//                         // onChangeText={(text) => _onChangeSearchText(text)}
//                         style={{flex: 1,}}
//                     />
//                 </View>
//             </View>
//     }
// }

export default AgendamentoList
