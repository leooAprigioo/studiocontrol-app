import { StyleSheet } from 'react-native';
import { PlanoColor } from '../../../shared/styles/colors';

export const Container = {
    flex: 1,
    flexDirection: 'column',
};

export const ContainerHeader = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
};

export const HeaderTitle = {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414141',
};

export const HeaderSubTitle = {
    fontSize: 18,
    color: '#212121',
}

export const HeaderDescription = {
    fontSize: 16,
};

export const SectionPerfil = {
    flex: 1,
    paddingVertical: 30,
};

export const SectionHeader = {
    alignItems: 'center',
    paddingVertical: 10,
}

export const SectionHorizontalItem = {
    flexDirection: 'row',
    justifyContent: 'center',
};

export const Data = {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
}

export const DataTitle = {
    fontSize: 14,
    fontWeight: 'bold',
};

export const DataSubTitle = {
    fontSize: 18, 
    color: '#111',
}

export const DataValue = {
    fontSize: 13,
};

export const DataPrice = {
    color: PlanoColor,
    fontWeight: 'bold'
}

export const DataDescription = {
    fontSize: 12,
};

export const Option = {
    marginHorizontal: 5,
    height: 90,
    width: 90,
    backgroundColor: '#48a89e',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
};

export const OptionTitle = {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 12,
};

export const IconBorder = {
    borderWidth: 3,
    borderColor: '#FFF',
    borderRadius: 100,
    padding: 10
};

export const SectionPlano = {
    flex:1,
};

export const Aula = {
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    height: 110,
    width: 110,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
};

export const AulaData = {
    fontWeight: 'bold',
};

export const SectionMensalidade = {
    paddingVertical: 10
}

export const MensalidadeValue = {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6666',
}

export const MensalidadePendente = {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffcc06',
}
