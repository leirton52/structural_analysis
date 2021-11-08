//importanto os modulos com os coeficientes de rigidez e de engastamento perfeito
import {f1, f2, f3, f4, f5, f6} from "./coefEngastamento.js"
import {k11,k12,k13,k14,k15,k16,
    k21,k22,k23,k24,k25,k26,
    k31,k32,k33,k34,k35,k36,
    k41,k42,k43,k44,k45,k46,
    k51,k52,k53,k54,k55,k56,
    k61,k62,k63,k64,k65,k66
} from "./coefRigidez.js"
//Importando as matrizes de tranfrmação de eixos:
import * as matrixTransforma from "./matrixTranforma.js"


//calsse dos nos
class Node {
    constructor(x = 0, y = 0, forceX = 0, forceY = 0, momento,vinc) {
        this.x = x
        this.y = y
        this.forceX = forceX
        this.forceY = forceY
        this.momento = momento
        this.vinc = vinc
        this.lines = [] //guarda a posição das linhas que estão usando o nó
        this.coordGlobal = []
    }

    cargaNodal(){
        return [this.forceX, this.forceY, this.momento]
    }

    //cria um vetor com valor booleanos para vincular as cargas dos nos ao tipo de restição 
    //flase -> no com movimento live naquela direção
    //true -> nó com moviemtno restrito naquela direção
    isNodeRestrito(){
        if(this.vinc == "apoiado-x"){
            return [true, false, false]
        }else if(this.vinc == "apoiado-y"){
            return [false, true,false]
        }else if(this.vinc == "engastado"){
            return [true,true, true]
        }else if(this.vinc == "biapoiado"){
            return [true,true, false]
        }else if(this.vinc == "Nenhuma"){
            return [false, false, false]
        }
    }

    setCoordGlobal (vetEpalhamento) {
        this.coordGlobal = vetEpalhamento
    }
}

//classe das linhas
class Line {
    constructor(node1, node2, carga, prop) {
        this.node1 = node1
        this.node2 = node2
        this.carga = carga
        this.prop = prop
        this.coordGlobal = []
        this.cargasInternas = []
    }
    
    setCargasInternas(cargasInternas){
        this.cargasInternas = cargasInternas
    }

    setCoordGlobal(vetEpalhamento) {
        this.coordGlobal = vetEpalhamento
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

    //Monta o vetor com os coeficientes de engastamento perfieto da barra
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
    
    //Monta a matriz de rigidez local da barra
    mntRigidezLocal(){
        let L = this.length
        let prop = this.prop

        let rigidezLocal = [
            [k11(L,prop),k12(L,prop),k13(L,prop),k14(L,prop),k15(L,prop),k16(L,prop)],
            [k21(L,prop),k22(L,prop),k23(L,prop),k24(L,prop),k25(L,prop),k26(L,prop)],
            [k31(L,prop),k32(L,prop),k33(L,prop),k34(L,prop),k35(L,prop),k36(L,prop)],
            [k41(L,prop),k42(L,prop),k43(L,prop),k44(L,prop),k45(L,prop),k46(L,prop)],
            [k51(L,prop),k52(L,prop),k53(L,prop),k54(L,prop),k55(L,prop),k56(L,prop)],
            [k61(L,prop),k62(L,prop),k63(L,prop),k64(L,prop),k65(L,prop),k66(L,prop)]
        ]

        return rigidezLocal
    }

    //Matriz auxiliar para tanformar o vetor de engatamento e matriz de rigidez da barra para os eixos globais
    mTransLocalToGlobal(){
        return matrixTransforma.localToGlobal(this.length, this.node1, this.node2)
    }
    //Matriz auxiliar para tanformar o vetor de engatamento e matriz de rigidez da barra para os eixos locais
    mTransGlobalToLocal(){
        return matrixTransforma.globalToLocal(this.length, this.node1, this.node2)
    }

    //Convetendo o vetor das cargas de engastamento perfeito para os eixos globais
    mntEngastGlobal(){
        let engastLocal = this.mntEngastLocal()
        let matrixAuxiliar = this.mTransLocalToGlobal()

        let engastGlobal = [0,0,0,0,0,0]

        for(let i=0; i<6; i++){
            for(let j=0; j<6; j++){
                engastGlobal[i] += matrixAuxiliar[i][j]*engastLocal[j]
            }
        }

        return engastGlobal
    }

    //Convetendo matriz de rigidez para os eixos globais
    mntRigidezGlobal(){
        let rigidezLocal = this.mntRigidezLocal()
        let matrixAuxiliar = this.mTransLocalToGlobal()

        let rigidezGlobal = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
        ]

        for(let i=0; i<6; i++){
            for(let j=0; j<6; j++){
                for(let k=0; k<6; k++){
                    rigidezGlobal[i][j] += matrixAuxiliar[j][k]*rigidezLocal[i][k]
                }
            }
        }

        return rigidezGlobal
    }
}


export {Node, Line}