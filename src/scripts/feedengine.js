class news_container{
    constructor(date, text, iconUrl, imageUrl){
        this.date = date;
        this.text = text;
        this.iconUrl = iconUrl;
        this.imageUrl = imageUrl;
    }
}

function getTemplate(callback){

    const template_url = "/templates/post.template";

    $.get(template_url, (data) => {
        this.postHTMLTemplate = data;
        
        callback();
    });
}

function getPopularFeeds(){
    return [
        new news_container('14:05 21.01.2020', 'Starting of project', 'game.png', 'sm.png'),
        new news_container('14:15 21.01.2020', 'Starting of new project', 'game.png'),
        new news_container('14:05 21.01.2020', 'Starting of project', 'game.png', 'sm.png'), 
        new news_container('14:15 21.01.2020', 'Starting of new project', 'game.png'),
        new news_container('14:05 21.01.2020', 'Starting of project', 'game.png', 'sm.png')
    ];
}

function getPostHTML(element)
{
    if(this.postHTMLTemplate == undefined){
        return;
    }

    let postHTML = postHTMLTemplate;

    Object.keys(element).forEach(key =>{

        let bodyRegex = new RegExp('{[\\s\\S]*.*[\\s\\S]}');
        
        //TODO:
        // !imageUrl {   WORK !!!
        //
        // !imageUrl     DOSN'T WORK !!!
        // { 
        //

        let expressionRegex = new RegExp(`!${key}{[\\s\\S]*.*[\\s\\S]}`, 'g');

        let match = expressionRegex.exec(postHTML);
        
        if(match != null)
        {
            match.forEach(value =>{
                
                if(element[key] == null || element[key] == undefined || element[key] == '')
                    postHTML = postHTML.replace(value, '');
                else
                {
                    //TODO: It's scared
                    let replaceValue = bodyRegex.exec(value).toString();

                    replaceValue = replaceValue.replace('{', '');
                    replaceValue = replaceValue.replace('}', '');

                    postHTML = postHTML.replace(value, replaceValue);
                }
            });
        }

        postHTML = postHTML.replace(`$${key}`, element[key]);
    });

    return postHTML;
}