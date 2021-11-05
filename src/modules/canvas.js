let screen = document.getElementById('screen') //pegando o canvas do html
let ctx = screen.getContext("2d") //pegando o contexto do canvas

//função que desenha a linha
function drawLine(line) {
    //consfigurando a os parametros de renderização
    ctx.lineWidth = 3
    ctx.strokeStyle = "green"
    ctx.fillStyle = 'rgba(0,0,200, 0.5)'
   
    //deseha a carga vertical (Y)
    ctx.beginPath()
    ctx.moveTo(line.node1.x, line.node1.y)
    ctx.lineTo(line.node1.x, line.node1.y-line.carga.cargaInicioY)
    ctx.lineTo(line.node2.x, line.node2.y-line.carga.cargaFimY)
    ctx.lineTo(line.node2.x, line.node2.y)
    ctx.fill()

    ctx.fillStyle = 'black'
    ctx.font = '15px arial'
    ctx.fillText(`${line.carga.cargaInicioY}`, line.node1.x, line.node1.y-line.carga.cargaInicioY-3)
    ctx.fillText(`${line.carga.cargaFimY}`, line.node2.x, line.node2.y-line.carga.cargaFimY-3)

    //deseha a carga horizontal (X)
    ctx.fillStyle = 'rgba(255,255,0, 0.5)'
    ctx.beginPath()
    ctx.moveTo(line.node1.x, line.node1.y)
    ctx.lineTo(line.node1.x, line.node1.y-line.carga.cargaInicioX)
    ctx.lineTo(line.node2.x, line.node2.y-line.carga.cargaFimX)
    ctx.lineTo(line.node2.x, line.node2.y)
    ctx.fill()

    ctx.fillStyle = 'black'
    ctx.font = '15px arial'
    ctx.fillText(`${line.carga.cargaInicioX}`, line.node1.x, line.node1.y-line.carga.cargaInicioX-3)
    ctx.fillText(`${line.carga.cargaFimX}`, line.node2.x, line.node2.y-line.carga.cargaFimX-3)

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
    if(node.forceX > 0){
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
    } else if (node.forceX<0){
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
      
        ctx.beginPath()
        ctx.moveTo(node.x-node.forceX, node.y)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
        

        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(node.x+10, node.y-5)
        ctx.lineTo(node.x+10, node.y+5)
        ctx.fill()
        
        ctx.font = "15px arial"
        ctx.fillText(node.forceX, node.x - node.forceX, node.y)
    }

    if(node.forceY > 0){
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
    } else if (node.forceY < 0) {
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(node.x, node.y - node.forceY)
        ctx.lineTo(node.x, node.y)
        ctx.lineTo(node.x-5,node.y+10)
        ctx.lineTo(node.x+5, node.y+10)
        ctx.lineTo(node.x, node.y)
        ctx.stroke()
        ctx.fill()
        ctx.font = "15px arial"
        ctx.fillText(node.forceY, node.x,node.y-node.forceY+10)
    }

    //desenhando a carga de momento
    if(node.momento >0){
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(node.x - 10, node.y, 10, 3*Math.PI/2, Math.PI/2, true)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(node.x-0, node.y+10)
        ctx.lineTo(node.x-10, node.y+5)
        ctx.lineTo(node.x-10, node.y+15)
        ctx.fill()
        
        ctx.font = "15px arial"
        ctx.fillText(node.momento, node.x-30,node.y+20)
    } else if (node.momento <0){
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(node.x + 10, node.y, 10, Math.PI/2, 3*Math.PI/2, true)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(node.x, node.y+10)
        ctx.lineTo(node.x+10, node.y+5)
        ctx.lineTo(node.x+10, node.y+15)
        ctx.fill()
        
        ctx.font = "15px arial"
        ctx.fillText(node.momento, node.x-30,node.y+20)
    }

    if(node.vinc == "apoiado-x"){
        ctx.lineWidth = 1
        ctx.strokeStyle = "black"

        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(node.x - 10, node.y+10)
        ctx.lineTo(node.x - 10, node.y-10)
        ctx.lineTo(node.x, node.y)
        ctx.moveTo(node.x-15, node.y-10)
        ctx.lineTo(node.x-15, node.y+10)
        ctx.stroke()
    }else if(node.vinc == "apoiado-y"){
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

export {screen, ctx, drawLine, drawNode}