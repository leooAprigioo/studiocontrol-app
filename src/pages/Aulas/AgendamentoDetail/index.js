import React, {useState} from 'react';

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

const AgendamentoDetail = () => {

    const [showMoreAluno, setShowMoreAluno] = useState(false);
    const [showMoreExercicio, setShowMoreExercicio] = useState(false);

    return (
        <ScrollView>
            <View style={styles.Container}>
                <View style={styles.Header}>
                    {/* Data e Hora*/}
                    <View style={styles.TitleContainer}>
                        <Text style={styles.Title}>02/10/2019 às 12:00</Text>
                        <Text style={styles.SubTitle}>Quarta-Feira</Text>
                    </View>
                </View>
                <View style={styles.Content}>
                    {/* Section Dados da aula*/}
                    <View style={styles.Section}>
                        <View style={styles.Row}>
                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                <Text style={styles.DataLabel}>Professor: </Text>
                                <Text style={styles.DataValue}>Ivan Gay</Text>
                            </View>
                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                <Text style={styles.DataLabel}>Duração da aula: </Text>
                                <Text style={styles.DataValue}>100 mins</Text>
                            </View>
                        </View>
                        <View style={styles.Row}>
                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                <Text style={styles.DataLabel}>Situação: </Text>
                                <Text style={[styles.DataValue, styles.RelevantDataValue, {color: TreinoColor}]}>Pendente</Text>
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
                            <View style={styles.Data}>
                                <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                            </View>
                            <View style={styles.Data}>
                                <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                            </View>
                            <View style={styles.Data}>
                                <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                            </View>
                            <View style={styles.Data}>
                                <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                            </View>
                            {
                                showMoreAluno ?
                                <View style={{flex: 1}}>
                                    <View style={styles.Data}>
                                        <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                        <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                                    </View>
                                    <View style={styles.Data}>
                                        <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                        <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                                    </View>
                                    <View style={styles.Data}>
                                        <Text style={[styles.DataLabel, styles.TextAlignCenter]}>Leonardo Aprigio da Silva</Text>
                                        <Text style={[styles.DataValue, styles.TextAlignCenter]}>111.111.111-11</Text>
                                    </View>
                                </View> :
                                <View></View>
                            }
   
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
                            </View>
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
                            <View style={[styles.Row]}>
                                <View style={[styles.Data, styles.AlignItemCenter]}>
                                    <Text style={styles.DataLabel}>Exercício 1</Text>
                                    <Text style={styles.DataValue}>20 mins</Text>
                                </View>
                                <View style={[styles.Data, styles.AlignItemCenter]}>
                                    <Text style={styles.DataLabel}>Exercício 2</Text>
                                    <Text style={styles.DataValue}>20 mins</Text>
                                </View>
                            </View>
                            <View style={[styles.Row]}>
                                <View style={[styles.Data, styles.AlignItemCenter]}>
                                    <Text style={styles.DataLabel}>Exercício 3</Text>
                                    <Text style={styles.DataValue}>20 mins</Text>
                                </View>
                                <View style={[styles.Data, styles.AlignItemCenter]}>
                                    <Text style={styles.DataLabel}>Exercício 4</Text>
                                    <Text style={styles.DataValue}>20 mins</Text>
                                </View>
                            </View>
                            <View style={[styles.Row]}>
                                <View style={[styles.Data, styles.AlignItemCenter]}>
                                    <Text style={styles.DataLabel}>Exercício 5</Text>
                                    <Text style={styles.DataValue}>20 mins</Text>
                                </View>
                                <View style={[styles.Data, styles.AlignItemCenter]}></View>
                            </View>
                            {
                                showMoreExercicio ?
                                    <View style={{flex: 1}}>
                                        <View style={[styles.Row]}>
                                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                                <Text style={styles.DataLabel}>Exercício 1</Text>
                                                <Text style={styles.DataValue}>20 mins</Text>
                                            </View>
                                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                                <Text style={styles.DataLabel}>Exercício 2</Text>
                                                <Text style={styles.DataValue}>20 mins</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.Row]}>
                                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                                <Text style={styles.DataLabel}>Exercício 3</Text>
                                                <Text style={styles.DataValue}>20 mins</Text>
                                            </View>
                                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                                <Text style={styles.DataLabel}>Exercício 4</Text>
                                                <Text style={styles.DataValue}>20 mins</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.Row]}>
                                            <View style={[styles.Data, styles.AlignItemCenter]}>
                                                <Text style={styles.DataLabel}>Exercício 5</Text>
                                                <Text style={styles.DataValue}>20 mins</Text>
                                            </View>
                                            <View style={[styles.Data, styles.AlignItemCenter]}></View>
                                        </View>
                                    </View>
                                    :
                                    <View></View>
                            }
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
                            </View>
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