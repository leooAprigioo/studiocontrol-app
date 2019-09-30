import AsyncStorage from '@react-native-community/async-storage';

const StorageService = {
    store: async function (key, value) {
        try {
            await AsyncStorage.setItem(('@'+key), value);
            return {success: true};
        } catch (error) {
            await AsyncStorage.setItem(('@error'), error);
            return {error: 'Não foi possivel armazenar as informações'}
        }
    },
    get: async function (key) {
        try {
            const value = await AsyncStorage.getItem('@'+key)
            if(value !== null) {
                return value;
            }
        } catch (error) {
            await AsyncStorage.setItem(('@error'), error);
            return {error: 'Não foi possivel recuperar as informações'}
        }
    },

    remove: async function (key) {
        try {
            this.get(key).then((results) => {
                console.log(jsonResults)
                let jsonResults = JSON.parse(results)
                if (!('error' in jsonResults) && results != null) {
                    AsyncStorage.removeItem('@'+key)
                }
            })
            
          } catch(e) {
            await AsyncStorage.setItem(('@error'), error);
            return {error: 'Não foi possivel remover as informações'}
          }
    }
}

export default StorageService;