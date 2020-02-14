export default function(articles = [], action) {

    if(action.type == 'addArticle') {

        if(articles.findIndex(e=> e.title === action.titleF) == -1){
            console.log("reducer",articles)
            var articleCopy = [...articles]
                articleCopy.push({
                    source : action.sourceF,
                    title :action.titleF,
                    description : action.descF,
                    image : action.url
                })
                return articleCopy;   
        }else{
            return  articles
        }
         
    } else if (action.type == 'deleteArticle') {
        console.log("hello delete action")
        var articleCopy = articles.filter(e =>(e.title !== action.titleF))    
        return articleCopy;   
    }else{
        return articles;
    };
 
  }