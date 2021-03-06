let screen = document.getElementById('screen') //pegando o canvas do html
let ctx = screen.getContext("2d") //pegando o contexto do canvas

//seleção que guarda os nós criados
let node1ForLine = document.getElementById('node1ForLine')
let node2ForLine = document.getElementById('node2ForLine')
let nodeForEdtion = document.getElementById('nodeForEdtion')
let node1ForLineEdtion = document.getElementById('node1ForLineEdtion')
let node2ForLineEdtion = document.getElementById('node2ForLineEdtion')
let lineForEdtion = document.getElementById('lineForEdtion')

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
    if(node.forceX != 0){
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
      
        ctx.beginPath()
        ctx.moveTo(node.x-node.forceX, node.y)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
        

        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(node.x-10, node.y-5)
        ctx.lineTo(node.x-10, node.y+5)
        ctx.fill()
        
        ctx.font = "15px arial"
        ctx.fillText(node.forceX, node.x - node.forceX, node.y)
    }

    if(node.forceY != 0){
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(node.x, node.y - node.forceY)
        ctx.lineTo(node.x, node.y)
        ctx.lineTo(node.x-5,node.y-10)
        ctx.lineTo(node.x+5, node.y-10)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
        ctx.fill()
        ctx.font = "15px arial"
        ctx.fillText(node.forceY, node.x,node.y-node.forceY+10)

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
function Node(x=0, y=0, forceX=0, forceY=0, vinc, reaction={rx:0, ry:0, m:0}) {
    this.x= x
    this.y= y
    this.forceX= forceX
    this.forceY = forceY
    this.vinc = vinc
    this.reaction = reaction
    this.lines = [] //guarda a posição das linhas que estão usando o nó
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
        let forceX = document.getElementById('forceX')
        let forceY = document.getElementById('forceY')
        let vinc = document.getElementById("vinc")
        
        let node = new Node(Number(x.value), Number(y.value), Number(forceX.value), Number(forceY.value),vinc.value)

        nodes.push(node)
        drawNode(node)

        let classNode = `no${nodes.length}`
        let nameNode = `no ${nodes.length}: x:${x.value}, y:${y.value}`

        let selectNode = document.getElementsByClassName('selectNode')

        for(let i=0; i < selectNode.length; i++){
            let item = document.createElement('option')
            item.text = nameNode
            item.value = nodes.length - 1
            item.classList.add(classNode)
            selectNode[i].appendChild(item)    
        }
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

       let item = document.createElement('option')
       item.text = `Linha ${lines.length}`
       item.value = lines.length - 1
       item.setAttribute('id', `optionLine${lines.length}`)
       lineForEdtion.appendChild(item)

       //salvando nos pontos a informação de qual linhas o estão usando
       nodes[node1.value].lines.push(lines.length-1)
       nodes[node2.value].lines.push(lines.length-1)
       
       drawLine(line)
   }
}

//coloca valores nos elementos da edição de um ponto
let edtionPosX = document.getElementById("edtionPosX")
let edtionPosY = document.getElementById("edtionPosY")
let edtionForceX = document.getElementById("edtionForceX")
let edtionForceY = document.getElementById("edtionForceY")
let edtionVinc = document.getElementById("edtionVinc")
nodeForEdtion.addEventListener('change', (event) => {
    if(nodeForEdtion.value == "Selecione um ponto"){
        edtionPosX.value = null
        edtionPosY.value = null
        edtionForceX.value = null
        edtionForceY.value = null
        edtionVinc.value = "Nenhuma"
    }else{
        edtionPosX.value = nodes[nodeForEdtion.value].x
        edtionPosY.value = nodes[nodeForEdtion.value].y
        edtionForceX.value = nodes[nodeForEdtion.value].forceX
        edtionForceY.value = nodes[nodeForEdtion.value].forceY
        edtionVinc.value = nodes[nodeForEdtion.value].vinc
    }
})

//coloca valores nos elementos da edição de uma Linha
let cargaInicioEdtion = document.getElementById("cargaInicioEdtion")
let cargaFimEdtion = document.getElementById("cargaFimEdtion")
lineForEdtion.addEventListener('change', (event) => {
    if(lineForEdtion.value == "Selecione uma linha"){
        node1ForLineEdtion.value = 'Selecione'
        node2ForLineEdtion.value = 'Selecione'
        cargaInicioEdtion.value = null
        cargaFimEdtion.value = null
    }else{
        node1ForLineEdtion.value = nodes.indexOf(lines[lineForEdtion.value].node1)
        node2ForLineEdtion.value = nodes.indexOf(lines[lineForEdtion.value].node2)
        cargaInicioEdtion.value = lines[lineForEdtion.value].carga.cargaInicio
        cargaFimEdtion.value = lines[lineForEdtion.value].carga.cargaFim
    }
})

