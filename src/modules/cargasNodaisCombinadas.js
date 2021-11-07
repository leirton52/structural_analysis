import { resumoDesloca } from "./resumoDesloca.js";
import { mntVetorEspalhamentoLines } from "./vetorEspalhamento.js";

const mntCargasNodaisCombinadas = (nodes, lines) => {
    mntVetorEspalhamentoLines(lines, nodes)
    let desloca = resumoDesloca(nodes)

    //criando o vertor das cargas nodais base (com as cargas que estão atuando diretamente nos nos)
    let cargasNodaisCombinadas = []
    for(let i=0; i< nodes.length*3 ; i++){
        cargasNodaisCombinadas.push(0)
    }
    
    nodes.forEach( node => {
        let cargaNodal = node.cargaNodal()
        let coordGlobal = node.coordGlobal

        for(let i = 0; i<3; i++){
            cargasNodaisCombinadas[coordGlobal[i]-1] = cargaNodal[i]
        }
    });

    lines.forEach(line => {
        let engastGlobal = line.mntEngastGlobal()
        
        for(let i=0; i<6; i++){
            //o "-1" é por que os arrays começão de zero e a numeração das delocabilidades
            // começam do 1
            let iNodalEqui = line.coordGlobal[i] - 1
            
            cargasNodaisCombinadas[iNodalEqui] -= engastGlobal[i]
        }
    });

    //extraindo as cargas nodais combinadas relacionadas as deslocabilidades livres
    let cargasNodaisCombinadasLivres = []
    for(let i=0; i< desloca.livres; i++){
        cargasNodaisCombinadasLivres.push(cargasNodaisCombinadas[i])
    }

    //extraindo as cargas nodais combinadas relacionadas as deslocabilidades fixas
    let cargasNodaisCombinadasFixas = []
    for(let i=desloca.livres; i< desloca.total; i++){
        cargasNodaisCombinadasFixas.push(cargasNodaisCombinadas[i])
       }
    return {cargasNodaisCombinadasLivres: cargasNodaisCombinadasLivres,cargasNodaisCombinadasFixas:cargasNodaisCombinadasFixas}
}

export {mntCargasNodaisCombinadas}