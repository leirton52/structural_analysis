//calsse dos nos
class Node {
    constructor(x = 0, y = 0, forceX = 0, forceY = 0, vinc, reaction = { rx: 0, ry: 0, m: 0 }) {
        this.x = x
        this.y = y
        this.forceX = forceX
        this.forceY = forceY
        this.vinc = vinc
        this.reaction = reaction
        this.lines = [] //guarda a posição das linhas que estão usando o nó
    }
}

//classe das linhas
class Line {
    constructor(node1, node2, carga) {
        this.node1 = node1
        this.node2 = node2
        this.carga = carga
    }
}


export {Node, Line}