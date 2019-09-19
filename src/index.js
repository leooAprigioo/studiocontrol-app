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
import UsuarioAddressForm from './pages/Usuarios/UsuarioAddressForm';

/* Aluno */
import AlunoDetail from './pages/Alunos/AlunoDetail';
import CreateAlunoResults from './pages/Alunos/CreateAlunoResults';

/* Professores */
import ProfessorDetail from './pages/Professores/ProfessorDetail';
import CreateProfessorResults from './pages/Professores/CreateProfessorResults';

/* Perfil */
import CreatePerfil from './pages/Perfil/CreatePerfil';
import GoalForm from './pages/Alunos/GoalForm';
import GraduationForm from './pages/Professores/GraduationForm';
import CepSearch from './pages/Perfil/CepSearch';
import AddressForm from './pages/Perfil/AddressForm';

/* Medidas */
import MedidasList from './pages/Medidas/MedidasList';
import MedidasForm from './pages/Medidas/MedidasForm';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';


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
        navigationOptions: headerOptions,
    },
    MedidasForm: {
        screen: MedidasForm,
    }
},
{
    initialRouteName: 'MedidasList',
});

const AlunosStack = createStackNavigator({
    AlunoDetail: {
        screen: AlunoDetail,
        navigationOptions: headerOptions,
    },
    CreateAlunoResults: {
        screen: CreateAlunoResults,
        navigationOptions: headerOptions,
    },
    Medidas: {
        screen: MedidasStack,
        navigationOptions: {header: null}
    },
},
{
    initialRouteName: "AlunoDetail",
});

const ProfessoresStack = createStackNavigator({
    ProfessorDetail: {
        screen: ProfessorDetail,
        navigationOptions: headerOptions,
    },
    CreateProfessorResults: {
        screen: CreateProfessorResults,
        navigationOptions: headerOptions,
    },

},
{
    initialRouteName: "ProfessorDetail",
});



const UsuarioStack = createStackNavigator({
    CreatePerfil: {
        screen: CreatePerfil,
        navigationOptions: {header: null},
    },
    Alunos: AlunosStack,
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
    UsuarioAddressForm: {
        screen: UsuarioAddressForm,
    },
    GoalForm: {
        screen: GoalForm,
        navigationOptions: headerOptions,
    },
    GraduationForm: {
        screen: GraduationForm,
        navigationOptions: headerOptions,
    },
    CepSearch: {
        screen: CepSearch,
        navigationOptions: headerOptions,
    },
    AddressForm: {
        screen: AddressForm,
        navigationOptions: headerOptions,
    },

},
{
    initialRouteName: "UsuarioList",
});


/* Planos e Turmas */
const PlanoStack = createStackNavigator({
    PlanoList: {
        screen: Planos,
        navigationOptions: {header: null}
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
        navigationOptions: {header: null}
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

const App = createSwitchNavigator({
    Login: LoginStack,
    HomeTab: HomeTab,
    Professores: ProfessoresStack,
    Planos: PlanosTab,
    Usuarios: UsuarioStack
},
{
    initialRouteName: "HomeTab",
});

const Routes = createAppContainer(App);

export default Routes;