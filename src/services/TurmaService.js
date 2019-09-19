import { FullPath } from '../config/Connection';

const TurmaService = {

    url: '/turma',

    list: function () 
    {
        try {
            return fetch(FullPath + this.url, 
                {
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
    
    list_Q: function () 
    {
        try {
            return fetch(FullPath + '/turmaQuantidade', 
                {
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

    get: function (id) 
    {
        try {
            return fetch(FullPath + this.url + '/' + id, 
                {
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

    post: function (values) 
    {
        try {
            return fetch(FullPath + this.url, 
                {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    return responseJson;
                })
                .catch((error) => {
                    console.log(error);
                    return {error: 'Não foi possível conectar ao servidor. Tente novamente mais tarde'}
                });
        } catch(error) {
            console.log(error);
            return {error: 'Algo de errado aconteceu ao realizar a requisição'};
        };
    }
}

export default TurmaService;