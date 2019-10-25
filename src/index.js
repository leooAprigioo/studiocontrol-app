import React from 'react';

import Login from './pages/Login';

import MensalidadeList from './pages/Financeiro/Mensalidade/MensalidadeList'
import PagamentoForm from './pages/Financeiro/PagamentoForm';
import AulasAReceberList from './pages/Financeiro/AulasAReceberList';


/* SplashScreen */
import SplashScreen from './pages/SplashScreen';

/* HomeTab */
import Home from './pages/HomeTabs/Home';
import Estudio from './pages/HomeTabs/Estudio';
import Financeiro from './pages/HomeTabs/Financeiro';

/* PlanosTab */

import Planos from './pages/PlanosTabs/Planos'
import Turmas from './pages/PlanosTabs/Turmas'

/* Aula */
import AulaForm from './pages/Aulas/AulaForm'
import AgendamentoList from './pages/Aulas/AgendamentoList'
import AgendamentoDetail from './pages/Aulas/AgendamentoDetail'
import AgendamentoForm from './pages/Aulas/AgendamentoForm'

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
import { MedidasColor, TreinoColor, AulaColor, FinanceiroColor, AlunoColor, PlanoColor } from './shared/styles/colors';
import Pagamento_AulaForm from './pages/Financeiro/Pagamento_AulaForm';

const SplashStack = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
        },
    },
})

const MensalidadeStack = createStackNavigator({
    MensalidadeList: {
        screen: MensalidadeList,
    },
    PagamentoForm: {
        screen: PagamentoForm
    },
    AulasAReceberList: {
        screen: AulasAReceberList
    },
    PagamentoAulaForm: {
        screen: Pagamento_AulaForm
    }
}, 
{
    initialRouteName: 'MensalidadeList'
})

const FinanceiroStack = createStackNavigator({
    Financeiro: {
        screen: Financeiro,
        navigationOptions: {
            header: null,
        },
    },
    Mensalidade: {
        screen: MensalidadeStack,
        navigationOptions: {
            header: null,
        }
    }
},
{
    initialRouteName: 'Financeiro'
}
)

FinanceiroStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

const AgendamentoStack = createStackNavigator({
    AgendamentoList: {
        screen: AgendamentoList,
        navigationOptions: {
            header: null,
        },
    },
    AgendamentoDetail: {
        screen: AgendamentoDetail
    },
    AgendamentoForm: {
        screen: AgendamentoForm
    }
},
{
    initialRouteName: 'AgendamentoList',
}
)


AgendamentoStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let header;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
        header = null;;
    }

    return {
        tabBarVisible,
        header,
    };
};

// SplashStack.navigationOptions = ({ navigation }) => {
//     if (navigation.state.index == 0) {
//         setTimeout(() => {
//            navigation.navigate('Login');
//         }, 2000 )
//     }
//   };

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
    },
    UsuarioList: {
        screen: UsuarioList,
    },
    UsuarioForm: {
        screen: UsuarioForm,
    },
    UsuarioDetail: {
        screen: UsuarioDetail,
    },
    AgendamentoUsuario:{
        screen: AgendamentoStack,
        navigationOptions: {
            headerStyle: {backgroundColor: AulaColor},
            title: 'Agendamento',
            headerTintColor: '#FFF'
        }
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
              <Icon name="th-large" size={20} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: PlanoColor,
            }
        }
    },
    // Home: {
    //     screen: Home,
    //     navigationOptions: {
    //         tabBarLabel:"Home",
    //         tabBarIcon: ({ tintColor }) => (
    //           <Icon name="star" size={20} color={tintColor} />
    //         ),
    //         tabBarOptions: {
    //             activeTintColor: AlunoColor,
    //         }
    //     }
    // },
    Aulas: {
        screen: AgendamentoStack,
        navigationOptions: {
            tabBarLabel:"Aulas",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="book-open" size={20} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: AulaColor,
            },
        }
    },
    Financeiro: {
        screen: FinanceiroStack,
        navigationOptions: {
            tabBarLabel:"Financeiro",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="dollar-sign" size={20} color={tintColor} />
            ),
            tabBarOptions: {
                activeTintColor: FinanceiroColor,
            }
        }
    },
},
{
    initialRouteName: "Estudio",
    tabBarOptions: {
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
    SplashScreen: SplashStack,
},
{
    initialRouteName: "Login",
});

const Routes = createAppContainer(App);

export default Routes;