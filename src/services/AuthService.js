import { FullPath } from '../config/Connection';

const AuthService = {

    url: '/auth',
    auth : function(values) 
    {
        try {
            console.log('olar');
            return fetch(FullPath + this.url +'?usuario=' + values.nome_usuario + '&senha=' + values.senha, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    return responseJson;
                })
                .catch((error) => {
                    console.log(error);
                    return {error: 'Não foi possível conectar ao servidor. Tente novamente mais tarde'};
                });
            
        } catch(error) {
            console.log(error);
            return {error: 'Algo de errado aconteceu ao realizar a requisição'};
        };
    },
    
}

export default AuthService;