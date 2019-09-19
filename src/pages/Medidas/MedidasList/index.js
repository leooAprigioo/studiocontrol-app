import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import {

    Container,
    CardContainer,
    CardContent,
    CardHeader,
    DataCol,
    DataItem,
    DataValue,
    
} from './styles';

import {
    Title,
    SubTitle,
} from '../../../shared/styles/fonts';

import {
    FloatingButton,
} from '../../../shared/styles/buttons';

import {
    MedidasColor,
} from '../../../shared/styles/colors';

import Icon from 'react-native-vector-icons/FontAwesome5';
import MedidasService from '../../../services/MedidasService';
import AlunoDetail from '../../Alunos/AlunoDetail';

const styles = StyleSheet.create({
    Container,
    CardContainer,
    CardContent,
    CardHeader,
    DataCol,
    DataItem,
    DataValue,
    
});

const fonts = StyleSheet.create({
    Title,
    SubTitle,
});

const buttons = StyleSheet.create({
    FloatingButton,
});

const MedidasList = (props) => {

    const [medidas, setMedidas] = useState([]);
    const [aluno, setAluno] = useState([]);

    async function fetchData () {

        const aluno = props.navigation.getParam('aluno', 0);
        
        if (Object.keys(aluno).length > 0) {
            setAluno(aluno);
            console.log(aluno);
        }

        await MedidasService.getAluno(aluno.id).then((resultsMedidas) => setMedidas(resultsMedidas)).catch((error) => {console.log(error)})
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.Container}>
            <FlatList
            keyExtractor={item => item.id.toString()}
            data={medidas}
            renderItem={({item}) => 

                <TouchableOpacity style={styles.CardContainer}>
                    <View>
                        <View style={styles.CardHeader}>
                            <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Cadastrado em: {item.data_atualizacao}</Text>
                        </View>
                        <View style={styles.CardContent}>
                            <View style={styles.DataCol}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.DataItem}>Peso</Text>
                                    <Text style={styles.DataValue}>{item.peso ? item.peso : 'Não cadastrado'}</Text>  
                                </View>
                                
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.DataItem}>Peitoral</Text>
                                    <Text style={styles.DataValue}>{item.peitoral ? item.peitoral : 'Não cadastrado'}</Text>    
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.DataItem}>Quadril</Text>
                                    <Text style={styles.DataValue}>{item.quadril ? item.quadril : 'Não cadastrado'}</Text>  
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={styles.DataItem}>Biceps D</Text>
                                    <Text style={styles.DataValue}>{item.biceps_direito ? item.biceps_direito : 'Não cadastrado'}</Text>  
                                </View>
                            </View>
                                <View style={styles.DataCol}>

                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Biceps E</Text>
                                        <Text style={styles.DataValue}>{item.biceps_esquerdo ? item.biceps_esquerdo : 'Não cadastrado'}</Text>  
                                    </View>

                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Cintura D</Text>
                                        <Text style={styles.DataValue}>{item.cintura_direita ? item.cintura_direita : 'Não cadastrado'}</Text>    
                                    </View>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Cintura E</Text>
                                        <Text style={styles.DataValue}>{item.cintura_esquerda ? item.cintura_esquerda : 'Não cadastrado'}</Text>  
                                    </View>
                                    
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Coxa D</Text>
                                        <Text style={styles.DataValue}>{item.coxa_direita ? item.coxa_direita : 'Não cadastrado'}</Text>  
                                    </View>
                                </View>
                                <View style={styles.DataCol}>
            
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Coxa E</Text>
                                        <Text style={styles.DataValue}>{item.coxa_esquerda ? item.coxa_esquerda : 'Não cadastrado'}</Text>  
                                    </View>

                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Gemeos D</Text>
                                        <Text style={styles.DataValue}>{item.gemeos_direito ? item.gemeos_direito : 'Não cadastrado'}</Text>  
                                    </View>
                                    
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.DataItem}>Gemeos E</Text>
                                        <Text style={styles.DataValue}>{item.gemeos_esquerdo ? item.gemeos_esquerdo : 'Não cadastrado'}</Text>  
                                    </View>
                                </View>
                            </View>
                        </View>
                </TouchableOpacity>
                       }
                       />
                <TouchableOpacity 
                    style={[buttons.FloatingButton, {backgroundColor: MedidasColor}]}
                    onPress={() => props.navigation.navigate('MedidasForm', {id_aluno: aluno.id})}
                >
                <Icon name='plus' size={20} color='#FFF' />
            </TouchableOpacity>
        </View>
    )
}

MedidasList.navigationOptions = ({ navigation }) => {
    const aluno = navigation.getParam('aluno');
    return {
        headerLeft: 
            <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => navigation.navigate('AlunoDetail', {aluno: aluno})}
            >
                <Icon name='arrow-left' size={30} color='#FFF' />
            </TouchableOpacity>,
        headerTitle: 'Medidas'
    }
}

export default MedidasList;