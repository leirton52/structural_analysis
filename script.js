let screen = document.getElementById('screen') //pegando o canvas do html
let ctx = screen.getContext("2d") //pegando o contexto do canvas

//criando os vetores onde serão armasenadas as linhas os nos e as cargas
let lines = []
let nodes = []
let cargas = []

//consfigurando a os parametros de renderização
ctx.lineWidth = 3
ctx.strokeStyle = "blue"
ctx.fillStyle = 'red'

//função que desenha a linha
function drawLine(line) {
    ctx.beginPath()
    ctx.moveTo(line.node1.x, line.node1.y)
    ctx.lineTo(line.node2.x, line.node2.y)
    ctx.stroke()
}

//função que desenha o nó
function drawNode(node){
    ctx.beginPath()
    ctx.arc(node.x, node.y, 5, 0, Math.PI*2, true)
    ctx.fill()
}

//calsse dos nos
function Node(x=0, y=0, force=0,reaction={rx:0, ry:0, m:0}) {
    this.x= x
    this.y= y
    this.force= force
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

        let node = new Node(Number(x.value), Number(y.value), Number(force.value))

        nodes.push(node)
        drawNode(node)
   }else{
        window.alert("falta algum valor")        
   }
}


const reaction = {
    rx: 30,
    ry: 40,
    m: 5,
}
const no1 = new Node(100, 200, 50, reaction)
const no2 = new Node(300, 200, 0, reaction)
const carga1 = {
    cargaInicio: 10,
    cargaFim: 10
}
const line1 = new Line(no1, no2, carga1)

drawLine(line1)
drawNode(no1)
drawNode(no2)
