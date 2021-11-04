const mntMatrizRigidezGlobal = (nodes, lines) => {
    //obtendo a tamanho da matriz de rigidez
    let n = nodes.length*3

    let matrizRigidezGlobal = []

    //criado a mattriz de rigidez global base(matriz com valores nulos)
    for(let i=0; i<n; i++){
        matrizRigidezGlobal.push([])
        for(let j=0; j<n ; j++){
            matrizRigidezGlobal[i].push(0)
        }
    }

    lines.forEach( line => {
        //monta a matriz de rigidez local nos eixos globais
        let mrLocalEixoGlobal = line.mntRigidezGlobal()
        let vetorEspalhamento = line.mntVetorEspalhamento(nodes)

        for(let i=0; i<6; i++){
            for(let j=0; j<6; j++){
                //o "-1" é por que os arrays começão de zero e a numeração das delocabilidades
                // começam do 1
                let iGlobal = vetorEspalhamento[i] - 1
                let jGlobal = vetorEspalhamento[j] - 1
                
                matrizRigidezGlobal[iGlobal][jGlobal] += mrLocalEixoGlobal[i][j]
            }
        }    
    });

    return matrizRigidezGlobal
}

export {mntMatrizRigidezGlobal}