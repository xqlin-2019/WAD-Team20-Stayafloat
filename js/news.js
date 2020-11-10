var key = "0c73b075b02f486ab230160d61a0f815";
var key2 = "c2138d7edb6e481a80ee75989ac1c8a9";
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

    // var preferences = sessionStorage.getItem('preference');
    // if (preferences == "") {
    //     return
    // }
    // var topics = preferences.split(',');

    var topics = ["Entertainment","Singapore","Technology","Business"]
    shuffleArray(topics);

    for (each of topics){
        display_default(each);
    }
}

function display_default(query){

    var request = new XMLHttpRequest();

    

    request.onreadystatechange = function() {


        if( this.readyState == 4 && this.status == 200 ) {
            display(this,query);
        }

    }

    
    if (query == "Singapore"){
        var url_query = cors +`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key2}&pageSize=${pageSize}`;
    } else {
        var url_query = cors +`http://newsapi.org/v2/top-headlines?country=${country}&category=${query}&pageSize=${pageSize}&apiKey=${key2}`;
    }
    request.open("GET", url_query, true);
    
    request.send();
    
}

function display(xml,query){
    var response_json = JSON.parse(xml.responseText);
    var news = response_json.articles;
    
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
                <br><br><br><br><br><br><br><br><br><br><br><br>
                <div class="container bg-light" id = "first_article_text" style = "padding-bottom: 0px; margin:0px; opacity:0.5">
                <span class = "badge badge-primary">${query}</span><br></img><h3>${title}</h3>
                <p>${description}</p>
                <small class="text-muted"><a href = ${more_info}>Click to know more</a></small>
                 </div>
                </div>
                `;

                first_article = false;
            } else {
                str += `
                <div class="card mb-3 mx-auto border-0" style="max-width: 60%;">
                    <div class="row no-gutters">
                    <div class="col-md-4">
                    <br>
                        <img src="${image}" class="card-img " alt="#" id = "article_image">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <span class = "badge badge-primary">${query}</span>
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <p class="card-text"><small class="text-muted"><a href = ${more_info}>Click to know more</a></small></p>
                        </div>
                    </div>
                    </div>
                </div>`

            }

        }
        
    }
    
    document.getElementById('articles').innerHTML += str;
    document.getElementById('first').innerHTML += first;

}

