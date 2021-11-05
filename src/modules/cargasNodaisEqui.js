const mntCargasNodaisEqui = (nodes, lines) => {
    //criando o vertor das cargas nodais base (com as cargas que estão atuando diretamente nos nos)
    let cargasNodaisEqui = []
    nodes.forEach( node => {
        let cargaNodal = node.cargaNodal()

        cargaNodal.forEach(carga => {
            cargasNodaisEqui.push(carga)    
        });
    });

    lines.forEach(line => {
        let engastGlobal = line.mntEngastGlobal()
        let vetorEspalhamento = line.mntVetorEspalhamento(nodes)
        
        for(let i=0; i<6; i++){
            //o "-1" é por que os arrays começão de zero e a numeração das delocabilidades
            // começam do 1
            let iNodalEqui = vetorEspalhamento[i] - 1
            
            cargasNodaisEqui[iNodalEqui] -= engastGlobal[i]
        }
    });

    return cargasNodaisEqui
}

export {mntCargasNodaisEqui}