//Encontrando as reaçoes de engastamento perfeito axiais: f1' e f4'

const f1 = (L, pi, pf) => {
    let f1 = -L*(2*pi + pf)/6 //calculando a reação de engastamento perfeito f1

    return f1
}

const f4 = (L, pi, pf) => {
    let f4 = -L*(2*pf + pi)/6 //calculando a reação de engastamento perfeito f1

    return f4
}

//Encontrando as reaçoes de engatamento perfeito transversais f2 e f5

const f2 = (L, qi, qf) => {
    let f2 = -L*(7*qi + 3*qf)/20 //calculando a reação de engastamento perfeito f2

    return f2
}

const f5 = (L, qi, qf) => {
    let f5 = -L*(3*qi + 7*qf)/20 //calculando a reação de engastamento perfeito f5

    return f5
}

//Encontrando as reaçoes de engatamento perfeito de momento f3 e f6

const f3 = (L, qi, qf) => {
    let f3 = -(L**2)*(3*qi + 2*qf)/60 //calculando a reação de engastamento perfeito f3

    return f3
}

const f6 = (L, qi, qf) => {
    let f6 = (L**2)*(2*qi + 3*qf)/60 //calculando a reação de engastamento perfeito f6

    return f6
}


export{f1, f4 , f2, f5, f3, f6}