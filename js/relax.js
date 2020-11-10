
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
    


    var str = `<div class = "w3-animate-opacity"><h5 id = "quote_sentence">"${quote}"</h5><h4>- ${author}</h4></div>`;
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
    var str_start = `<div class="w3-container w3-center w3-animate-zoom"><div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval = "10000">
                    <div class="carousel-inner">`;

    var str_end = `</div><a class="carousel-control-prev" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                        </a>
                    </div></div>`

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
                str_start += `<div class="carousel-item active"><div class = "container" id = "each_joke">${joke}</div></div>`;
                var start = false;
            } else {
                str_start += `<div class="carousel-item"><div class = "container" id = "each_joke">${joke}</div></div>`;
            }

        }
        
        

    }
    
    str_total = str_start + str_end;

    document.getElementById("jokes").innerHTML += str_total;

}


