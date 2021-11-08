import { mntMatrizRigidezGlobal } from "./matrizRigidezGlobal.js";
import { mntCargasNodaisCombinadas } from "./cargasNodaisCombinadas.js";
import { resolveSistema } from "./eliminaGauss.js";

const deslocaLivres = (nodes, lines) => {
    let matrizesRigidez = mntMatrizRigidezGlobal(nodes, lines)
    let cargasNodais = mntCargasNodaisCombinadas(nodes, lines)

    let deslocaLivres = resolveSistema(matrizesRigidez.matrizRigidezGlobalLivre, cargasNodais.cargasNodaisCombinadasLivres)

    return deslocaLivres
}

const reactions = (nodes, lines) => {
    let reactions = []

    let matrizesRigidezFixa = mntMatrizRigidezGlobal(nodes, lines).matrizRigidezGlobalFixa
    let matrizDeslocaLives = deslocaLivres(nodes, lines)
    let cargasNodaisFixa = mntCargasNodaisCombinadas(nodes, lines).cargasNodaisCombinadasFixas

    console.log(matrizesRigidezFixa)
    console.log(matrizDeslocaLives)

    for(let i = 0; i<matrizesRigidezFixa.length; i++){
        let reac = 0
        for(let j = 0; j< matrizDeslocaLives.length; j++){
            reac += matrizesRigidezFixa[i][j]*matrizDeslocaLives[j]
        }

        reac -= cargasNodaisFixa[i]
        reactions.push(reac)
    }

    return reactions
}

export {reactions}