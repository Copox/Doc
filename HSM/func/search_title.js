/*  */

function search_isToken(str){
    /* check './title/encodeURIComponent(str).js' is existed */
}

function search_getSongFromToken(str,token){
    var t = JSON.parse(get('./title/' + token + '.js'));
    var s = [];
    for(let e of t.song)
        for(let c of str)
            if(e.name.includes(c))
                s.push({name:e.name,id:e.id});
    return s;
}

function search_getSongFromTitle(str){
    let s = str_derep(str);
    if(search_isToken(s.at(0)))
        o = search_getSongFromToken(s,token);
}