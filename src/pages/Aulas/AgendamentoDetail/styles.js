import { AulaColor, AlunoColor } from "../../../shared/styles/colors"
import { StyleSheet } from 'react-native';

export const Container = {
    flex: 1,
    backgroundColor: '#FBFBFB'
}
export const Header = {
    flex: 1,
}
export const TitleContainer = {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
}
export const Title = {
    fontSize: 20,
    color: AulaColor,
    fontWeight: 'bold'
}
export const SubTitle = {
    fontSize: 14,
    color: '#555',
}
export const Content = {
    flex: 2,
}
export const Section = {
    flex:1,
    marginVertical: 10
}

export const SectionAlunos = {
    paddingVertical: 10,
}

export const SectionHeader = {
    flex: 1,
}
export const SectionTitleContainer = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
}
export const SectionTitle = {
    fontSize: 18,
    fontWeight: 'bold',
}
export const SectionContent = {
    flex: 2,
}
export const Data = {
    flex: 1,
    padding: 10
}
export const DataLabel = {
    fontSize: 14,
    fontWeight: 'bold',
}
export const DataValue = {
    fontSize: 12,
}

export const RelevantDataValue = {
    fontSize: 18, 
    fontWeight: 'bold'
}

export const Option = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

}
export const OptionButton = {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 10,
}

export const OptionBorderButton = {
    borderWidth: 2, 
    borderRadius: 5,
}

export const OptionLegend = {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
}

export const ShowMore = {
    flex: 1,
}

export const ShowMoreButton = {
    flex: 1,
    backgroundColor: AlunoColor,
    padding: 10,
    borderRadius: 5
}

export const ShowMoreText = {
    color: '#FFF',
    fontSize: 14
}


export const Row = {
    flex: 1,
    flexDirection: 'row',
}

export const Column = {
    flexDirection: 'column',
}

export const AlignItemCenter = {
    alignItems: 'center',
}

export const Diviser = {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
    marginVertical: 10,
}

export const TextAlignCenter = {
    textAlign: 'center',
}

export const SectionShadow = {
    backgroundColor: '#FFF', 
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}