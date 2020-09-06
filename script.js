let screen = document.getElementById('screen') //pegando o canvas do html
let ctx = screen.getContext("2d") //pegando o contexto do canvas

//seleção que guarda os nós criados
let node1ForLine = document.getElementById('node1ForLine')
let node2ForLine = document.getElementById('node2ForLine')


//criando os vetores onde serão armasenadas as linhas, os nos e as cargas
let lines = []
let nodes = []
let cargas = []


//função que desenha a linha
function drawLine(line) {
    //consfigurando a os parametros de renderização
    ctx.lineWidth = 3
    ctx.strokeStyle = "green"
    ctx.fillStyle = 'rgba(0,0,200, 0.5)'
   
    //deseha a carga
    ctx.beginPath()
    ctx.moveTo(line.node1.x, line.node1.y)
    ctx.lineTo(line.node1.x, line.node1.y-line.carga.cargaInicio)
    ctx.lineTo(line.node2.x, line.node2.y-line.carga.cargaFim)
    ctx.lineTo(line.node2.x, line.node2.y)
    ctx.fill()

    ctx.fillStyle = 'black'
    ctx.font = '15px arial'
    ctx.fillText(`${line.carga.cargaInicio}`, line.node1.x, line.node1.y-line.carga.cargaInicio-3)
    ctx.fillText(`${line.carga.cargaInicio}`, line.node2.x, line.node2.y-line.carga.cargaFim-3)
    
    //desenha a linha
    ctx.beginPath()
    ctx.moveTo(line.node1.x, line.node1.y)
    ctx.lineTo(line.node2.x, line.node2.y)
    ctx.stroke()
}

//função que desenha o nó
function drawNode(node){
    ctx.fillStyle = 'red'
    
    ctx.beginPath()
    ctx.arc(node.x, node.y, 3, 0, Math.PI*2, true)
    ctx.fill()

    //desenhado a força
    if(node.force != 0){
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(node.x, node.y-node.force)
        ctx.lineTo(node.x, node.y)
        ctx.lineTo(node.x-5,node.y-10)
        ctx.lineTo(node.x+5, node.y-10)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
        ctx.fill()
        ctx.font = "15px arial"
        ctx.fillText(node.force, node.x, node.y-node.force+10)
    }

    if(node.vinc == "apoiado"){
        ctx.lineWidth = 1
        ctx.strokeStyle = "black"

        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(node.x - 10, node.y+10)
        ctx.lineTo(node.x + 10, node.y+10)
        ctx.lineTo(node.x, node.y)
        ctx.moveTo(node.x-10, node.y+15)
        ctx.lineTo(node.x+10, node.y+15)
        ctx.stroke()
    }else if(node.vinc == "biapoiado"){
        ctx.lineWidth = 1
        ctx.strokeStyle = "black"

        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(node.x - 10, node.y+10)
        ctx.lineTo(node.x + 10, node.y+10)
        ctx.lineTo(node.x, node.y)
        ctx.stroke() 
        
        for(let i=0; i<=20; i = i+4){
            ctx.beginPath()
            ctx.moveTo(node.x-10+i, node.y+10)
            ctx.lineTo(node.x-13+i, node.y+15)
            ctx.stroke()
        }
    }else if(node.vinc == "engastado"){
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(node.x, node.y+10)
        ctx.lineTo(node.x, node.y-10)
        ctx.stroke()

        for(let i=0; i<=20; i = i+4){
            ctx.beginPath()
            ctx.moveTo(node.x, node.y-10+i)
            ctx.lineTo(node.x-5, node.y-7+i)
            ctx.stroke()
        }
    }else if(node.vinc == "rotulado"){
        ctx.lineWidth = 1
        ctx.strokeStyle = 'black'

        ctx.beginPath()
        ctx.arc(node.x, node.y, 5, 0, Math.PI*2, true)
        ctx.stroke()
    }
}

//calsse dos nos
function Node(x=0, y=0, force=0,vinc,reaction={rx:0, ry:0, m:0}) {
    this.x= x
    this.y= y
    this.force= force
    this.vinc = vinc
    this.reaction = reaction
}

//classe das linhas
function Line(node1, node2, carga) {
     this.node1=node1
     this.node2=node2
     this.carga=carga
}

//função que insere um nó
function insertNode() {
   let x = document.getElementById("posX") 
   let y = document.getElementById('posY')

   if(x.value && y.value){
        let force = document.getElementById('force')
        let vinc = document.getElementById("vinc")
        
        let node = new Node(Number(x.value), Number(y.value), Number(force.value), vinc.value)

        nodes.push(node)
        drawNode(node)
   
        let item1 = document.createElement('option')
        item1.text = `no ${nodes.length}: x:${x.value}, y:${y.value}, força: ${force.value}`
        item1.value = nodes.length - 1 
        node1ForLine.appendChild(item1)
        
        let item2 = document.createElement('option')
        item2.text = `no ${nodes.length}: x:${x.value}, y:${y.value}, força: ${force.value}`
        item2.value = nodes.length - 1 
        node2ForLine.appendChild(item2)
   }else{
        window.alert("falta algum valor")        
   }
}

function insertLine(){
   let node1 = document.getElementById("node1ForLine")
   let node2 = document.getElementById("node2ForLine")

   if(node1.value == "Selecione" || node2.value == "Selecione"){
        window.alert('Selecione o ponto inicial e final')
   }else{
       let cargaInicio = document.getElementById('cargaInicio')
       let cargaFim = document.getElementById('cargaFim')
       carga = {
            cargaInicio: Number(cargaInicio.value),
            cargaFim: Number(cargaFim.value)
       }
       
       let line = new Line(nodes[node1.value], nodes[node2.value], carga)

       lines.push(line)
       drawLine(line)
   }
}


const reaction = {
    rx: 30,
    ry: 40,
    m: 5,
}
const no1 = new Node(100, 200, 50, 'engastado',reaction)
const no2 = new Node(300, 200, 0, 'rotulado', reaction)
const carga1 = {
    cargaInicio: 60,
    cargaFim: 60
}
const line1 = new Line(no1, no2, carga1)

drawLine(line1)
drawNode(no1)
drawNode(no2)
