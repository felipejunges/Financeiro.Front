import { Endereco } from "./Endereco";

export interface Matricula {
    nome: string,
    email: string,
    senha: string,

    cpf: string,
    identidade: string,
    dataNascimento: string,
    telefone: string,

    endereco: Endereco

    //public int CursoId { get; set; }

    //public int NumeroParcelas { get; set; }

    //public DateTime DataPrimeiroVencimento { get; set; }*/
}