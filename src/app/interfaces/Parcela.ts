export interface Parcela {
    id: number,
    sequencial: number,
    valor: number,
    dataVencimento: Date,
    temBoleto: boolean
    gerarBoleto: boolean
}