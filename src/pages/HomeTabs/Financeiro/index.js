import React, {useState, useEffect} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import {
    ScrollContainer,
    Container,
    Header,
    HeaderTotalProfit,
    ProfitLabel,
    ProfitValue,
    ProfitPeriod,
    TimelapseLine,
    TimelapseOfPayment,
    DayOfTimelapse,
    ValueOfDay,
    Day,
    DayBorder,
    DayMarker,
    DayLine,
    HeaderOption,
    HeaderOptions,
    HeaderOptionText,
    Content,
    Separator,
    SeparatorLegend,
    Option,
    OptionText
} from './styles'

import BackButton from '../../../components/BackButton'

import Icon from 'react-native-vector-icons/FontAwesome5';

import { ConfiguracaoColor, AlunoColor, ProfessorColor, FinanceiroColor } from '../../../shared/styles/colors'

import StorageService from '../../../services/StorageService'

const styles = StyleSheet.create({
    ScrollContainer,
    Container,
    Header,
    HeaderTotalProfit,
    ProfitLabel,
    ProfitValue,
    ProfitPeriod,
    TimelapseLine,
    TimelapseOfPayment,
    DayOfTimelapse,
    ValueOfDay,
    Day,
    DayBorder,
    DayMarker,
    DayLine,
    HeaderOption,
    HeaderOptions,
    HeaderOptionText,
    Content,
    Separator,
    SeparatorLegend,
    Option,
    OptionText,
})

const Financeiro = (props) => {

    const logout = () => {
        StorageService.remove('credencial').then((resultsCredencial) => {
            StorageService.remove('perfil').then((resultsPerfil) => {
                props.navigation.navigate('Login');
            });
        });
        
    }

    return (
        
        <ScrollView style={styles.ScrollContainer}>
            {console.log(props)}
            {/* Container */}
            <View style={styles.Container}>
                {/* Header */}
                <View style={styles.Header}>
                    <View style={styles.HeaderTotalProfit}>
                        <Text style={styles.ProfitLabel}>Valor a receber</Text>
                        <Text style={styles.ProfitValue}>R$ 12.900,00</Text>
                        <Text style={styles.ProfitPeriod}>01/10 à 31/10</Text>
                    </View>
                    <View style={styles.TimelapseLine}>
                        <View style={styles.TimelapseOfPayment}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>01</Text>
                                        <Text style={styles.ValueOfDay}>R$ 1200,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>02</Text>
                                        <Text style={styles.ValueOfDay}>R$ 500,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>03</Text>
                                        <Text style={styles.ValueOfDay}>R$ 740,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>04</Text>
                                        <Text style={styles.ValueOfDay}>R$ 1570,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>05</Text>
                                        <Text style={styles.ValueOfDay}>R$ 2100,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>06</Text>
                                        <Text style={styles.ValueOfDay}>R$ 930,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>07</Text>
                                        <Text style={styles.ValueOfDay}>R$ 1050,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>08</Text>
                                        <Text style={styles.ValueOfDay}>R$ 690,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>09</Text>
                                        <Text style={styles.ValueOfDay}>R$ 700,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>10</Text>
                                        <Text style={styles.ValueOfDay}>R$ 300,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>11</Text>
                                        <Text style={styles.ValueOfDay}>R$ 1770,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                                <View style={styles.DayOfTimelapse}>
                                    <View style={styles.DayBorder}>
                                        <Text style={styles.Day}>12</Text>
                                        <Text style={styles.ValueOfDay}>R$ 1350,00</Text>
                                    </View>
                                    
                                    <View style={styles.DayMarker}></View>
                                    <View style={styles.DayLine}></View>
                                </View>   
                            </ScrollView>
                        </View>
                    </View>
                    
                    {/* HeaderOptions */}
                    {/* <View style={styles.HeaderOptions}>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.HeaderOption}>
                            <Icon name='user-edit' color='#555' size={20}></Icon>
                            <Text style={styles.HeaderOptionText}>Editar perfil</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                {/* Opcoes */}
                <View style={styles.Content}>
                    <View style={styles.Separator}>
                        <Text style={[styles.SeparatorLegend, {color: AlunoColor}]}>Aluno</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.Option}
                        onPress={() => {props.navigation.navigate('MensalidadeList', {operation: 'pagamento'})}}
                        >
                        <Icon name='credit-card' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Pagar mensalidade</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.Option}>
                        <Icon name='file-invoice-dollar' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Realizar nova cobrança</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity 
                        style={styles.Option}
                        onPress={() => {props.navigation.navigate('MensalidadeList', {operation: 'cancelar_estornar'})}}
                    >
                        <Icon name='undo' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Estornar/Cancelar mensalidade</Text>
                    </TouchableOpacity>
                    <View style={styles.Separator}>
                        <Text style={[styles.SeparatorLegend, {color: ProfessorColor}]}>Professor</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.Option}
                        onPress={() => {props.navigation.navigate('AulasAReceberList', {operation: 'pagamento'})}}
                        >
                        <Icon name='handshake' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Pagar aulas dadas</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.Option}>
                        <Icon name='money-check-alt' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Realizar novo pagamento</Text>
                    </TouchableOpacity> */}
                    {/* <View style={styles.Separator}>
                        <Text style={[styles.SeparatorLegend, {color: '#EA3737'}]}>Relatórios</Text>
                    </View>
                    <TouchableOpacity style={styles.Option}>
                        <Icon name='address-book' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Pagamento por aluno</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Option}>
                        <Icon name='address-card' size={20} color={'#222'} />
                        <Text style={styles.OptionText}>Pagamento por professor</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </ScrollView>
    )

}

Financeiro.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {backgroundColor: ConfiguracaoColor},
        headerTintColor: '#FFF',
        title: 'Configurações',
        headerLeft: 
            <BackButton nav='Estudio'></BackButton>
    }
}

export default Financeiro