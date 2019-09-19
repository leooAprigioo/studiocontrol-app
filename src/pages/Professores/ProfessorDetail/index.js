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
    ProfessorColor
} from '../../../shared/styles/colors';

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

const ProfessorDetail = (props) => {

    const [professor, setProfessor] = useState({});
    const [telefones, setTelefones] = useState([]);
    const [endereco, setEndereco] = useState([]);

    async function fetchData() {
        const professor = props.navigation.getParam('professor', {});

        console.log(professor);
        
        if (Object.keys(professor).length > 0) {
            setProfessor(professor);
        }

        // await PerfilService.getAluno(id_perfil).then((resultsAluno) => {setAluno(resultsAluno[0]); console.log(resultsAluno)}).catch((error) => {console.log(error)});
        await TelefoneService.get(professor.id_perfil).then((resultsTelefone) => {setTelefones(resultsTelefone); console.log(telefones)}).catch((error) => {console.log(error)});
        await EnderecoService.getByPerfil(professor.id_perfil).then((resultsEndereco) => {setEndereco(resultsEndereco); console.log(endereco)}).catch((error) => {console.log(error)});
        
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
                    <Text style={fonts.Title}>{professor.nome_completo}{console.log(professor)}</Text>
                    <Text style={fonts.SubTitle}>Plano Tal</Text>
                    <Text style={fonts.Description}>{professor.objetivo}</Text>
                </View>
                <View style={components.Divisor}></View>
                <View style={styles.SectionPerfil}>
                    <View style={styles.SectionHeader}>
                        <Text style={fonts.SubTitle}>Dados Pessoais</Text>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>E-mail:</Text>
                            <Text style={styles.DataValue}>{professor.email ? professor.email : 'Não cadastrado'}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Telefone:</Text>
                            { telefones && (telefones.length > 0) ? telefones.map((tel) => {return <Text style={styles.DataValue} key={tel.telefone}>{tel.telefone}</Text>}) : <Text style={styles.DataValue}>Não cadastrado</Text>}
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>RG:</Text>
                            <Text style={styles.DataValue}>{professor.rg}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>CPF:</Text>
                            <Text style={styles.DataValue}>{professor.cpf}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>Data de nascimento:</Text>
                            <Text style={styles.DataValue}>{professor.data_nascimento}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Data do cadastro:</Text>
                            <Text style={styles.DataValue}>{professor.data_cadastro}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Endereço:</Text>
                            <Text style={styles.DataValue}>{
                                endereco[0] ? endereco.map((end) => {
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
                            style={[styles.Option, {backgroundColor: ProfessorColor}]}
                        >
                            <Icon name='user-edit' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Alterar dados pessoais</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: '#FF9582'}]}
                        >
                            <Icon name='receipt' size={20} color='#FFF' />    
                            <Text style={styles.OptionTitle}>Planos e Turmas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: '#65C4EB'}]}
                            >
                            <Icon name='calendar-day' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Aulas Agendadas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity
                            style={[styles.Option, {backgroundColor: '#0cbe22'}]}
                            >
                            <Icon name='file-invoice-dollar' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Pagamentos</Text>
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

ProfessorDetail.navigationOptions = ({ navigation }) => {
    return {
        // headerLeft: 
        //     <TouchableOpacity
        //         style={{paddingHorizontal: 20}}
        //         onPress={() => navigation.navigate('AlunosList')
        //         }
        //     >
        //         <Icon name='arrow-left' size={30} color='#FFF' />
        //     </TouchableOpacity>,
        headerTitle: 'Informações do professor'
    }
}

export default ProfessorDetail;