function getRedirectTo({type,header}){//base on user type and user header to choose perfect path
    let path = '';
    if(type === 'boss'){
        path = 'boss'
    }else{
        path = 'dashen'
    }
    if(!header){
        path += '-info'
    }
    return path
}

export {
    getRedirectTo
}