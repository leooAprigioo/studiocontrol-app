import {MedidasColor} from '../../../shared/styles/colors'

export const Container = {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
};

export const CardContainer = {
    backgroundColor: '#FFF',
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderLeftWidth: 5,
    borderRadius: 5,
    borderLeftColor: MedidasColor,
    paddingHorizontal: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

export const CardHeader = {
    paddingVertical: 10,
}

export const CardContent = {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
}

export const DataCol = {
    flexDirection: 'column',
    flex: 1,
}

export const DataItem = {
    fontWeight: 'bold',
    textAlign: 'center',
}

export const DataValue = {
    fontSize: 12,
    textAlign: 'center'
}