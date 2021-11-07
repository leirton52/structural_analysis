const resumoDesloca = (nodes) => {
    let total = nodes.length*3

    let livres = 0
    let fixas = 0

    nodes.forEach(node => {
        node.isNodeRestrito().forEach( condi =>{
            if(condi){
                fixas++
            }else{
                livres++
            }
        })
    })

    return {total: total, fixas: fixas, livres: livres}
}

export {resumoDesloca}
