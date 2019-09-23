import { TreinoColor } from "../../../shared/styles/colors"

export const Container = {
    flex: 1,
    paddingVertical: 10,
}

export const Header = {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'

}

export const Content = {
    flex: 2,
    paddingBottom: 10
}

export const Exercicio = {
    backgroundColor: '#FFF',
    borderLeftWidth: 5,
    borderLeftColor: TreinoColor,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

}

export const ExercicioTitle = {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
}

export const ExercicioDescription = {
    fontSize: 14,
    paddingVertical: 3,
}

export const ExercicioDuration = {
    fontSize: 12,
    color: '#CCC',
}
