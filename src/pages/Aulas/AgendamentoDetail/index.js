import React, {useState, useEffect} from 'react';

import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';

import {
    Container,
    Header,
    TitleContainer,
    Title,
    SubTitle,
    Content,
    Section,
    SectionAlunos,
    SectionHeader,
    SectionTitleContainer,
    SectionTitle,
    SectionContent,
    Data,
    DataLabel,
    DataValue,
    RelevantDataValue,
    Option,
    OptionButton,
    OptionBorderButton,
    OptionLegend,
    ShowMore,
    ShowMoreButton,
    ShowMoreText,
    Row,
    Column,
    AlignItemCenter,
    Diviser,
    SectionShadow,
    TextAlignCenter,
} from './styles';
import { AulaColor, FinanceiroColor, AlunoColor, TreinoColor } from '../../../shared/styles/colors';

const styles = StyleSheet.create({
    Container,
    Header,
    TitleContainer,
    Title,
    SubTitle,
    Content,
    Section,
    SectionAlunos,
    SectionHeader,
    SectionTitleContainer,
    SectionTitle,
    SectionContent,
    Data,
    DataLabel,
    DataValue,
    RelevantDataValue,
    Option,
    OptionButton,
    OptionBorderButton,
    OptionLegend,
    ShowMore,
    ShowMoreButton,
    ShowMoreText,
    Row,
    Column,
    AlignItemCenter,
    Diviser,
    SectionShadow,
    TextAlignCenter,
})

import Icon from 'react-native-vector-icons/MaterialIcons';

import AgendamentoService from '../../../services/AgendamentoService'
import TreinoService from '../../../services/TreinoService'
import AlunoService from '../../../services/AlunoService';

