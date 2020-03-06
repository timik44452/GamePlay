class news_container{
    constructor(team, date, text, iconUrl, imageUrl){
        this.team = team;
        this.date = date;
        this.text = text;
        this.iconUrl = iconUrl;
        this.imageUrl = imageUrl;
    }
}

function getPopularFeeds(){
    return [
        new news_container('Grecha team', '14:15 21.01.2020', 'Starting of new project', 'game.png'),
        new news_container('Grecha team', '14:05 21.01.2020', 'Starting of project', 'game.png', 'sm.png'), 
        //new news_container('Grecha team', '14:15 21.01.2020', 'Starting of new project', 'game.png'),
        new news_container('Grecha team', '14:05 21.01.2020', 'Starting of project', 'game.png', 'sm.png')
    ];
}
