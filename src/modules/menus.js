const AddPonto = () => {
    secAddPonto.className = "show"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
    secShowResults.className = "hide"
    
}
const AddLinha = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "show"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
    secShowResults.className = "hide"
}
const EditPonto = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "show"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
    secShowResults.className = "hide"
}
const EditLine = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "show"
    secMaterialForma.className = "hide"
    secShowResults.className = "hide"
}
const MaterialForma = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "show"
    secShowResults.className = "hide"
}
const menuShowResults = () => {
    secAddPonto.className = "hide"
    secAddLinha.className = "hide"
    secEditPonto.className = "hide"
    secEditLine.className = "hide"
    secMaterialForma.className = "hide"
    secShowResults.className = "show"
}

export {AddPonto, AddLinha, EditLine, EditPonto, MaterialForma, menuShowResults}