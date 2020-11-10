var key = "0c73b075b02f486ab230160d61a0f815";
var cors = 'http://cors-anywhere.herokuapp.com/';


var country = 'sg';
var pageSize = '2';
var first_article = true;


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var formatted_date = yyyy + '-' + mm + '-' + dd;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function retrieve_preference() {

    var preferences = sessionStorage.getItem('preference');
    if (preferences == "") {
        return
    }
    var topics = preferences.split(',');
    shuffleArray(topics);

    for (each of topics){
        display_default(each);
    }
}

function display_default(query){

    var request = new XMLHttpRequest();
    console.log(query);

    

    request.onreadystatechange = function() {


        if( this.readyState == 4 && this.status == 200 ) {
            display(this,query);
        }

    }

    
    if (query == "Singapore"){
        var url_query = cors +`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key}&pageSize=${pageSize}`;
    } else {
        var url_query = cors +`http://newsapi.org/v2/top-headlines?country=${country}&category=${query}&pageSize=${pageSize}&apiKey=${key}`;
    }
    request.open("GET", url_query, true);
    
    request.send();
    
}

function display(xml,query){
    var response_json = JSON.parse(xml.responseText);
    console.log(response_json);
    var news = response_json.articles;

    shuffleArray(news);
    console.log(news);

    var str = ``;
    var first = ``;

    for (article of news){
        var description = JSON.stringify(article['description']);

        if (description.includes(" ")){
            var image = article['urlToImage'];
            var title = article['title'];
            var description = article['description'];
            var more_info = article['url'];

            if (first_article == true){
                first += `
                <div class="jumbotron jumbotron-fluid mx-auto" style="background-image: url(${image}); background-size: 100%; "padding-bottom: 0px">
                <div class="container" id = "first_article_text" style = "padding-bottom: 0px">
                <br><br><br><br><br><br>
                <span class = "badge badge-primary">${query}</span><br></img><h3>${title}</h3>
                <p>${description}</p>
                <a href = ${more_info} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Click to know more</a>
                 </div>
                            </div>
                `;

                first_article = false;
            } else {
                str += `
                
                <div class="card" style = "margin: 10px">
                    <img src="${image}" class="card-img-top" alt="#">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <p class="card-text"><small class="text-muted"><a href = ${more_info}>Click to know more</a></small></p>
                    </div>
                </div>`;
            }

        }
        
    }
    
    document.getElementById('other_articles').innerHTML += str;
    document.getElementById('first').innerHTML += first;

}