//função que edita um nó
function editNode(){
    if (nodeForEdtion.value == "Selecione um ponto"){
        window.alert("Selecione um ponto")
        return
    }

    //modifica as propriedades do nó
    nodes[nodeForEdtion.value].x = Number(edtionPosX.value)
    nodes[nodeForEdtion.value].y = Number(edtionPosY.value)
    nodes[nodeForEdtion.value].forceX = Number(edtionForceX.value)
    nodes[nodeForEdtion.value].forceY = Number(edtionForceY.value)
    nodes[nodeForEdtion.value].vinc = edtionVinc.value
    
    //Modifica no que está sendo editado na TAG select
    let selectNodes = document.getElementsByClassName(`no${Number(nodeForEdtion.value) + 1}`)
   
    for(let i = 0 ; i < selectNodes.length; i++){
        let item = selectNodes[i]

        item.text = `no ${Number(nodeForEdtion.value) + 1}, x: ${nodes[nodeForEdtion.value].x}, y: ${nodes[nodeForEdtion.value].y}`
    }
    //acaba a modificação do select

    //desenha as modificações no canvas
    ctx.clearRect(0, 0, screen.width, screen.height)
    
    nodes.forEach( node => {
        drawNode(node)
    })
    
    lines.forEach(line => {
       drawLine(line) 
    })
}

//função que edita uma linha
function edtiLine(){
    if (lineForEdtion.value == "Selecione uma linha"){
        window.alert("Selecione uma linha")
        return
    }

    //apagando as linhas dos pontos que ela está usado, para colocala nos pontos que serão modificados
    lines[lineForEdtion.value]
    .node1
    .lines.splice(
        lines[lineForEdtion.value].node1.lines.indexOf(lineForEdtion), 1
    )

    lines[lineForEdtion.value]
    .node2
    .lines.splice(
        lines[lineForEdtion.value].node2.lines.indexOf(lineForEdtion), 1
    )

    //modifica as propriedades da linha
    lines[lineForEdtion.value].node1 = nodes[node1ForLineEdtion.value]
    lines[lineForEdtion.value].node2 = nodes[node2ForLineEdtion.value]
    lines[lineForEdtion.value].carga.cargaInicio = cargaInicioEdtion.value
    lines[lineForEdtion.value].carga.cargaFim = cargaFimEdtion.value

    //Colocando a inforção da linha nos pontos que a estão usando
    lines[lineForEdtion.value].node1.lines.push(Number(lineForEdtion.value))
    lines[lineForEdtion.value].node2.lines.push(Number(lineForEdtion.value))

    //desenha as modificações no canvas
    ctx.clearRect(0, 0, screen.width, screen.height)
    
    nodes.forEach( node => {
        drawNode(node)
    })
    
    lines.forEach(line => {
       drawLine(line) 
    })
}

function removeNode() {
    let indexRemove = Number(nodeForEdtion.value)
    if(nodeForEdtion.value == "Selecione um ponto"){
        window.alert("Selecione um ponto")
    }else{
        //autenticação para ver se o nó está sendo usado por uma linha
        if(nodes[nodeForEdtion.value].lines.length != 0){
            window.alert("Esse ponto não pode ser apagado. Ele está sendo usado por uma linha.")
            return
        }

        let selectNodes = document.getElementsByClassName(`no${indexRemove + 1}`)
        
        //como os itens vão se apagando dos selects, o tamanho dele em algum momento será 0 e o loop acabará
         while (selectNodes.length > 0){
            let item = selectNodes[0]
            item.parentNode.removeChild(item)
        }
        
        //continuar daqui modificar valores da seleção dos nós restantes
        for(i=indexRemove + 1; i<nodes.length; i++){
            let node = document.getElementsByClassName(`no${i + 1}`)

            //Como muda a classe do ponto, a lista "node" vai perdendo os elementos e quando o comprimento da lista for 0 o loop acaba
            while (node.length >0) {
                let item = node[0]
               
                let posAtualArr = i - 1

                item.value = posAtualArr
                item.text = `no ${posAtualArr + 1}, x: ${nodes[posAtualArr + 1].x}, y: ${nodes[posAtualArr + 1].y}`
                item.setAttribute('class' ,`no${posAtualArr + 1}`)         
            }

        }

        nodes.splice(indexRemove,1)

        ctx.clearRect(0, 0, screen.width, screen.height)   
        nodes.forEach( node => {
            drawNode(node)
        })
        lines.forEach(line => {
            drawLine(line) 
        })

        nodeForEdtion.value = "Selecione um ponto"
        edtionPosX.value = null
        edtionPosY.value = null
        edtionForceX.value = null
        edtionForceY.value = null
        edtionVinc.value = "Nenhuma"
    }
}

