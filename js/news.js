var key = "0c73b075b02f486ab230160d61a0f815";
var key2 = "c2138d7edb6e481a80ee75989ac1c8a9";

var country = 'sg';
var pageSize = '3';
var first_article = true;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var formatted_date = dd + '/' + mm + '/' + yyyy;
var updated_date = `<h6> Updated ${formatted_date}</h6>`;


var category_colours = {
    Business: "badge-primary",
    Entertainment: "badge-warning",
    General: "badge-secondary",
    Health: "badge-success",
    Science: "badge-info",
    Sports: "badge-warning",
    Technology: "badge-dark",
    Singapore: "badge-danger"
}

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
    if (preferences == null){
        preferences = "Singapore";
    } else if (preferences == ""){
        document.getElementById('first').innerHTML += `<h5 style = "text-align: center; margin-bottom: 20px">To select your news preference, head over to the profile page!</h5>`;
        console.log("ok");
    }

    var topics = preferences.split(',');
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
        var url_query = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key2}&pageSize=${pageSize}`;
    } else {
        var url_query = `http://newsapi.org/v2/top-headlines?country=${country}&category=${query}&pageSize=${pageSize}&apiKey=${key2}`;
    }
    request.open("GET", url_query, true);
    
    request.send();
    
}

function display(xml,query){
    var response_json = JSON.parse(xml.responseText);
    var news = response_json.articles;

    // Create news category badge
    var str = `<div>
                <span class = "badge ${category_colours[query]}" style = "margin-bottom:20px">${query}</span>
                `
    var first = ``;

    for (article of news){


        var description = JSON.stringify(article['description']);


            var image = article['urlToImage'];
            var title = article['title'];
            var description = article['description'];
            var more_info = article['url'];

            // if article does not have a description, it will appear as an empty string
            if (description == null){
                description = " ";
            }

            // first article is displayed as a jumbotron
            if (first_article == true){
                first += `
                <div class="jumbotron jumbotron-fluid" style="background-image: url(${image}); background-size: 100%;padding-left:0px; padding-bottom: 0px; padding-top: 200px;margin-bottom: 15px;">
                    <div class="col-md-6 mx-0" id = "first_article_text" style = "padding: 20px; margin:0px; width : 100%; height: 30%; opacity: 0.9;  background-color: #102B72;color:white">
                        <h2>${title}</h2><br>
                        <small class="text-muted"><a href = ${more_info} id = "links" style = "color: white">Click to know more</a></small>
                    </div>
                </div>
                `;

                first_article = false;
            
            } else {
                str += `
                <div class="card mb-3 mx-auto border-0">
                    <div class="row no-gutters">

                    <div class="col-md-4" style = "text-align: center">
                        <img src="${image}" class="card-img " onerror="this.onerror=null; this.src='./images/placeholder.jpg'"  alt="" id = "article_image" style = "padding-bottom: 10px">
                    </div>

                    <div class="col-md-8">
                        <div class="card-body" style = "padding-top: 0px; "padding-bottom:30px">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <small class="text-muted"><a href = ${more_info} id = "links">Click to know more </a></small>
                        </div>
                    </div>
                    </div>
                </div>
                </div>`

        }
        
    }
    
    document.getElementById('articles').innerHTML += str;
    document.getElementById('first').innerHTML += first;

}

// document.getElementById('date').innerHTML += updated_date;
