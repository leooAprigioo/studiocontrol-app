import React, {useState, useEffect} from 'react';

import {
    StyleSheet, 
    View, 
    ScrollView,
    TouchableOpacity,
    TextInput,
    Text,
    Button,
    ActivityIndicator
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
    ProfessorColor,

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
    DataSubTitle,
    DataValue,
    DataPrice,
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
    DataSubTitle,
    DataValue,
    DataPrice,
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

import AlunoService from '../../../services/AlunoService';
import ProfessorService from '../../../services/ProfessorService';
import PerfilService from '../../../services/PerfilService';
import TurmaService from '../../../services/TurmaService';
import PlanoService from '../../../services/PlanoService';

const UsuarioDetail = (props) => {

    const [usuario, setUsuario] = useState([]);
    const [loader, setLoader] = useState(true)
    const [user_type, setUser_Type] = useState([])
    const [aluno, setAluno] = useState([]);
    const [professor, setProfessor] = useState([]);
    const [turma, setTurma] = useState([]);
    const [plano, setPlano] = useState([]);

    async function fetchData() {
        const id_perfil = props.navigation.getParam('id_perfil');
        const user_type = props.navigation.getParam('user_type');
        const aluno = props.navigation.getParam('aluno');
        const professor = props.navigation.getParam('professor');
        console.log(professor)
        console.log(aluno)
        setAluno(aluno)
        setProfessor(professor)
        console.log(user_type)
        setUser_Type(user_type)

        await PerfilService.get_full(id_perfil).then((resultsPerfil) => {
            console.log(resultsPerfil)
            if (resultsPerfil[0].telefone != null && resultsPerfil[0].telefone != '') {
                console.log(resultsPerfil[0].telefone)
                resultsPerfil[0].telefone = (resultsPerfil[0].telefone).toString().split(',')
                console.log(resultsPerfil[0].telefone)
            }

            if (resultsPerfil[0].data_cadastro != null && resultsPerfil[0].data_cadastro != '') {
                resultsPerfil[0].data_cadastro = new Date(resultsPerfil[0].data_cadastro)
            }

            if (resultsPerfil[0].data_nascimento != null && resultsPerfil[0].data_nascimento != '') {
                resultsPerfil[0].data_nascimento = new Date(resultsPerfil[0].data_nascimento)
            }

            setUsuario(resultsPerfil[0]); 
        }).catch((error) => {console.log(error)});
        
        if (user_type == 'aluno') {
            await AlunoService.get(aluno.id_aluno).then((resultsAluno) => {
                setAluno(resultsAluno[0])
                TurmaService.get_turma_aluno_resumo(resultsAluno[0].id).then((resultsTurma) => {
                
                    resultsTurma.map((turma) => {
                        console.log(turma)
                    turma.horario_aula = turma.horario_aula.split(',')
                    })
                    setTurma(resultsTurma)
                })
                PlanoService.get_plano_aluno_resumo(resultsAluno[0].id).then((resultsPlano) => setPlano(resultsPlano[0])).catch((error) => console.log(error))
            }).catch((error) => console.log(error))

        } else if (user_type == 'professor') {
            await ProfessorService.get(professor.id_professor).then((resultsProfessor) => {
                console.log(resultsProfessor)
                setProfessor(resultsProfessor[0])
            })
        }

    } 

    useEffect(() => {
        fetchData().then(setLoader(false));
    }, [])

    return(

        <ScrollView 
            style={styles.Container}
            showsVerticalScrollIndicator={false}
        >
            {
            loader ?
            <ActivityIndicator size='large' color={user_type == 'aluno' ? AlunoColor : ProfessorColor} />
            :
            <View style={styles.Container}>
                <View style={styles.ContainerHeader}>
                    <Text style={fonts.Title}>{usuario.nome_completo}</Text>
                    {/* <Text style={fonts.SubTitle}>{aluno.objetivo}{console.log(aluno)}{console.log(turma)}{console.log(plano)}</Text> */}
                    { user_type && user_type == 'aluno' ?
                        <Text style={fonts.Description}>{aluno.objetivo}</Text>
                    :
                        <Text style={fonts.Description}>{console.log(professor)}{professor.graduacao}</Text>
                    }
                    {console.log(plano)}
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
                            { usuario.telefone != null && (usuario.telefone.length > 0) ? usuario.telefone.map((tel) => {return <Text style={styles.DataValue} key={tel.toString()}>{tel}{console.log(tel)}</Text>}) : <Text style={styles.DataValue}>Não cadastrado</Text>}
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
                            {console.log(usuario.data_nascimento)}
                            <Text style={styles.DataValue}>{usuario.data_nascimento != null ? usuario.data_nascimento.getDate().toString() + '/' + usuario.data_nascimento.getMonth().toString() + '/' +usuario.data_nascimento.getFullYear().toString() : ''}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Data do cadastro:</Text>
                            <Text style={styles.DataValue}>{usuario.data_cadastro != null ? usuario.data_cadastro.getDate().toString() + '/' + usuario.data_cadastro.getMonth().toString() + '/' +usuario.data_cadastro.getFullYear().toString() : ''}</Text>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Endereço:</Text>
                            <Text style={[styles.DataValue, {textAlign: 'center'}]}>{
                                usuario.nome_rua != null ? 
                                usuario.nome_rua + ', ' + usuario.numero + (usuario.complementos ? ', ' + usuario.complementos : '') + ' - ' + usuario.bairro + ' - ' + usuario.cep + ' - ' + usuario.cidade + ' - ' + usuario.estado
                                 : 'Não cadastrado'
                                }</Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        user_type == 'aluno' ?
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
                                onPress={() => props.navigation.navigate('AgendamentoUsuario', {aluno: aluno, operation: 'get'})}
                                >
                                <Icon name='calendar-day' size={20} color='#FFF' />
                                <Text style={styles.OptionTitle}>Aulas Agendadas</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity 
                                style={[styles.Option, {backgroundColor: MedidasColor}]}
                                onPress = {() => {props.navigation.navigate('MedidasList', {id_aluno: aluno.id})}}
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
                        :
                        <View style={components.Slider}>
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: AlunoColor}]}
                            onPress={() => props.navigation.navigate('UsuarioForm', {usuario: usuario, user_type: 'professor', operation: 'update'})}
                        >
                            <Icon name='user-edit' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Alterar dados pessoais</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: PlanoColor}]}
                        >
                            <Icon name='receipt' size={20} color='#FFF' />    
                            <Text style={styles.OptionTitle}>Turmas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.Option, {backgroundColor: AulaColor}]}
                            >
                            <Icon name='calendar-day' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Aulas Agendadas</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity
                            style={[styles.Option, {backgroundColor: FinanceiroColor}]}
                            >
                            <Icon name='file-invoice-dollar' size={20} color='#FFF' />
                            <Text style={styles.OptionTitle}>Pagamentos</Text>
                        </TouchableOpacity> 
                    </View>
                    }
                    
                </ScrollView>
                <View style={styles.SectionPlano}>
                    <View style={styles.SectionHeader}>
                        <Text style={fonts.SubTitle}>Planos e Turmas</Text>
                    </View>
                    {                    
                    plano && plano.nome_plano ?
                    <View>
                        <View style={styles.ContainerHeader}>
                            <View style={styles.ContainerHeader}>
                                <Text style={fonts.Title}>{plano.nome_plano}</Text>
                                <Text style={
                                    fonts.Description
                                    }>{plano.descricao_plano}</Text>
                            </View>
                        </View>
                        <View style={components.Divisor}></View>
                        <View style={styles.SectionHorizontalItem}>
                            <View style={[styles.Data, styles.AlignSelfStart]}>
                                <Text style={styles.DataTitle}>Aulas por semana:</Text>
                                <Text style={styles.DataValue}>{plano.quantidade_aula}</Text>
                            </View>
                            <View style={[styles.Data, styles.AlignSelfEnd]}>
                                <Text style={styles.DataTitle}>Valor do plano:</Text>
                                <Text style={[styles.DataValue, styles.DataPrice]}>R$ 
                                {plano.valor_plano ? plano.valor_plano.toFixed(2).replace('.', ',') : null}</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataValue}>Não há plano cadastrado</Text>
                        </View>
                    </View>

                }

                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={[fonts.Title]}>Turmas</Text>
                        </View>
                    </View>
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataTitle}>Nome da turma:</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataTitle}>Horário da turma:</Text>
                        </View>
                    </View>
                    {turma && turma.length > 0 ? 
                    turma.map((tur) => {
                    return <View style={styles.SectionHorizontalItem} key={tur.id_turma}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataValue}>{tur.nome_turma}</Text>
                        </View>
                        <View style={[styles.Data, styles.AlignSelfEnd]}>
                            <Text style={styles.DataValue}>{tur.horario_aula[0]}{tur.horario_aula.length > 1 ? <Text style={{fontWeight:'bold', marginHorizontal: 2}}>+</Text>: <Text></Text>}</Text>
                        </View>
                    </View> 
                    })
                    :
                    <View style={styles.SectionHorizontalItem}>
                        <View style={[styles.Data, styles.AlignSelfStart]}>
                            <Text style={styles.DataValue}>Não há turmas cadastradas</Text>
                        </View>
                    </View>
                    }
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
            }
        </ScrollView>
    );
}

UsuarioDetail.navigationOptions = ({ navigation }) => {
    const user_type = navigation.getParam('user_type', 'aluno')
    return {
            headerTitle: user_type == 'aluno' ? 'Informações do aluno' : 'Informações do professor',
            headerStyle: {backgroundColor: user_type == 'aluno' ? AlunoColor : ProfessorColor},
            headerTintColor: '#FFF'
        }  
}

export default UsuarioDetail;