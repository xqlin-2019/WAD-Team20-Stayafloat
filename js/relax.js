
var category = "inspire"; 
/*
Art, funny, inspire
life, love,management
sports, students
*/

function display_quote(){

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        if( this.readyState == 4 && this.status == 200 ) {
            display(this);
        }

    }

    var url = `https://quotes.rest/qod?category=${category}`;

    request.open("GET", url, true);    
    request.send();
    
}

function display(xml){
    var response_json = JSON.parse(xml.responseText);
    console.log(response_json);

    var quote = response_json.contents.quotes[0].quote;
    var author = response_json.contents.quotes[0].author;
    
    var str = `<div class = "w3-animate-zoom"><h5 id = "quote_sentence">"${quote}"</h5><h4>- ${author}</h4></div>`;
    console.log(str);

    document.getElementById('quote').innerHTML = str;

}


function get_jokes(){

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        if( this.readyState == 4 && this.status == 200 ) {
            display_jokes(this);
        }

    }

    var url= `https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&amount=6`;
    
    request.open("GET", url, true);
    request.send();
    
}

function display_jokes(xml){
    var start = true;
    var response_json = JSON.parse(xml.responseText);
    console.log(response_json['jokes']);
    var str_start = `<div class="container w3-animate-zoom" style = "padding:0px ;"><div id="carousel_of_jokes" class="carousel slide" data-ride="carousel" data-interval = "10000">
                    <div class="carousel-inner" role="listbox">`;

    var str_end = `</div><a class="carousel-control-prev" href="#carousel_of_jokes" role="button" data-slide="prev" style = "margin:0px;">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carousel_of_jokes" role="button" data-slide="next" style = "margin:0px;">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                        </a>
                    </div>
                    `

    for (joke of response_json['jokes']){

        if (joke.category == "Dark"){   
            continue
        }else{

            if (joke.type == "single"){
                var joke = joke.joke;
            } else {
                var joke = joke.setup + "<br>"+ joke.delivery;
            }
            if (start == true){
                str_start += `<div class="carousel-item active"><div class = "container"  id = "each_joke">${joke}</div></div>`;
                var start = false;
            } else {
                str_start += `<div class="carousel-item"><div class = "container" id = "each_joke">${joke}</div></div>`;
            }

        }   

    }  
    str_total = str_start + str_end;

    document.getElementById("jokes").innerHTML += str_total;

}

function get_videos(){

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {


        if( this.readyState == 4 && this.status == 200 ) {
            display_list(this);
        }


    }
    
    var search_term = document.getElementById("search_input").value;
    sessionStorage.setItem("query", search_term);
    
    var query = sessionStorage.getItem("query");
    
    console.log(query)
    
    if (query == ""){
        query ='lofi';
    }



    var apikey = 'AIzaSyADWdrrP3pbeap29wuVgbusK2ndJMU7e6w';
    
    var url= `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${apikey}&q=${query}&type=playlist`;

    console.log(url)
    request.open("GET", url, true);
    
    request.send();
    
}

function display_list(xml){
    var response_json = JSON.parse(xml.responseText);
    console.log(response_json['items'])
        var items_arr = response_json['items'];
    

    var str = "";

    for (list of items_arr){
        var playlist_id = list.id.playlistId;
        console.log(playlist_id);

        var embed = `<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/videoseries?list=${playlist_id}"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;

        str += embed;
    }
    
    //console.log(str);
    


    document.getElementById("video_list").innerHTML = str;

}


function search_videos(){

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {


        if( this.readyState == 4 && this.status == 200 ) {
            display_list(this);
        }


    }
    
    var query = document.getElementById("search_input").value;
    
    if (query == ""){
        query ='lofi';
    }
    console.log(query)


    var apikey = 'AIzaSyADWdrrP3pbeap29wuVgbusK2ndJMU7e6w';
    
    var url= `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${apikey}&q=${query}&type=playlist&restriction=SG`;

    console.log(url)
    request.open("GET", url, true);
    
    request.send();
    
}
