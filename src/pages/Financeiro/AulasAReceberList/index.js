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

import PerfilService from '../../../services/PerfilService'
import AulasAReceberService from '../../../services/AulasAReceberService'
import { FinanceiroColor, AulaColor } from '../../../shared/styles/colors';
import BackButton from '../../../components/BackButton';

const AulasAReceberList = (props) => {

    const [showMensalidade, setShowMensalidade] = useState(false)
    const [aulasAReceber, setAulasAReceber] = useState([])
    const [professor, setProfessor] = useState([])

    const operation = props.navigation.getParam('operation', 'pagamento')

    const operations = {
        pagamento: (aula_receber) => {
            props.navigation.navigate('PagamentoAulaForm', {id_aulas_receber: aula_receber.id_aulas_receber, nome_professor: aula_receber.nome_completo, valor_total: ((aula_receber.vlr_total_aula + aula_receber.adicional) - aula_receber.desconto), aula_receber: aula_receber})
        },
    }


    function vencimentoToDatetime(mensalidades) {
        mensalidades.map((mensalidade) => {
            mensalidade.data_prevista = new Date(mensalidade.data_prevista);
        })

        console.log(mensalidades)
        return mensalidades
    }

    async function fetchData(cpf) {
        await PerfilService.getByCpf(cpf).then((res) => {setProfessor(res); console.log(res)}).catch((error) => console.log(error));
        await AulasAReceberService.getProfessorCpf(cpf).then((res) => {res = vencimentoToDatetime(res); setAulasAReceber(res); console.log(res)}).catch((error) => console.log(error));
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
                            placeholder='Digíte o CPF do professor'
                            value={props.values.cpf}
                            includeRawValueInChangeText={true}
                            onChangeText={(text, rawText) => {props.setFieldValue('cpf', rawText)}}
                        />
                        <View style={styles.ShowMore}>
                            <TouchableOpacity
                                style={styles.ShowMoreButton}
                                onPress={() => {fetchData(props.values.cpf).then(setShowMensalidade(true))}}
                            >
                                <Text style={styles.ShowMoreText}>Pesquisar professor</Text> 
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
                            <Text style={styles.Name}>{professor && professor.length > 0? professor[0].nome_completo : 'Professor não encontrado'}</Text>
                            <Text style={styles.CPF}>{professor && professor.length > 0? professor[0].cpf : ''}</Text>
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
                                data={aulasAReceber}
                                renderItem={
                                    ({item, index}) => {
                                        return <TouchableOpacity
                                        style={styles.Mensalidade}
                                        onPress={() => {operations[operation](item)}}
                                    >
                                        <View style={styles.MensalidadeHeader}>
                                            <Text style={styles.MesReferencia}>Previsto para: {item.data_prevista instanceof Date  ? item.data_prevista.getDate().toString() + '/' + (item.data_prevista.getMonth() + 1).toString(): ''}</Text>
                                            <Text style={styles.ValorTotal}>R$ {((item.vlr_total_aula + item.adicional) - item.desconto).toFixed(2).replace('.', ',')}</Text>
                                        </View>
                                        <View style={styles.MensalidadeContent}>
                                            <View style={styles.Data}>
                                                <Text style={styles.DataLabel}>Desconto: </Text>
                                                <Text style={styles.DataValue}>R$ {item.desconto.toFixed(2).replace('.', ',')}</Text>
                                            </View>
                                            <View style={styles.Data}>
                                                <Text style={styles.DataLabel}>Adicional: </Text>
                                                <Text style={styles.DataValue}>R$ {item.adicional.toFixed(2).replace('.', ',')}</Text>
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
                                firstItem={aulasAReceber && aulasAReceber.length > 0? aulasAReceber.length - 1 : 0}
                                />
                            </View>:
                        <View></View>
                } 
            </View>
        </View>
    )
}

AulasAReceberList.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: FinanceiroColor},
        title: 'Aulas a receber',
        headerTintColor: '#FFF',
        headerLeft: 
            <BackButton nav='Financeiro'></BackButton>,
    }
}

export default withFormik({
    mapPropsToValues: () => ({ cpf: ''}),

})(AulasAReceberList);