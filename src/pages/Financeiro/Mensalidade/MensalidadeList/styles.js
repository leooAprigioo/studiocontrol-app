import { AlunoColor, FinanceiroColor, AulaColor } from "../../../../shared/styles/colors"


export const Container = {
    flex: 1,
    backgroundColor: '#FBFBFB'
}

export const Header = {
    flex: 1,
}

export const Section = {
    flex: 1
}

export const SearchByCpf = {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
}

export const DataInput = {
    textAlign: 'center',
}

export const AlunoInformation = {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
}

export const Name = {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
}

export const CPF = {
    fontSize: 14,
    textAlign: 'center'
}

// TODO Mensalidade List

export const Content = {
    flex: 3,
    paddingVertical: 10,
}

export const CarouselMensalidade = {
    flex: 2,
    marginTop: 10
}

export const Mensalidade = {
    flex: 1,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderTopWidth: 5,
    borderTopColor: FinanceiroColor,
    borderRadius: 5
}

export const MensalidadeHeader = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}

export const MesReferencia = {
    fontSize: 16,
    fontStyle: 'italic'
}

export const ValorTotal = {
    fontSize: 18,
    fontWeight: 'bold',

}

export const MensalidadeContent = {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10
}

export const Data = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
}

export const DataLabel = {
    flex: 1,
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: 'bold'
}

export const DataValue = {
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontSize: 13,
}

export const MensalidadeFooter = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}

export const Pendente = {
    fontSize: 20,
    fontWeight: 'bold',
    color: AulaColor,

}



export const ShowMore = {
    flex: 1,
}

export const ShowMoreButton = {
    backgroundColor: AlunoColor,
    padding: 10,
    borderRadius: 5
}

export const ShowMoreText = {
    color: '#FFF',
    fontSize: 14
}