import React, {useState, useEffect} from 'react';

import {
    StyleSheet, 
    View, 
    ScrollView,
    TouchableOpacity,
    TextInput,
    Text,
    Button
} from 'react-native';

import {
    Title,
    SubTitle,
    Description,
    SliderLastData,
} from '../../../shared/styles/fonts';

import {
    
    MedidasColor,
    FinanceiroColor,
    AulaColor,
    PlanoColor,
    AlunoColor,

} from '../../../shared/styles/colors'

const fonts = StyleSheet.create({
    Title,
    SubTitle,
    Description,
    SliderLastData,
});

import {
    Divisor,
    Slider,
} from '../../../shared/styles/components';

const components = StyleSheet.create({
    Divisor,
    Slider,
});

import { 
    AlignSelfStart,
    AlignSelfEnd,
    Container,
    ContainerHeader,
    HeaderTitle,
    HeaderSubTitle,
    HeaderDescription,
    SectionPerfil,
    SectionHeader,
    SectionHorizontalItem,
    Data,
    DataTitle,
    DataValue,
    DataDescription,
    Option,
    OptionTitle,
    SectionPlano,
    Aula,
    AulaData,
    AulaHorario,
    SectionMensalidade,
    MensalidadeValue,
    MensalidadePendente,
} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    AlignSelfStart,
    AlignSelfEnd,
    Container,
    ContainerHeader,
    HeaderTitle,
    HeaderSubTitle,
    HeaderDescription,
    SectionPerfil,
    SectionHeader,
    SectionHorizontalItem,
    Data,
    DataTitle,
    DataValue,
    DataDescription,
    Option,
    OptionTitle,
    SectionPlano,
    Aula,
    AulaData,
    AulaHorario,
    SectionMensalidade,
    MensalidadeValue,
    MensalidadePendente,
});

import TelefoneService from '../../../services/TelefoneService';
import EnderecoService from '../../../services/EnderecoService';

