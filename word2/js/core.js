

/*
    word = {
        s:'apple',
        n:0,
        p:true
    }

    s , word string;
    n , a number mark for word
    p , make sure to replace

    str = 'apple{{0}}' , str.replace(word.s + '{{0}}','{{' + word.s + '}}');

    when word.p be false , str.replace(word.s + '{{0}}',word.s);
*/

const mode = {
    odd:_odd,
    even:_even,
    oddAndeven:_odd_and_even,
    mod:_mod,
    random:_random
}


/*
var o = partWord(str + ' ');
var tmpStr = o.tmpStr;
var arr = o.arr;

var s = replaceWord(tmpStr,mode.random(arr));
console.log(s);
*/

function partWord(str,key = 0){
    var arr = [],tmpStr = '',isWord = 0,word = '';
    for(var i = 0;i<str.length;i++){
        if(checkWordRange(str[i])){
            isWord = 1;
            word += str[i];
        }else{
            if(isWord){
                // call form a word
                key++;
                tmpStr += '{{' + key.toString() + '}}';
                arr.push({
                    s:word,
                    n:key,
                    p:0
                });
                word = '';
                isWord = 0;
            }
        }
        tmpStr += str[i];
    }
    return {
        arr:arr,
        tmpStr:tmpStr
    };
}

function checkWordRange(w){
    var p = 0;
    if((w.charCodeAt()>=65&&w.charCodeAt()<=90)||(w.charCodeAt()>=97)&&(w.charCodeAt()<=122)){
        p = 1;
    }
    return p;
}

function replaceWord(tmpStr,words){
    var newStr = tmpStr;
    for(var i = 0;i<words.length;i++){
        if(words[i].p){
            if(words[i].f){
                newStr = newStr.replace(words[i].s + '{{'+ words[i].n +'}}',words[i].f(words[i].s));
            }else{
                newStr = newStr.replace(words[i].s + '{{'+ words[i].n +'}}','{{' + words[i].s + '}}');
            }
        }else{
            newStr = newStr.replace(words[i].s + '{{'+ words[i].n +'}}',words[i].s);
        }
    }
    return newStr;
}

function setAttribute(words,attr,list,val){
    for(var i in list){
        (words[(list[i])])[attr] = val;
    }
}

function _odd(words,x = 1){
    var list = [];
    for(var i = 0;i<words.length;i+=2){
        list.push(i);
    }
    setAttribute(words,'p',list,1); // set p to be true
    setAttribute(words,'f',list,(word)=>{
        return '{{c'+ x +'::' + word + '}}';
    }); // set function of string
    return words;
}

function _even(words,x = 2){
    var list = [];
    for(var i = 1;i<words.length;i+=2){
        list.push(i);
    }
    setAttribute(words,'p',list,1); // set p to be true
    setAttribute(words,'f',list,(word)=>{
        return '{{c'+ x +'::' + word + '}}';
    }); // set function of string
    return words;
}

function _odd_and_even(words,x = 1,y = 2){
    _odd(words,x);
    _even(words,y);
    return words;
}

function _mod(words,x = 3,n = 1){
    var list = [];
    for(var i = 0;(i<words.length)&&n>0;i++){
        if(((i+1)%n) === 0){
            list.push(i);
        }
    }
    setAttribute(words,'p',list,1); // set p to be true
    setAttribute(words,'f',list,(word)=>{
        return '{{c'+ x +'::' + word + '}}';
    }); // set function of string
    return words;
}

function _random(words,x = 4,d = 0.5){
    var n = parseInt(words.length*d);
    var list = Array.from(Array(words.length).keys()),newList = [];
    var p = 0,t = 0;
    for(var i = 0;i<n;i++){
       p =  Math.floor(Math.random() * ((list.length-1) + 1));
       newList.push(list[p]);
       list[p] = list[list.length-1];
       list.pop();
    } 
    setAttribute(words,'p',newList,1); // set p to be true
    setAttribute(words,'f',newList,(word)=>{
        return '{{c'+ x +'::' + word + '}}';
    }); // set function of string
    return words;
}
