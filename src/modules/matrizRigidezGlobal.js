const mntMatrizRigidezGlobal = (nodes, lines) => {
    //obtendo a tamanho da matriz de rigidez
    n = nodes.length*3

    let matrizRigidezGlobal = []

    //criado a mattriz de rigidez global base
    for(let i=0; i<n; i++){
        matrizRigidezGlobal.push([])
        for(let j=0; j<n ; j++){
            matrizRigidezGlobal[i].push(0)
        }
    }
}