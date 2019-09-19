import {StyleSheet} from 'react-native';
import { PlanoColor } from '../../../shared/styles/colors'

export const Container = {
    flex: 1,
    backgroundColor: '#FBFBFB',
}

export const Header = {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
}

export const Content = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
}

export const Turma = {
    backgroundColor: '#FFF',
    flex: 1,
    borderLeftWidth: 5,
    borderLeftColor: PlanoColor,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
}

export const TurmaColumn = {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
}

export const TurmaHeader = {
    flex: 2,
    justifyContent: 'space-around',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#AAA',
    borderRadius: 1,
    paddingHorizontal: 10,
}

export const TurmaTitle = {
    fontSize: 16,
    color: PlanoColor,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
}

export const TurmaDescription = {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
}

export const TurmaContent = {
    flex: 3,
    justifyContent: 'space-around',
    alignContent: 'center',
}

export const TurmaData = {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 5,
}

export const TurmaDataTitle = {
    fontSize: 12, 
    fontWeight: 'bold',
}

export const TurmaDataValue = {
    fontSize: 12
}

export const TurmaFooter = {
    color:'#000',
}

export const TurmaDataPrice = {
    fontSize: 16, 
    fontWeight: 'bold',
    color: PlanoColor,
}