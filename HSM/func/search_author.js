function search_isAuthor(str){
    /* check './author/str.js' is existed */
}

/* o connected with html dom */

function search_getSongFromAuthor(str){
    if(search_isAuthor(str)){
        try{
            o = JSON.parse(get('./author/' + str + '.js'));
        }catch(e){
            o = null;
        }
    }
}