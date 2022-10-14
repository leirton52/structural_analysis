import { reactions, cargasInternas, deslocaLivres } from "./resultados.js";
import { menuShowResults } from "./menus.js";

const showResults = (sec, nodes, lines) =>{
    let reac = reactions(nodes, lines)
    let carg = cargasInternas(nodes, lines)
    let desl = deslocaLivres(nodes, lines)

    //Criando a string contendo as reações
    let strReac = ""
    nodes.forEach( (node, i) => {
        const reacts = node.reactions
        strReac += `Nó ${i +1}: `

        reacts.forEach((reaction,j) => {
            strReac += `f${j+1}=${reaction}\t`
        });
        strReac += `\n `
    });

    sec.innerText = `Reações:\n ${strReac}\n Cargas Internas: ${carg}\n\n Deslocabilidades: ${desl}`
    
    menuShowResults()
}

export {showResults}