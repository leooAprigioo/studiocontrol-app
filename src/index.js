import React from 'react';

import Login from './pages/Login';
/* HomeTab */
import Home from './pages/HomeTabs/Home';
import Estudio from './pages/HomeTabs/Estudio';
import Financeiro from './pages/HomeTabs/Financeiro';
import Aulas from './pages/HomeTabs/Aulas';

/* PlanosTab */

import Planos from './pages/PlanosTabs/Planos'
import Turmas from './pages/PlanosTabs/Turmas'

/* Aula */
import AulaForm from './pages/Aulas/AulaForm'

/* Turma */
import TurmaForm from './pages/Turmas/TurmaForm'

/* Plano */
import PlanoForm from './pages/Planos/PlanoForm'

/* Usuario */
import UsuarioList from './pages/Usuarios/UsuarioList';
import UsuarioForm from './pages/Usuarios/UsuarioForm';
import UsuarioResult from './pages/Usuarios/UsuarioResult';
import UsuarioDetail from './pages/Usuarios/UsuarioDetail';
import UsuarioAddressForm from './pages/Usuarios/UsuarioAddressForm';

/* Treino */
import Treinos from './pages/TreinoTabs/Treinos';
import TreinoForm from './pages/Treinos/TreinoForm';

/* Exercicio */
import Exercicios from './pages/TreinoTabs/Exercicios';
import ExercicioForm from './pages/Exercicios/ExercicioForm';

/* Medidas */
import MedidasList from './pages/Medidas/MedidasList';
import MedidasForm from './pages/Medidas/MedidasForm';

/* Configurações */
import ConfigHome from './pages/Configuracoes/ConfigHome'

import Icon from 'react-native-vector-icons/FontAwesome5';

import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { MedidasColor, TreinoColor } from './shared/styles/colors';


const headerOptions = {
    headerStyle: {backgroundColor: '#48a89e'},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
}

const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
});

const MedidasStack = createStackNavigator({
    MedidasList: {
        screen: MedidasList,
        navigationOptions: {
            header: null,
        },
    },
    MedidasForm: {
        screen: MedidasForm,
    }
},
{
    initialRouteName: 'MedidasList',
});

const UsuarioStack = createStackNavigator({
    UsuarioResult: {
        screen: UsuarioResult,
        // navigationOptions: headerOptions,
    },
    UsuarioList: {
        screen: UsuarioList,
        // navigationOptions: headerOptions,
    },
    UsuarioForm: {
        screen: UsuarioForm,
        // navigationOptions: headerOptions,
    },
    UsuarioDetail: {
        screen: UsuarioDetail,
    },
    Medidas: {
        screen: MedidasStack,
        navigationOptions: {
            headerStyle: {backgroundColor: MedidasColor},
            title: 'Medidas',
            headerTintColor: '#FFF'
        }
    },
    UsuarioAddressForm: {
        screen: UsuarioAddressForm,
    },

},
{
    initialRouteName: "UsuarioList",
});


/* Planos e Turmas */
const PlanoStack = createStackNavigator({
    PlanoList: {
        screen: Planos,
        // navigationOptions: {header: null}
    },
    AulaForm: {
        screen: AulaForm,
    },
    PlanoForm: {
        screen: PlanoForm,
    }
},
{
    initialRouteName: "PlanoList",
})

const TurmaStack = createStackNavigator({
    TurmaList: {
        screen: Turmas,
        // navigationOptions: {header: null}
    },
    TurmaForm: {
        screen: TurmaForm
    }
},
{
    initialRouteName: "TurmaList"
})

PlanoStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };
  

TurmaStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};


MedidasStack.navigationOptions = ({ navigation }) => {
    let header = null;
    if (navigation.state.index > 0) {
        return {
            header,
        };
    }
  };

const TreinoStack = createStackNavigator({
    TreinoList: {
        screen: Treinos
    },
    TreinoForm: {
        screen: TreinoForm,
    }
})

const ExercicioStack = createStackNavigator({
    ExercicioList: {
        screen: Exercicios
    },
    ExercicioForm: {
        screen: ExercicioForm,
    }
});

ExercicioStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};


TreinoStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

const TreinosTab = createBottomTabNavigator({
    Treinos: {
        screen: TreinoStack,
        navigationOptions: {
            tabBarLabel: 'Treinos',
            tabBarIcon: ({tintColor}) => (
                <Icon name="dumbbell" size={20} color={tintColor} />
            )
        }
    },
    Exercicios: {
        screen: ExercicioStack,
        navigationOptions: {
            tabBarLabel: 'Exercicios',
            tabBarIcon: ({tintColor}) => (
                <Icon name="running" size={20} color={tintColor} />
            )
        }
    }
},
{
    initialRouteName: "Treinos",
    tabBarOptions: {
        activeTintColor: TreinoColor,
        inactiveTintColor: '#333',
        style: {
            backgroundColor: '#FFF',
            height: 50,
          },
        labelStyle: {
            fontSize: 12
        }
      },
});

const PlanosTab = createBottomTabNavigator({
    Planos: {
        screen: PlanoStack,
        navigationOptions: {
            tabBarLabel: 'Planos',
            tabBarIcon: ({tintColor}) => (
                <Icon name="receipt" size={20} color={tintColor} />
            )
        }
    },
    Turmas: {
        screen: TurmaStack,
        navigationOptions: {
            tabBarLabel: 'Turmas',
            tabBarIcon: ({tintColor}) => (
                <Icon name="chalkboard-teacher" size={20} color={tintColor} />
            )
        }
    }
},
{
    initialRouteName: "Planos",
    tabBarOptions: {
        activeTintColor: '#FF9582',
        inactiveTintColor: '#333',
        style: {
            backgroundColor: '#FFF',
            height: 50,
          },
        labelStyle: {
            fontSize: 12
        }
      },
});

const HomeTab = createBottomTabNavigator({
    Estudio: {
        screen: Estudio,
        navigationOptions: {
            tabBarLabel:"Meu estúdio",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="bars" size={20} color={tintColor} />
            )
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel:"Home",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="home" size={20} color={tintColor} />
            )
        }
    },
    Aulas: {
        screen: Aulas,
        navigationOptions: {
            tabBarLabel:"Aulas",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="address-book" size={20} color={tintColor} />
            )
        }
    },
    Financeiro: {
        screen: Financeiro,
        navigationOptions: {
            tabBarLabel:"Financeiro",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="dollar-sign" size={20} color={tintColor} />
            )
        }
    },
},
{
    initialRouteName: "Estudio",
    tabBarOptions: {
        activeTintColor: '#48a89e',
        inactiveTintColor: '#333',
        style: {
            backgroundColor: '#FFF',
            height: 50,
          },
        labelStyle: {
            fontSize: 12
        }
      },
});

const ConfiguracaoStack = createStackNavigator({
    ConfigHome: {
        screen: ConfigHome,
        // navigationOptions: headerOptions,
    },
},
{
    initialRouteName: "ConfigHome",
});

const App = createSwitchNavigator({
    Login: LoginStack,
    HomeTab: HomeTab,
    Planos: PlanosTab,
    Treinos: TreinosTab,
    Usuarios: UsuarioStack,
    Configuracoes: ConfiguracaoStack,
},
{
    initialRouteName: "Usuarios",
});

const Routes = createAppContainer(App);

export default Routes;