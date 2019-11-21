
async function fetchJSON(url){
    let body = null;
    try{
        let response = await fetch(url);
        if(response.ok)
            return (await response.json());
    }catch(e){
        return body;
    }
}

function searchAuthorByName(keyword){
    let authors = [];
    if(allAuthors && allAuthors.authors){
        for(let a of allAuthors.authors){
            let f = true;
            for(let b of keyword){
                if(!a.includes(b)){
                    f = false;
                    break;
                }
            }
            if(f)
                authors.push(a);
        }
    }
    return authors;
}


async function searchSongByAuthors(authors){
    var songs = [],id = new Array(133);
    for(let a of authors){
        let t = await fetchJSON('https://copox.github.io/Doc/HSM/authors/' + encodeURIComponent(a) + '.json');
        if(t && t.songs.length){
            for(let s of t.songs){
                let key = s.id%133;
                if(id[key] && !id[key].includes(s.id)){
                    id[key].push(s.id);
                    songs.push(s);
                }
                else if(!id[key]){
                    id[key] = [s.id];
                    songs.push(s);
                }
            }
        }
    }
    return songs;
}

async function searchSongByName(keyword){
    var songs = [];
    let c = encodeURIComponent([...keyword][0]);
    let t = await fetchJSON('https://copox.github.io/Doc/HSM/title/' + c + '.json');
    if(t && t.songs){
        for(let e of t.songs){
            let f = true;
            for(let d of keyword){
                if(!e.title.includes(d)){
                    f = false;
                    break;
                }
            }
            if(f)
                songs.push(e);
        }
    }
    return songs;
}

var allAuthors;
fetchJSON('https://copox.github.io/Doc/HSM/authors/authors.json').then(r=>{allAuthors = r});





const toolbar = [
    {
        title:'Search',
        tabId:0,
        icon:'mdi-file-search-outline'
    },
    {
        title:'Songs',
        tabId:1,
        icon:'mdi-file-music-outline'
    },
    {
        title:'Player',
        tabId:2,
        icon:'mdi-disc-player'
    }
];
const searchType = [
    {
        title:'author',
        id:0,
    },
    {
        title:'song',
        id:1
    }
];

var songList = [];
var searchList = [];

new Vue({
    el: '#HSM',
    vuetify: new Vuetify(),
    data:{
        toolbar:toolbar,
        searchType:searchType,
        searchDialog:false,
        searchResult:[],
        isDerepList:false,
        listSource:null,
        detailDialog:false,
        detailSong:{
            title:'loading ...',
            authors:['loading ...'],
            url:''
        },
        changeBtn:true,
        changeBtnText:['Add','Remove'],
        changeBtnColor:['success','warning'],
        searchKeyword:'',
        searchStatus:0,
    },
    methods:{
        tabChange:function (id){
            switch (id) {
                case 0:
                    this.listSource = searchList;
                    this.isDerepList = false;
                    break;
                case 1:
                    this.listSource = songList;
                    this.isDerepList = true;
                    break;
                case 2:
                default:
                    break;
            }
        },
        selectSong:async function(id){
            this.detailDialog = true;
            this.changeBtn = this.checkSongRep(id);
            this.detailSong = await getSongDetailById(id);
        },
        checkSongRep:function(id){
            for(let i of songList)
                if(i.id === id && !i.del)
                    return true;
            return false;
        },
        changeSongList:function(name,id,type){
            this.changeBtn = !this.changeBtn;
            for(let i of songList){
                if(i.id === id){
                    i.del = !i.del;
                    return;
                }
            }
            songList.push({
                title:name,
                id:id,
                del:false
            });
        },
        searchSong:async function(){
            if(this.searchKeyword.trim()){
                switch(this.searchStatus){
                    case 0:
                        await this.searchByName(this.searchKeyword.trim());
                    break;
                    default:
                        await this.searchBySong(this.searchKeyword.trim());
                    break;
                }
            }
            this.searchDialog = false;
            this.tabChange(0);
        },
        searchByName:async function(name){
            searchList = await searchSongByAuthors(searchAuthorByName(name));
        },
        searchBySong:async function(keyword){
            searchList = await searchSongByName(keyword);
        }
    }
});

async function getSongDetailById(id){
    let s = {
        title:'loading ...',
        authors:['loading ...'],
        url:''
    };
    let r = await fetchJSON('https://copox.github.io/Doc/HSM/songs/' + id + '.json');
    if(r)
        s = r;
    return r;
}
