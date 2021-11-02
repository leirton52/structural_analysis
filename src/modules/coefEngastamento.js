//Encontrando as reaçoes de engastamento perfeito axiais: f1' e f4'

const f1 = (line) => {
    let L = line.length //Comprimento da barra
    let pi = line.carga.cargaInicioX //valor inicial da carga axial
    let pf = line.carga.cargaFimX //valor final da carga axial

    let f1 = -L*(2*pi + pf)/6 //calculando a reação de engastamento perfeito f1

    return f1
}

const f4 = (line) => {
    let L = line.length //Comprimento da barra
    let pi = line.carga.cargaInicioX //valor inicial da carga axial
    let pf = line.carga.cargaFimX //valor final da carga axial

    let f4 = -L*(2*pf + pi)/6 //calculando a reação de engastamento perfeito f1

    return f4
}

//Encontrando as reaçoes de engatamento perfeito transversais f2 e f5

const f2 = (line) => {
    let L = line.length //Comprimento da barra
    let qi = line.carga.cargaInicioY //valor inicial da carga transversal
    let qf = line.carga.cargaFimY //valor final da carga transversal

    let f2 = -L*(7*qi + 3*qf)/20 //calculando a reação de engastamento perfeito f2

    return f2
}

const f5 = (line) => {
    let L = line.length //Comprimento da barra
    let qi = line.carga.cargaInicioY //valor inicial da carga transversal
    let qf = line.carga.cargaFimY //valor final da carga transversal

    let f5 = -L*(3*qi + 7*qf)/20 //calculando a reação de engastamento perfeito f5

    return f5
}

//Encontrando as reaçoes de engatamento perfeito de momento f3 e f6

const f3 = (line) => {
    let L = line.length //Comprimento da barra
    let qi = line.carga.cargaInicioY //valor inicial da carga transversal
    let qf = line.carga.cargaFimY //valor final da carga transversal

    let f3 = -(L**2)*(3*qi + 2*qf)/60 //calculando a reação de engastamento perfeito f3

    return f3
}

const f6 = (line) => {
    let L = line.length //Comprimento da barra
    let qi = line.carga.cargaInicioY //valor inicial da carga transversal
    let qf = line.carga.cargaFimY //valor final da carga transversal

    let f6 = (L**2)*(2*qi + 3*qf)/60 //calculando a reação de engastamento perfeito f6

    return f6
}


export{f1, f4 , f2, f5, f3, f6}