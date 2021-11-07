import { resumoDesloca } from "./resumoDesloca.js";
import { mntVetorEspalhamentoLines } from "./vetorEspalhamento.js";

const mntMatrizRigidezGlobal = (nodes, lines) => {
    mntVetorEspalhamentoLines(lines, nodes)
    const desloca = resumoDesloca(nodes)

    let matrizRigidezGlobal = []

    //criado a mattriz de rigidez global base(matriz com valores nulos)
    for(let i=0; i<desloca.total; i++){
        matrizRigidezGlobal.push([])
        for(let j=0; j<desloca.total ; j++){
            matrizRigidezGlobal[i].push(0)
        }
    }

    lines.forEach( line => {
        //monta a matriz de rigidez local nos eixos globais
        let mrLocalEixoGlobal = line.mntRigidezGlobal()
        for(let i=0; i<6; i++){
            for(let j=0; j<6; j++){
                //o "-1" é por que os arrays começão de zero e a numeração das delocabilidades
                // começam do 1
                let iGlobal = line.coordGlobal[i] - 1
                let jGlobal = line.coordGlobal[j] - 1

                matrizRigidezGlobal[iGlobal][jGlobal] += mrLocalEixoGlobal[i][j]
            }
        }    
    });

    //extraindo a matriz de rigidez das deslocabilidades livres da matriz de rigidez global
    let matrizRigidezGlobalLivre = []
    for(let i=0; i<desloca.livres; i++){
        matrizRigidezGlobalLivre.push([])
        for(let j=0; j<desloca.livres ; j++){
            matrizRigidezGlobalLivre[i].push(0)
        }
    }

    for(let i = 0; i<desloca.livres; i++){
        for(let j=0; j<desloca.livres; j++){
            matrizRigidezGlobalLivre[i][j] = matrizRigidezGlobal[i][j]
        }
    }

    //extraindo a matriz de rigidez das deslocabilidades fixas da matriz de rigidez global
    let matrizRigidezGlobalFixa = []
    for(let i=0; i<desloca.fixas; i++){
        matrizRigidezGlobalFixa.push([])
        for(let j=0; j<desloca.livres ; j++){
            matrizRigidezGlobalFixa[i].push(0)
        }
    }

    let ifixas = 0
    for(let i = desloca.livres; i<desloca.total; i++){
        //variável que quarda a pposição da linha para a matriz das deloscabilidades fixas
        for(let j=0; j < desloca.livres; j++){
            matrizRigidezGlobalFixa[ifixas][j] = matrizRigidezGlobal[i][j]
        }
        ifixas++
    }

    console.log(matrizRigidezGlobalFixa)

    return {matrizRigidezGlobalLivre: matrizRigidezGlobalLivre, matrizRigidezGlobalFixa:matrizRigidezGlobalFixa}
}

export {mntMatrizRigidezGlobal}