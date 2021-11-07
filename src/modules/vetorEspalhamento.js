import { resumoDesloca } from "./resumoDesloca.js";

const mntVetorEspalhamentoNodes = (nodes) => {
    const desloca =  resumoDesloca(nodes)
    let contLivres = 1
    let contFixas = desloca.livres + 1
    
    nodes.forEach(node => {
        let vetorEspalhamento = []
        let isNodeRestrito = node.isNodeRestrito()  

        for(let i=0; i<3; i++){
            if (isNodeRestrito[i]) {
                vetorEspalhamento[i] = contFixas
                contFixas++
            } else{
                vetorEspalhamento[i] = contLivres
                contLivres++
            }

            node.setCoordGlobal(vetorEspalhamento)
        }
    })
}

const mntVetorEspalhamentoLines = (lines, nodes) => {
    //monta o vetor de deslocamentos nos nós
    mntVetorEspalhamentoNodes(nodes)

    lines.forEach(line => {
        let vetorEspalhamento = []
        let espalhamentoNode1 = line.node1.coordGlobal
        let espalhamentoNode2 = line.node2.coordGlobal

        espalhamentoNode1.forEach( coord => {
            vetorEspalhamento.push(coord)
        });

        espalhamentoNode2.forEach( coord => {
            vetorEspalhamento.push(coord)
        });

        line.setCoordGlobal(vetorEspalhamento)
    });
}

export {mntVetorEspalhamentoNodes, mntVetorEspalhamentoLines}