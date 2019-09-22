import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
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

import Icon from 'react-native-vector-icons/MaterialIcons';
import MedidasService from '../../../services/MedidasService';

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
    const [id_aluno, setId_Aluno] = useState([]);
    const [loader, setLoader] = useState(true)

    async function fetchData () {

        const id_aluno = props.navigation.getParam('id_aluno');
        setId_Aluno(id_aluno)

        await MedidasService.getAluno(id_aluno).then((resultsMedidas) => {
            console.log(resultsMedidas)
            resultsMedidas.map((medida) => {
                medida.data_atualizacao = new Date(medida.data_atualizacao)
            }) 
            setMedidas(resultsMedidas)}).catch((error) => {console.log(error)})
    }

    useEffect(() => {
        fetchData().then(() => setLoader(false));
    }, [])

    return (
        <View style={styles.Container}>
            {
                loader ?
                <ActivityIndicator size='large' color={MedidasColor} />
                :
                
                    medidas && medidas.length > 0 ?
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={medidas}
                    renderItem={({item}) => 

  
                        <TouchableOpacity style={styles.CardContainer}>
                            <View>
                                <View style={styles.CardHeader}>
                                    <Text style={[fonts.SubTitle, {textAlign: 'center'}]}>Cadastrado em: {console.log(item.data_atualizacao)}{ item.data_atualizacao && item.data_atualizacao instanceof Date ? item.data_atualizacao.getDate() + '/' + (item.data_atualizacao.getMonth() + 1) + '/' + item.data_atualizacao.getFullYear() + ' ' + item.data_atualizacao.getHours() + ':' + item.data_atualizacao.getMinutes() : null}</Text>
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
                :
                <Text style={{textAlign: 'center', fontSize: 16}}>Não há medidas cadastradas</Text>
            }
                <TouchableOpacity 
                    style={[buttons.FloatingButton, {backgroundColor: MedidasColor}]}
                    onPress={() => props.navigation.navigate('MedidasForm', {id_aluno: id_aluno})}
                >
                <Icon name='add' size={20} color='#FFF' />
            </TouchableOpacity>
        </View>
    )
}

MedidasList.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Medidas',
        headerStyle: {backgroundColor: MedidasColor},
        headerTintColor: '#FFF'
        }  
}

export default MedidasList;