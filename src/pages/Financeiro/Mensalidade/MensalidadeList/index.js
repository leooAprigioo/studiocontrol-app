import React, { useState } from 'react'

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    TextInput,
    Button,
    Dimensions,
    Alert,

} from 'react-native'

import {
    Container,
    Header,
    Section,
    SearchByCpf,
    DataInput,
    AlunoInformation,
    Name,
    CPF,
    Content,
    CarouselMensalidade,
    Mensalidade,
    MensalidadeHeader,
    MesReferencia,
    ValorTotal,
    MensalidadeContent,
    Data,
    DataLabel,
    DataValue,
    MensalidadeFooter,
    Pendente,
    ShowMore,
    ShowMoreButton,
    ShowMoreText,
} from './styles'

const styles = StyleSheet.create({
    Container,
    Header,
    Section,
    SearchByCpf,
    DataInput,
    AlunoInformation,
    Name,
    CPF,
    Content,
    CarouselMensalidade,
    Mensalidade,
    MensalidadeHeader,
    MesReferencia,
    ValorTotal,
    MensalidadeContent,
    Data,
    DataLabel,
    DataValue,
    MensalidadeFooter,
    Pendente,
    ShowMore,
    ShowMoreButton,
    ShowMoreText,
})

import Carousel from 'react-native-snap-carousel';
import { TextInputMask } from 'react-native-masked-text'
import { withFormik } from 'formik';

import PerfilService from '../../../../services/PerfilService'
import MensalidadeService from '../../../../services/MensalidadeService'
import { FinanceiroColor, AulaColor } from '../../../../shared/styles/colors';
import BackButton from '../../../../components/BackButton';

