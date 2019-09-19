const ViaCepService = {

    getAdress: function (cep) 
    {
        try {
            return fetch('https://viacep.com.br/ws/' + cep + '/json/', 
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    }).then((response) => {
                        if (response.status >= 400) {
                            return {error: 'CEP inválido'}
                        }
                        console.log('https://viacep.com.br/ws/' + cep + '/json/');
                        console.log(response);
                        response.json();
                    })
                    .then((responseJson) => {
                        console.log(responseJson)
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

export default ViaCepService;