import { StyleSheet } from 'react-native';
import { ProfessorColor } from '../../../shared/styles/colors'

export const Container = {
    flex: 1,
    backgroundColor: '#FBFBFB'
};

export const ListItem = {
    paddingVertical: 15, 
    paddingHorizontal: 10, 
    borderLeftWidth: 5, 
    borderLeftColor: ProfessorColor,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
};

export const ListItemTitle = {
    fontSize: 18,
    fontWeight: 'bold',
};

export const GoalDescription = {
    color: '#151515',
};

export const PlanoIcon = {
    borderWidth: 2,
    borderColor: '#485263',
    borderRadius: 100,
    height: 20,
    width: 20,
};

export const HeaderContent = {
    flex: 1, 
    flexDirection: 'row', 
    alignContent: 'center', 
    alignItems: 'center',
    paddingRight: 10, 
    paddingVertical: 7,
};

export const SearchInput = {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 20 , 
    backgroundColor: '#FFF', 
    borderRadius: 100
};

export const HeaderTitle = {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#FFF', 
    paddingHorizontal: 10,
};