function removeLine() {
    let indexRemove = Number(lineForEdtion.value)
    if(lineForEdtion.value == "Selecione uma linha"){
        window.alert("Selecione uma linha")
    }else{
        //apagando a iformação dos pontos das linhas que os estavam usando
        console.log(`linhas no1: ${
            lines[lineForEdtion.value]
        .node1
        .lines
        }`)
        console.log(`linhas no2: ${
            lines[lineForEdtion.value]
        .node2
        .lines
        }`)
        
        lines[lineForEdtion.value]
        .node1
        .lines.splice(
            lines[lineForEdtion.value].node1.lines.indexOf(lineForEdtion.value), 1
        )

        lines[lineForEdtion.value]
        .node2
        .lines.splice(
            lines[lineForEdtion.value].node2.lines.indexOf(lineForEdtion.value), 1
        )

        console.log(`linhas no1: ${
            lines[lineForEdtion.value]
        .node1
        .lines
        }`)
        console.log(`linhas no2: ${
            lines[lineForEdtion.value]
        .node2
        .lines
        }`)

        //apagando linha
        item = document.getElementById(`optionLine${Number(lineForEdtion.value) + 1}`)

        item.parentNode.removeChild(item)

        lines.splice(indexRemove,1)

        //Reorganizando as linhas
        for(let i = indexRemove; i<lines.length; i++){
            let item = document.getElementById(`optionLine${i + 2}`)
            item.value = i
            item.text = `Linha ${i + 1}`
            item.id = `optionLine${i + 1}`
            //falta modificar nos pontos a informação das linhas que os usam
            //item.node1.lines[item.node1.lines.indexOf(i+1)] = i
            //item.node1.lines[item.node2.lines.indexOf(i+1)] = i
        }

        ctx.clearRect(0, 0, screen.width, screen.height)   
        nodes.forEach( node => {
            drawNode(node)
        })
        lines.forEach(line => {
            drawLine(line) 
        })

        lineForEdtion.value = "Selecione uma linha"
        node1ForLineEdtion.value = 'Selecione'
        node2ForLineEdtion.value = 'Selecione'
        cargaInicioEdtion.value = 0
        cargaFimEdtion.value = 0
    }
}

let secAddPonto = document.getElementById("secAddPonto")
let secAddLinha = document.getElementById("secAddLinha")
let secEditPonto = document.getElementById("secEditPonto")
let secEditLine = document.getElementById("secEditLine")
function menuAddPonto(){
    secAddPonto.className = "show"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
}
function menuAddLinha(){
    secAddPonto.className = "hide"
    secAddLinha.className = "show"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
}
function menuEditPonto(){
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "show"
    secEditLine.className = "hide"
}
function menuEditLine(){
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "show"
}


//Parte para ajudar nos testes
//Criando alguns pontos
for(i=1 ; i<=4; i++){
    let x = document.getElementById("posX")
    let y = document.getElementById("posY")
    let forceX = document.getElementById("forceX")
    let forceY = document.getElementById("forceY")

    x.value = i*100 - 50
    y.value = 100
    forceX.value = 0
    forceY.value  = 10*i+10
    
    insertNode()
}

//Criando algumas linha
for(i=1; i<=4; i++){
    if(i%2 != 0){
        let node1 = document.getElementById("node1ForLine")
        let node2 = document.getElementById("node2ForLine")
        let cargaInicio = document.getElementById('cargaInicio')
        let cargaFim = document.getElementById('cargaFim')

        node1.value = i-1
        node2.value = i
        cargaInicio.value = (i-1)*10
        cargaFim.value = i*10

        insertLine()
    }
}