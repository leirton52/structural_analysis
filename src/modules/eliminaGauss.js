//sistema do tipo Ax = B
function resolveSistema(A, B){
    let coefB = B.slice()
    let coefA = []
    for(let i=0; i<A.length; i++){
        coefA.push([])
        for(let j = 0; j<A.length; j++){
            coefA[i].push(A[i][j])
        }
    }
    // laços para percorrer os termos abaixo da diagonal principal
    //i representa as colunas, j representa as linhas
    for(let i=0; i < coefA.length-1; i++){
        //supundo inicialmente que o termo da diagonal princial e o maior em modulo daquela coluna a partir dele
        let max = Math.abs(coefA[i][i])
        let indiceMax = i
        
        //comparando com todos os termos da coluna que estao abaixo dele
        for(let j = i+1; j < coefA.length; j++){
            if(max < Math.abs(coefA[j][i])){
                max = coefA[j][i]
                indiceMax = j
            }
        }
        
        //Mundando para que o valor quu maximo va para a diagonal principal
        if(max != coefA[i][i]){
            //salvando temporariamente a linha do termo da diagonal principal
            let temp = coefA[i]
            //passando a linha do termo maximo para a linha da diagonal ptincipal
            coefA[i] = coefA[indiceMax]
            //passando a linha do valor da diagonal principal para onde estava o termo maximo
            coefA[indiceMax] = temp

            //fazendo a mesma coisa para a matriz dos coeficientes indenpendentes
            temp = coefB[i]
            coefB[i] = coefB[indiceMax]
            coefB[indiceMax] = temp   
        }

        for(let  j=i+1; j<coefA.length; j++){
            //calculando o fator da combinação linear para zerar
            //dos termos abaixo da diagonal principal
            let fator = coefA[j][i]/coefA[i][i]

            //fazendo a combinação linear das linhas
            for(let k=i;k<coefA.length; k++){
                 coefA[j][k] = coefA[j][k] - fator*coefA[i][k]
            }

            coefB[j] = coefB[j] - fator*coefB[i]
        }
    }

    //resolvendo sistema
    let solucao = []
    for(let i = coefA.length - 1; i>=0; i--){
       let soma = 0
       for(let j = i + 1; j < coefA.length; j++){
            soma = soma + coefA[i][j]*solucao[j]
       }
       
       solucao[i] = (coefB[i] - soma)/coefA[i][i]
    }

    return solucao
}

export {resolveSistema}