const MensalidadeList = (props) => {

    const [showMensalidade, setShowMensalidade] = useState(false)
    const [mensalidades, setMensalidades] = useState([])
    const [aluno, setAluno] = useState([])

    const operation = props.navigation.getParam('operation', 'pagamento')

    const operations = {
        pagamento: (mensalidade) => {
            props.navigation.navigate('PagamentoForm', {id_mensalidade: mensalidade.id_mensalidade, nome_aluno: mensalidade.nome_completo, valor_total: ((mensalidade.valor + mensalidade.juros) - mensalidade.desconto), mensalidade: mensalidade})
        },
        cancelar_estornar: (mensalidade) => {
            Alert.alert(
                'Cancelar/Estornar mensalidade',
                'Escolha uma das opções:',
                [
                  {text: 'Sair', onPress: () => {}},
                  {
                    text: 'Cancelar mensalidade',
                    onPress: () => {
                        delete mensalidade.cpf
                        delete mensalidade.nome_completo
                        mensalidade.id = mensalidade.id_mensalidade
                        delete mensalidade.id_mensalidade
                        mensalidade.data_vencimento = mensalidade.data_vencimento.getFullYear().toString() + '-' + (mensalidade.data_vencimento.getMonth() + 1).toString() + '-' + mensalidade.data_vencimento.getDate().toString()
                        mensalidade.status = 'Cancelado'
                        console.log(mensalidade)
                        MensalidadeService.put(mensalidade).then((resMensalidade) => {
                            if ('error' in resMensalidade) {
                                Alert.alert('Não foi possível cancelar a mensalidade', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                    [{
                                        text: 'Ok',
                                        onPress: () => {}
                                    }],
                                    {cancelable: false},
                                )
                            } else {
                                Alert.alert('Mensalidade cancelada com sucesso', 'A mensalidade agora será apresentada como cancelada.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => {}
                                }],
                                {cancelable: false},
                            )
                            }
                        })
                    },
                    style: 'cancel',
                  },
                  {text: 'Estornar mensalidade', onPress: () => {
                    delete mensalidade.cpf
                    delete mensalidade.nome_completo
                    mensalidade.id = mensalidade.id_mensalidade
                    delete mensalidade.id_mensalidade
                    mensalidade.data_vencimento = mensalidade.data_vencimento.getFullYear().toString() + '-' + (mensalidade.data_vencimento.getMonth() + 1).toString() + '-' + mensalidade.data_vencimento.getDate().toString()
                    mensalidade.status = 'Estornado'
                    console.log(mensalidade)
                    MensalidadeService.put(mensalidade).then((resMensalidade) => {
                        if ('error' in resMensalidade) {
                            Alert.alert('Não foi possível estornar a mensalidade', 'Pedimos desculpas pelo transtorno. Tente novamente mais tarde.', 
                                [{
                                    text: 'Ok',
                                    onPress: () => {}
                                }],
                                {cancelable: false},
                            )
                        } else {
                            Alert.alert('Mensalidade estornada com sucesso', 'A mensalidade agora será apresentada como estornada.', 
                            [{
                                text: 'Ok',
                                onPress: () => {}
                            }],
                            {cancelable: false},
                        )
                        }
                    })
                  }},
                ],
                {cancelable: false},
              );
        }
    }


    function vencimentoToDatetime(mensalidades) {
        mensalidades.map((mensalidade) => {
            mensalidade.data_vencimento = new Date(mensalidade.data_vencimento);
        })

        console.log(mensalidades)
        return mensalidades
    }

    async function fetchData(cpf) {
        await PerfilService.getByCpf(cpf).then((res) => {setAluno(res); console.log(res)}).catch((error) => console.log(error));
        await MensalidadeService.getAlunoCpf(cpf).then((res) => {res = vencimentoToDatetime(res); setMensalidades(res); console.log(res)}).catch((error) => console.log(error));
    }

    return (
        <View style={styles.Container}>
            <View style={styles.Header}>
                <View style={styles.Section}>
                    <View style={styles.SearchByCpf}>
                        {console.log(props)}
                        <TextInputMask
                            type={'cpf'}
                            style={styles.DataInput}
                            underlineColorAndroid='#111'
                            selectionColor='#111'
                            maxLength={14}
                            placeholder='Digíte o CPF do aluno'
                            value={props.values.cpf}
                            includeRawValueInChangeText={true}
                            onChangeText={(text, rawText) => {props.setFieldValue('cpf', rawText)}}
                        />
                        <View style={styles.ShowMore}>
                            <TouchableOpacity
                                style={styles.ShowMoreButton}
                                onPress={() => {fetchData(props.values.cpf).then(setShowMensalidade(true))}}
                            >
                                <Text style={styles.ShowMoreText}>Pesquisar aluno</Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.Content}>
                {
                    showMensalidade? 
                    <View style={styles.Section}>
                        <View style={styles.AlunoInformation}>
                            <Text style={styles.Name}>{aluno && aluno.length > 0? aluno[0].nome_completo : 'Aluno não encontrado'}</Text>
                            <Text style={styles.CPF}>{aluno && aluno.length > 0? aluno[0].cpf : ''}</Text>
                        </View>
                    </View>:
                    <View></View>
                }
                {
                    showMensalidade?
                        <View style={styles.CarouselMensalidade}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                style={{flex: 1}}
                                data={mensalidades}
                                renderItem={
                                    ({item, index}) => {
                                        return <TouchableOpacity
                                        style={styles.Mensalidade}
                                        onPress={() => {operations[operation](item)}}
                                    >
                                        <View style={styles.MensalidadeHeader}>
                                            <Text style={styles.MesReferencia}>Vencimento em: {item.data_vencimento instanceof Date  ? item.data_vencimento.getDate().toString() + '/' + (item.data_vencimento.getMonth() + 1).toString(): ''}</Text>
                                            <Text style={styles.ValorTotal}>R$ {((item.valor + item.juros) - item.desconto).toFixed(2).replace('.', ',')}</Text>
                                        </View>
                                        <View style={styles.MensalidadeContent}>
                                            <View style={styles.Data}>
                                                <Text style={styles.DataLabel}>Desconto: </Text>
                                                <Text style={styles.DataValue}>R$ {item.desconto.toFixed(2).replace('.', ',')}</Text>
                                            </View>
                                            <View style={styles.Data}>
                                                <Text style={styles.DataLabel}>Juros: </Text>
                                                <Text style={styles.DataValue}>R$ {item.juros.toFixed(2).replace('.', ',')}</Text>
                                            </View>
                                            <View style={styles.Data}>
                                                <Text style={styles.DataLabel}>Mês de referencia: </Text>
                                                <Text style={styles.DataValue}>{item.mes_referencia}</Text>
                                            </View>
                                            <View style={styles.Data}>
                                                <Text style={styles.DataLabel}>Observação: </Text>
                                                <Text style={styles.DataValue}>{item.observacao}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.MensalidadeFooter}>
                                            <Text style={[styles.Pendente, {color: item.status == 'Pendente'? AulaColor: item.status == 'Cancelado' ||  item.status == 'Estornado' ? '#C70000': FinanceiroColor}]}>{item.status}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    }
                                }
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={(Dimensions.get('window').width - 50)}
                                firstItem={mensalidades && mensalidades.length > 0? mensalidades.length - 1 : 0}
                                />
                            </View>:
                        <View></View>
                } 
            </View>
        </View>
    )
}

MensalidadeList.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: FinanceiroColor},
        title: 'Mensalidades',
        headerTintColor: '#FFF',
        headerLeft: 
            <BackButton nav='Financeiro'></BackButton>,
    }
}

export default withFormik({
    mapPropsToValues: () => ({ cpf: ''}),

})(MensalidadeList);