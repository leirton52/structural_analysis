const globalToLocal = (L, node1, node2) =>{
    let xi = node1.x
    let xf = node2.x
    let yi = node1.y
    let yf = node2.y

    let cos = (xf-xi)/L
    let sen = (yf-yi)/L

    let mGlobalToLocal = [
        [cos,  sen, 0  , 0  ,  0  , 0],
        [-sen, cos, 0  , 0  ,  0  , 0],
        [0  ,  0  , 1  , 0  ,  0  , 0],
        [0  ,  0  , 0  ,  cos, sen, 0],
        [0  ,  0  , 0  , -sen, cos, 0],
        [0  ,  0  , 0  , 0  ,  0  , 1],
        
    ]

    return mGlobalToLocal
}

const localToGlobal = (L, node1, node2) =>{
    let xi = node1.x
    let xf = node2.x
    let yi = node1.y
    let yf = node2.y

    let cos = (xf-xi)/L
    let sen = (yf-yi)/L

    let mLocalToGlobal = [
        [cos, -sen, 0  , 0  ,  0  , 0],
        [sen,  cos, 0  , 0  ,  0  , 0],
        [0  ,  0  , 1  , 0  ,  0  , 0],
        [0  ,  0  , 0  , cos, -sen, 0],
        [0  ,  0  , 0  , sen,  cos, 0],
        [0  ,  0  , 0  , 0  ,  0  , 1],
        
    ]

    return mLocalToGlobal
}

export {localToGlobal, globalToLocal}