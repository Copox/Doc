
function str_hash(str,b){
    let h = 0;
    for(let i = str.length-1;i>=0;i--){
        h = (h + str[i].charCodeAt())%b;
    }
    return h;
}

function str_derep(str){
    let nstr = '';
    let len = Array.from(str).length;
    let arr = new Array(len);
    for(var c of str){
        console.log(c);
        let h = str_hash(c,len);
        if(!arr[h])
            arr[h] = [];
        if(!arr[h].includes(c)){
            arr[h].push(c);
            nstr += c;
        }
    }
    return nstr;
}