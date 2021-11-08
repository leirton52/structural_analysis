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

const cargasInternas = (nodes, lines) => {
    let matrizesRigidezLivre = mntMatrizRigidezGlobal(nodes, lines).matrizRigidezGlobalLivre
    let matrizesRigidezFixa = mntMatrizRigidezGlobal(nodes, lines).matrizRigidezGlobalFixa
    let matrizDeslocaLives = deslocaLivres(nodes, lines)

    let cargasInternasGlobal = []
    for(let i=0; i< nodes.length*3; i++){
        cargasInternasGlobal.push(0)
    }

    for(let i= 0; i< cargasInternasGlobal.length; i++){
        if(i<matrizesRigidezLivre.length){
            for(let j=0; j<matrizDeslocaLives.length; j++){
                cargasInternasGlobal[i] += matrizesRigidezLivre[i][j]*matrizDeslocaLives[j]
            }
        }else{
            for(let j=0; j<matrizDeslocaLives.length; j++){
                cargasInternasGlobal[i] += matrizesRigidezFixa[i - matrizesRigidezLivre.length][j]*matrizDeslocaLives[j]
            }
        }
    }

    lines.forEach(line => {
        let cargaEngast = line.mntEngastGlobal()
        let cargasInternas = [0,0,0,0,0,0]

        for(let i = 0; i<6; i++){
            cargasInternas[i] = -(cargaEngast[i]+cargasInternasGlobal[line.coordGlobal[i]-1]) 
        }

        line.setCargasInternas(cargasInternas)
    }); 
}

export {reactions, cargasInternas}