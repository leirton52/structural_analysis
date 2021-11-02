//##################### Linha 1 #####################//
const k11 = (L, prop) =>{
    let modElas = prop.material.modElas
    let area = prop.geometrica.area
    let k11 = modElas*area/L

    return k11
}
const k12 = (L, prop) =>{
    return 0
}
const k13 = (L, prop) =>{
    return 0
}
const k14 = (L, prop) =>{
    let modElas = prop.material.modElas
    let area = prop.geometrica.area
    let k14 = - modElas*area/L

    return k14
}
const k15 = (L, prop) =>{
    return 0
}
const k16 = (L, prop) =>{
    return 0
}

//##################### Linha 2 #####################//
const k21 = (L, prop) =>{
    return 0
}
const k22 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k22 = 12*modElas*inercia/(L**3)

    return k22
}
const k23 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k23 = 6*modElas*inercia/(L**2)

    return k23
}
const k24 = (L, prop) =>{
    return 0
}
const k25 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k25 = -12*modElas*inercia/(L**3)

    return k25
}
const k26 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k26 = 6*modElas*inercia/(L**2)

    return k26
}

//##################### Linha 3 #####################//
const k31 = (L, prop) =>{
    return 0
}
const k32 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k32 = 6*modElas*inercia/(L**2)

    return k32
}
const k33 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k33 = 4*modElas*inercia/L

    return k33
}
const k34 = (L, prop) =>{
    return 0
}
const k35 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k35 = - 6*modElas*inercia/(L**2)

    return k35
}
const k36 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k36 = 2*modElas*inercia/L

    return k36
}

//##################### Linha 4 #####################/
const k41 = (L, prop) =>{
    let modElas = prop.material.modElas
    let area = prop.geometrica.area
    let k41 = - modElas*area/L

    return k41
}
const k42 = (L, prop) =>{
    return 0
}
const k43 = (L, prop) =>{
    return 0
}
const k44 = (L, prop) =>{
    let modElas = prop.material.modElas
    let area = prop.geometrica.area
    let k44 = modElas*area/L

    return k44
}
const k45 = (L, prop) =>{
    return 0
}
const k46 = (L, prop) =>{
    return 0
}

//##################### Linha 5 #####################//
const k51 = (L, prop) =>{
    return 0
}
const k52 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k52 = -12*modElas*inercia/(L**3)

    return k52
}
const k53 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k53 = -6*modElas*inercia/(L**2)

    return k53
}
const k54 = (L, prop) =>{
    return 0
}
const k55 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k55 = 12*modElas*inercia/(L**3)

    return k55
}
const k56 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k56 = -6*modElas*inercia/(L**2)

    return k56
}

//##################### Linha 6 #####################//
const k61 = (L, prop) =>{
    return 0
}
const k62 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k62 = 6*modElas*inercia/(L**2)

    return k62
}
const k63 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k63 = 2*modElas*inercia/L

    return k63
}
const k64 = (L, prop) =>{
    return 0
}
const k65 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k65 = - 6*modElas*inercia/(L**2)

    return k65
}
const k66 = (L, prop) =>{
    let modElas = prop.material.modElas
    let inercia = prop.geometrica.inercia
    let k66 = 4*modElas*inercia/L

    return k66
}

export {k11,k12,k13,k14,k15,k16,
        k21,k22,k23,k24,k25,k26,
        k31,k32,k33,k34,k35,k36,
        k41,k42,k43,k44,k45,k46,
        k51,k52,k53,k54,k55,k56,
        k61,k62,k63,k64,k65,k66
}