const AlunoDetail = (props) => {

    const [usuario, setUsuario] = useState([]);
    const [user_type, setUser_Type] = useState([])
    const [telefones, setTelefones] = useState([]);
    const [endereco, setEndereco] = useState([]);

    async function fetchData() {
        const id_perfil = props.navigation.getParam('id_perfil');
        const user_type = props.navigation.getParam('user_type');

        await PerfilService.get_full(id_perfil).then((resultsPerfil) => {
            console.log(resultsPerfil)
            if (resultsPerfil[0].telefone != null && resultsPerfil[0].telefone != '') {
                resultsPerfil[0].telefone = resultsPerfil[0].telefone.split(',')
            }
            setUsuario(resultsPerfil[0]); 
        }).catch((error) => {console.log(error)});
        
    } 

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <ScrollView 
            style={styles.Container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.Container}>
                <View style={styles.ContainerHeader}>
                    <Text style={fonts.Title}>{aluno.nome_completo}{console.log(aluno)}</Text>
                    <Text style={fonts.SubTitle}>Plano Tal</Text>
                    <Text style={fonts.Description}>{aluno.objetivo}</Text>
                </View>
                <View style={components.Divisor}></View>
                <View style={styles.SectionPerfil}>
                    <View style={styles.SectionHeader}>
                        <Text style={fonts.SubTitle}>Dados Pessoais</Text>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>E-mail:</Text>
                            <Text style={styles.DataValue}>{usuario.email ? usuario.email : 'Não cadastrado'}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Telefone:</Text>
                            { usuario.telefone != null && (usuario.telefone.length > 0) ? usuario.telefone.map((tel) => {return <Text style={styles.DataValue} key={tel.telefone}>{tel.telefone}</Text>}) : <Text style={styles.DataValue}>Não cadastrado</Text>}
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>RG:</Text>
                            <Text style={styles.DataValue}>{usuario.rg}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>CPF:</Text>
                            <Text style={styles.DataValue}>{usuario.cpf}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>Data de nascimento:</Text>
                            <Text style={styles.DataValue}>{usuario.data_nascimento}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Data do cadastro:</Text>
                            <Text style={styles.DataValue}>{usuario.data_cadastro}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Endereço:</Text>
                            <Text style={styles.DataValue}>{
                                usuario.endereco != null ? endereco.map((end) => {
                                    return end.nome_rua + ', ' + end.numero + (end.complementos ? ', ' + end.complementos : '') + ' - ' + end.bairro + ' - ' + end.cep + ' - ' + end.cidade + ' - ' + end.estado
                                }) : 'Não cadastrado'
                                }</Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={components.Slider}>
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: AlunoColor}]}
                        >
                            <Icon name='user-edit' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Alterar dados pessoais</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: PlanoColor}]}
                        >
                            <Icon name='receipt' size={20} color='#FFF' />    
                            <Text style={styles.OptionTitle}>Planos e Turmas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: AulaColor}]}
                            >
                            <Icon name='calendar-day' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Aulas Agendadas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: MedidasColor}]}
                            onPress = {() => {props.navigation.navigate('MedidasList', {aluno: aluno})}}
                        >
                            <Icon name='ruler' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Medidas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity
                            style={[styles.Option, {backgroundColor: FinanceiroColor}]}
                            >
                            <Icon name='file-invoice-dollar' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Mensalidades</Text>
                        </TouchableOpacity> 
                    </View>
                </ScrollView>
                <View style={styles.SectionPlano}>
                    <View style={styles.SectionHeader}>
                        <Text style={fonts.SubTitle}>Planos e Turmas</Text>
                    </View>
                    <View style={styles.ContainerHeader}>
                        <View style={styles.ContainerHeader}>
                            <Text style={fonts.Title}>Plano Tal</Text>
                            <Text style={
                                fonts.Description
                                }>Plano Tal Lorem Ipsum Bla Bla Bla nnca nsa nosano sana  nas ionioanfosanfoi a sionsafoisa nsofsao naso ano san oisnfoisan nao inaoi nsaionfoiasn ois noia noi ao in asn oisn oain osi oas ois asio nsao ns</Text>
                        </View>
                    </View>
                    <View style={components.Divisor}></View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>Aulas por semana:</Text>
                            <Text style={styles.DataValue}>2</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Tipo da Aula:</Text>
                            <Text style={styles.DataValue}>Aula básica</Text>
                        </View>
                    </View>

                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>Nome da turma:</Text>
                            <Text style={styles.DataValue}>Turma de coxa grossa</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Horário da turma:</Text>
                            <Text style={styles.DataValue}>Terça-Feira, 19:00</Text>
                        </View>
                    </View>
                    <Text style={[fonts.SubTitle, {paddingLeft: 20}]}>Próximas aulas:</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={components.Slider}>
                            <TouchableOpacity 
                                style={styles.Aula}
                                >
                                <Text style={styles.AulaData}>25/08/2019</Text>
                                <Text style={styles.AulaHorario}>19:30</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                style={styles.Aula}
                                >
                                <Text style={styles.AulaData}>25/08/2019</Text>
                                <Text style={styles.AulaHorario}>19:30</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                style={styles.Aula}
                                >
                                <Text style={styles.AulaData}>25/08/2019</Text>
                                <Text style={styles.AulaHorario}>19:30</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                style={styles.Aula}
                                >
                                <Text style={styles.AulaData}>25/08/2019</Text>
                                <Text style={styles.AulaHorario}>19:30</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                style={styles.Aula}
                                >
                                <Text style={styles.AulaData}>25/08/2019</Text>
                                <Text style={styles.AulaHorario}>19:30</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                style={styles.Aula}
                                >
                                <Text style={fonts.SliderLastData}>Ver todas as aulas</Text>
                            </TouchableOpacity> 
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.SectionMensalidade}>
                    <View style={styles.SectionHeader}>
                        <Text style={fonts.SubTitle}>Ultima mensalidade</Text>
                    </View>
                    <View style={styles.ContainerHeader}>
                        <View style={styles.SectionHorizontalItem}>
                            <View style={[styles.Data, styles.AlignSelfStart]}>
                                <Text style={styles.MensalidadeValue}>R$ 100,00</Text>
                            </View>
                        </View>
                        <View style={styles.SectionHorizontalItem}>
                            <View style={[styles.Data, styles.AlignSelfStart]}>
                                <Text style={fonts.SubTitle}>Vencimento:</Text>
                                <Text style={styles.DataTitle}>27/08/2019</Text>
                            </View>
                            <View style={[styles.Data, styles.AlignSelfStart]}>
                                <Text style={fonts.SubTitle}>Status:</Text>
                                <Text style={styles.MensalidadePendente}>Pendente</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <TouchableOpacity 
                            style={{ backgroundColor: '#ffcc00', padding: 20}}
                            >
                            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>Enviar notificação</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

AlunoDetail.navigationOptions = ({ navigation }) => {
    return {
        HeaderTitle: 'Teste'
    }
}

export default AlunoDetail;