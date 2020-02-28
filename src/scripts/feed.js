function loadnews()
{
    let feed = document.createElement('li');
    let container = document.getElementById("feed-container");

    feed.className = 'news-item';
    feed.innerHTML = '<li class="news-item"><div class="feed-header">' +
                            '<img src="images/game.png">' +
                            '<p class="feed-header">PROJECT STARTING</p>' +
                        '</div>' +
                        '<img style="height: 450px; width: 100%; background-image: url(/images/sm.png);">' +
                    '</li>';

    container.append(feed);
}