const AddPonto = () => {
    secAddPonto.className = "show"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
    
}
const AddLinha = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "show"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
}
const EditPonto = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "show"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
}
const EditLine = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "show"
    secMaterialForma.className = "hide"
}
const MaterialForma = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "show"
}

export {AddPonto, AddLinha, EditLine, EditPonto, MaterialForma}