const AgendamentoDetail = (props) => {

    const [showMoreAluno, setShowMoreAluno] = useState(false);
    const [showMoreExercicio, setShowMoreExercicio] = useState(false);
    const [agendamento, setAgendamento] = useState([])
    const [exercicios, setExercicios] = useState([])
    const [exerciciosOnHide, setExerciciosOnHide] = useState([])
    const [exerciciosOnDisplay, setExerciciosOnDisplay] = useState([])
    const [alunos, setAlunos] = useState([])
    const [alunosOnHide, setAlunosOnHide] = useState([])
    const [alunosOnDisplay, setAlunosOnDisplay] = useState([])

    function splitsInTwo(data) {
        let newArr = []
        for(let i = 0; i < data.length; i = i+2) {
            let arrTemp = []
            for (let j = i; j < i + 2; j++) {
                arrTemp.push(data[j])
            }
            console.log(arrTemp)
            newArr.push(arrTemp)
        }
        return newArr
    }

    function splitExercicios(treino) {
        let onDisplay = []
        let onHide = []
        newArr = splitsInTwo(treino)
        if (newArr.length > 0) {
            onDisplay = newArr.slice(0, 2)
            if (newArr.length > 4) {
                onHide = newArr.slice(2)
            }
        }
        setExerciciosOnHide(onHide)
        setExerciciosOnDisplay(onDisplay)
    }

    function splitAlunos(alunos) {
        let onDisplay = []
        let onHide = []
        if (alunos.length > 0) {
            onDisplay = alunos.slice(0, 4)
            if (alunos.length > 4) {
                onHide = alunos.slice(4)
            }
        }
        console.log('alunos')
        console.log(onHide)
        console.log(onDisplay)
        setAlunosOnHide(onHide)
        setAlunosOnDisplay(onDisplay)
    }

    async function fetchData() {
        const id_agendamento = props.navigation.getParam('id_agendamento')
        await AgendamentoService.getCompleto(id_agendamento).then((res) => {
            let data_agendamento = res[0].data_horario
            res[0].data_horario = new Date(res[0].data_horario);
            console.log(res)
            setAgendamento(res[0])
            TreinoService.listByTreinoAgendamento(res[0].id_treino).then((resTreino) => {
                setExercicios(resTreino);
                splitExercicios(resTreino)
                console.log(resTreino)
            }).catch((error) => console.log(error));
            AlunoService.getAlunoAgendado(res[0].id_aula, data_agendamento).then((resAluno) => {
                setAlunos(resAluno);
                splitAlunos(resAluno)
                console.log(resAluno)
            }).catch((error) => console.log(error));
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData().then(() => {
        });
    }, [])

    return (
        <ScrollView>
            <View style={styles.Container}>
                <View style={styles.Header}>
                    {console.log(agendamento)}
                    {/* Data e Hora*/}
                    <View style={styles.TitleContainer}>
                        <Text style={styles.Title}>
                            {Object.keys(agendamento).length > 0 ? agendamento.data_horario.getDate().toString() + '/' + (agendamento.data_horario.getMonth() + 1).toString() + '/' + agendamento.data_horario.getFullYear().toString(): ''} às {Object.keys(agendamento).length > 0 ? agendamento.data_horario.getHours().toString() + ':' + agendamento.data_horario.getMinutes().toString(): ''}
                        </Text>
                        <Text style={styles.SubTitle}>Quarta-Feira</Text>
                    </View>
                </View>
                <View style={styles.Content}>
                    {/* Section Dados da aula*/}
                    <View style={styles.Section}>
                        <View style={styles.Row}>
                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                <Text style={styles.DataLabel}>Professor: </Text>
                                <Text style={styles.DataValue}>{agendamento ? agendamento.nome_professor: ''}</Text>
                            </View>
                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                <Text style={styles.DataLabel}>Duração da aula: </Text>
                                <Text style={styles.DataValue}>{agendamento ? agendamento.duracao_aula: ''} mins</Text>
                            </View>
                        </View>
                        <View style={styles.Row}>
                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                <Text style={styles.DataLabel}>Situação: </Text>
                                <Text style={[styles.DataValue, styles.RelevantDataValue, {color: TreinoColor}]}>{agendamento ? agendamento.status_agendamento: ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.Diviser}></View>    
                    {/* Section Dados da aula*/}
                    <View style={styles.Section}>

                        <View style={styles.Row}>
                            <View style={styles.Option}>
                                <TouchableOpacity
                                    style={[styles.OptionButton]}
                                >
                                    <View style={styles.AlignItemCenter}>
                                        <Icon name='edit' size={20} color='#6FBD00' />
                                        <Text style={[styles.OptionLegend, {color: '#6FBD00'}]}>Alterar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Option}>
                                <TouchableOpacity
                                    style={[styles.OptionButton]}
                                >
                                    <View style={styles.AlignItemCenter}>
                                        <Icon name='clear' size={20} color='#C70000' />
                                        <Text style={[styles.OptionLegend, {color: '#C70000'}]}>Cancelar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.Option}>
                            <TouchableOpacity
                                style={[styles.OptionButton, {width: '100%', backgroundColor: '#00BD70'}]}
                            >
                                <Text style={styles.OptionLegend}>Confirmar aula</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                          
                    {/* Section Alunos*/}
                    <View style={[styles.Section, styles.SectionShadow, styles.SectionAlunos]}>
                        <View style={styles.SectionHeader}>
                            <View style={styles.SectionTitleContainer}>
                                <Text style={[styles.SectionTitle, {color: AlunoColor}]}>Alunos</Text>
                            </View>
                        </View>
                        <View style={[styles.SectionContent, styles.AlignItemCenter]}>
                            {
                                alunosOnDisplay && alunosOnDisplay.length > 0 ?
                                alunosOnDisplay.map((aluno) => {
                                    return <View style={styles.Data} key={aluno.id_aluno.toString()}>
                                        <Text style={[styles.DataLabel, styles.TextAlignCenter]}>{aluno.nome_completo}</Text>
                                        <Text style={[styles.DataValue, styles.TextAlignCenter]}>{aluno.cpf}</Text>
                                    </View>
                                }):
                                <View style={styles.Data}>
                                    <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Não há alunos agendados</Text>
                                </View>
 
                            }
                            {
                                alunosOnHide && alunosOnHide.length > 0?
                                showMoreAluno ?
                                <View style={{flex: 1}}>
                                    {alunosOnHide.map((aluno) => {
                                        return <View style={styles.Data} key={aluno.id_aluno.toString()}>
                                            <Text style={[styles.DataLabel, styles.TextAlignCenter]}>{aluno.nome_completo}</Text>
                                            <Text style={[styles.DataValue, styles.TextAlignCenter]}>{aluno.cpf}</Text>
                                        </View>
                                    })}
                                </View> :
                                <View></View>:
                                <View></View>
                            }
                            {
                                alunosOnHide && alunosOnHide.length > 0?
                                <View style={styles.ShowMore}>
   
                                <TouchableOpacity
                                    style={styles.ShowMoreButton}
                                    onPress={() => {setShowMoreAluno(!showMoreAluno)}}
                                >
                                    {
                                    !showMoreAluno ? 
                                        <Text style={styles.ShowMoreText}>Mostrar todos os alunos</Text> :
                                        <Text style={styles.ShowMoreText}>Esconder os alunos</Text>
                                    }
                                </TouchableOpacity>
                            </View>:
                            <View></View>
                            }      
                        </View>
                    </View>
                    {/* Section Treino */}
                    <View style={[styles.Section, styles.SectionShadow]}>
                        <View style={styles.SectionHeader}>
                            <View style={styles.SectionTitleContainer}>
                                <Text style={[styles.SectionTitle, {color: TreinoColor}]}>Treino</Text>
                            </View>
                        </View>
                        <View style={styles.SectionContent}>
                            {
                                exerciciosOnDisplay && exerciciosOnDisplay.length > 0 ?
                                exerciciosOnDisplay.map((exercicio) => {
                                return <View style={[styles.Row]} key={exercicio[0].id_exercicio.toString()}>
                                    
                                    <View style={[styles.Data, styles.AlignItemCenter]}>
                                        <Text style={styles.DataLabel}>{exercicio[0].nome}</Text>
                                        <Text style={styles.DataValue}>{exercicio[0].duracao_exercicio} mins</Text>
                                    </View>
                                    <View style={[styles.Data, styles.AlignItemCenter]}>
                                        <Text style={styles.DataLabel}>{exercicio[1].nome}</Text>
                                        <Text style={styles.DataValue}>{exercicio[1].duracao_exercicio} mins</Text>
                                    </View>
                                </View>
                                }):
                                <View></View>
                            }
                            {
                                exerciciosOnHide && exerciciosOnHide.length > 0?
                                    showMoreExercicio ?
                                        <View style={{flex: 1}}>
                                            {exerciciosOnHide.map((exercicio) => {
                                                return <View style={[styles.Row]} key={exercicio[0].id_exercicio.toString()}>
                                                    {
                                                        exercicio[0] ? 
                                                        <View style={[styles.Data, styles.AlignItemCenter]}>
                                                            <Text style={styles.DataLabel}>{exercicio[0].nome}</Text>
                                                            <Text style={styles.DataValue}>{exercicio[0].duracao_exercicio} mins</Text>
                                                        </View>:
                                                        <View style={[styles.Data, styles.AlignItemCenter]}></View>
                                                    }
                                                    {
                                                        exercicio[1] ? 
                                                        <View style={[styles.Data, styles.AlignItemCenter]}>
                                                            <Text style={styles.DataLabel}>{exercicio[1].nome}</Text>
                                                            <Text style={styles.DataValue}>{exercicio[1].duracao_exercicio} mins</Text>
                                                        </View>:
                                                        <View style={[styles.Data, styles.AlignItemCenter]}></View>
                                                    }
                                                </View>
                                            })}
                                        </View>
                                        :
                                        <View></View>
                                    :
                                    <View></View>
                            }
                            {
                                exerciciosOnHide && exerciciosOnHide.length > 0 ?
                                <View style={styles.Row}>
                                    <View style={[styles.Data, styles.AlignItemCenter]}>
                                        <View style={styles.ShowMore}>
                                            <TouchableOpacity
                                                style={styles.ShowMoreButton}
                                                onPress={() => {setShowMoreExercicio(!showMoreExercicio)}}
                                            >
                                                {
                                                !showMoreExercicio ? 
                                                    <Text style={styles.ShowMoreText}>Mostrar todos os exercícios</Text> :
                                                    <Text style={styles.ShowMoreText}>Esconder os exercícios</Text>
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>:
                                <View></View>
                            }

                        </View>
                    </View>
                </View>
                <View>

                </View>
            </View>
        </ScrollView>
    )
}


AgendamentoDetail.navigationOptions = ({ navigation }) => {
    return {
            headerTitle: 'Informações do agendamento',
            headerStyle: {backgroundColor: AulaColor},
            headerTintColor: '#FFF'
        }  
}

export default AgendamentoDetail;