import {StyleSheet} from 'react-native'
import { AulaColor, AlunoColor } from '../../../shared/styles/colors'

export const Container = {
    flex: 1,
}

export const Header = {
    flex: 1,
}

export const HorizontalDateList = {
    flex: 1, 
    flexDirection: 'row'    
}

export const DateItem = {
    flex: 1, 
    paddingVertical: 20, 
    paddingHorizontal: 20
}

export const DateText = {
    fontSize: 16, 
    fontWeight: 'bold'
}

export const DateActiveItem = {
    borderBottomColor: AlunoColor,
    borderBottomWidth: 5
}

export const DateActiveText = {
    color: AlunoColor,
}

export const Content = {
    flex: 2,
}

export const Footer = {
    flex: 1,
}

export const Diviser = {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}

export const DiviserText = {
    flex: 3,
    fontSize: 18,
    textAlign: 'center',

}

export const DiviserRow = {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginBottom: 10,
}

export const AulaAgendada = {

    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRightWidth: 5,
    borderRightColor: AulaColor,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

}

export const AulaAgendadaHeader = {
    flex: 1,
}

export const HeaderItem = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
}

export const HeaderTitle = {
    fontSize: 20, 
    textAlign: 'center', 
    color: AulaColor, 
    fontWeight: 'bold'
}

export const HeaderSubTitle = {
    fontSize: 12, 
    textAlign: 'center', 
    color: '#333', 
}

export const AulaAgendadaContent = {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
}

export const Section = {
    flex: 1,
    flexDirection: 'column',
}

export const SectionContent = {
    flex: 4,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#AAA'
}

export const QuantidadeAlunos = {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#AAA'
}

export const QuantidadeAlunosText = {
    fontSize: 16,
    fontWeight: 'bold',
    color: AlunoColor,
}

export const SectionItem = {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 2,
    flexWrap: 'wrap',
}

export const SectionItemLabel = {
    fontSize: 12,
    fontWeight: 'bold',
}

export const SectionItemValue = {
    fontSize: 12,
    paddingLeft: 2,
}

export const Duracao = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}

export const DuracaoText = {
    color: '#AAA'
}


export const AulaAgendadaFooter = {
    flex: 1,
    paddingTop: 10,
}

export const FooterItem = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}

export const FooterText = {
    fontSize: 18,
    fontWeight: 'bold',
    color: AulaColor,

}

export const SearchInput = {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 20 , 
    backgroundColor: '#FFF', 
    borderRadius: 100
};