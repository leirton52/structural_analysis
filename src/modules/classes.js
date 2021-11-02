//importanto os modulos co m os coeficientes de rigidez e de engastamento perfeito
import {f1, f2, f3, f4, f5, f6} from "./coefEngastamento.js"
import {k11,k12,k13,k14,k15,k16,
    k21,k22,k23,k24,k25,k26,
    k31,k32,k33,k34,k35,k36,
    k41,k42,k43,k44,k45,k46,
    k51,k52,k53,k54,k55,k56,
    k61,k62,k63,k64,k65,k66
} from "./coefRigidez.js"


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
    constructor(node1, node2, carga, prop) {
        this.node1 = node1
        this.node2 = node2
        this.carga = carga
        this.prop = prop
    }
    
    get length(){
        return this.calcLength()
    }
    
    calcLength() {
        let x1 = this.node1.x
        let y1 = this.node1.y
        let x2 = this.node2.x
        let y2 = this.node2.y

        return Math.hypot((x2-x1),(y2-y1))
    }

    mntEngastLocal(){
        let L = this.length
        let pi = this.carga.cargaInicioX
        let pf = this.carga.cargaFimX
        let qi = this.carga.cargaInicioY
        let qf = this.carga.cargaFimY

        let engastLocal = [f1(L, pi, pf), f2(L, qi, qf), f3(L, qi, qf), f4(L, pi, pf), f5(L, qi, qf), f6(L, qi, qf)
        ]

        return engastLocal
    }

    mntRigidezLocal(){
        let L = this.length
        let prop = this.prop

        let rigidezLocal = [
            [k11(L,prop),k12(L,prop),k13(L,prop),k14(L,prop),k15(L,prop),k16(L,prop),],
            [k21(L,prop),k22(L,prop),k23(L,prop),k24(L,prop),k25(L,prop),k26(L,prop),],
            [k31(L,prop),k32(L,prop),k33(L,prop),k34(L,prop),k35(L,prop),k36(L,prop),],
            [k41(L,prop),k42(L,prop),k43(L,prop),k44(L,prop),k45(L,prop),k46(L,prop),],
            [k51(L,prop),k52(L,prop),k53(L,prop),k54(L,prop),k55(L,prop),k56(L,prop),],
            [k61(L,prop),k62(L,prop),k63(L,prop),k64(L,prop),k65(L,prop),k66(L,prop),]
        ]

        return rigidezLocal
    }
}


export {Node, Line}