export default function(lang="fr",action){
    if(action.type=="changeLang"){
        var newLang =  action.lang
        return newLang  
    }else{
        return lang
    }
}