var cachedHTML = [];

function getTemplate(template_name, callback){

    cachedHTML.forEach(element =>{
        if(element.template_name == template_name){
            this.postHTMLTemplate = element.HTML;

            callback();
            
            return;
        };
    });

    let template_url = "./templates/" + template_name;

    $.get(template_url, (data) => {
        this.postHTMLTemplate = data;
        
        this.cachedHTML.push(
        {
            template_name:template_name, 
            HTML:data
        });

        callback();
    });
}

function getHTML(element){
    
    if(!this.postHTMLTemplate){
        return;
    }

    if(!element){
        return this.postHTMLTemplate;
    }

    let postHTML = postHTMLTemplate;
    let bodyRegex = /{[\s\S]*?}/;
    
    Object.keys(element).forEach(key =>{

        let expressionRegex = new RegExp(`!${key}\\s*?{[\\s\\S]*?}`, 'g');

        let match = expressionRegex.exec(postHTML);

        if(match !== null)
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

        postHTML = postHTML.replace(new RegExp(`\\$${key}`, 'g'), element[key]);
    });

    return postHTML;
}