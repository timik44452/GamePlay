class news_container{
    constructor(team, date, text, iconUrl, imageUrl){
        this.team = team;
        this.date = date;
        this.text = text;
        this.iconUrl = iconUrl;
        this.imageUrl = imageUrl;
    }
}

function getPopularFeeds(callback){

    let _result = [];

    $.get("posts/best", (result) =>{
        console.log(result);
        callback(JSON.parse(result));
    });
}
