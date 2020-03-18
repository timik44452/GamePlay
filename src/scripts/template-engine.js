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
        
        this.cachedHTML.push({
            template_name:template_name, 
            HTML:data
        });

        callback();
    });
}

function getHTML(element){
    
    if(!this.postHTMLTemplate){
        console.warn('Template is undefined');
        return;
    }

    if(!element){
        console.warn('Element is undefined');
        return this.postHTMLTemplate;
    }

    let postHTML = postHTMLTemplate;
    let bodyRegex = /{[\s\S]*?}/;
    
    Object.keys(element).forEach(key =>{

        let expressionRegex = new RegExp(`!${key}\\s*?{[\\s\\S]*?}`, 'g');

        let match = expressionRegex.exec(postHTML);

        if(match)
        {
            match.forEach(value =>{

                let replaceValue = '';

                if(element[key])
                {
                    replaceValue = bodyRegex.exec(value).toString();

                    if(replaceValue.length > 0){
                        replaceValue = replaceValue.substring(1, replaceValue.length - 1);
                    }
                }
                
                postHTML = postHTML.replace(value, replaceValue);
            });
        }

        postHTML = postHTML.replace(new RegExp(`\\$${key}`, 'g'), element[key]);
    });

    return postHTML;
}