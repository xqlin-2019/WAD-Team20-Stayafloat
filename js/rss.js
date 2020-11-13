
var first_article = true;

function display_rss(){


    const RSS_URL = `https://cors-anywhere.herokuapp.com/https://tinybuddha.com/feed/`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data);
    const items = data.querySelectorAll("item");
    console.log(items);
    var first = ``;
    var str = `<div style = "margin-bottom:20px">
    
    `
    
    let rss_html = ``;
    items.forEach(el => {
       
      
        console.log(el.getElementsByTagName("category")[1]);
        category_obj =el.getElementsByTagName("category")[1];
        cat_html =category_obj.innerText || category_obj.textContent;
      
        category = document.createElement("p");
        category.innerHTML = cat_html;

        var description = el.getElementsByTagName("description")[0];
        var content = el.getElementsByTagName("content:encoded")[0];
        console.log(content);
        // console.log(description);
        inner_html = description.innerText || description.textContent;
        inner_content = content.innerText || content.textContent;
        // console.log(inner_html);
        // console.log(typeof(inner_html));

        desc_tag = document.createElement("div");
        desc_tag.innerHTML = inner_html;

        content_tag = document.createElement("div");
        content_tag.innerHTML = inner_content;

        content_ptag_list = content_tag.querySelectorAll("p");
      
        ptag_list = desc_tag.querySelectorAll("p");
        console.log(ptag_list);
       
   

      if (first_article == true){
        first += `
        <div id= "first_article" class="jumbotron" style="background-image: url(${desc_tag.querySelector("img").src}) ; background-size: 100%"; padding-left:0px; padding-bottom: 0px; padding-top: 200px;margin-bottom: 15px>
        <div id="jumbodiv" class="col-md-6 mx-0" style = "padding: 20px; margin:0px; width : 100%; height: 30%; opacity: 0.9">
            <h1 class="display-5 text-left font-weight-bold">${el.querySelector("title").innerHTML}</h1>
            <p class="lead" style="color: rgb(6, 6, 105)">${ptag_list[1].innerText}</p>
            <hr class="my-4">
            <p>${content_ptag_list[2].innerText}</p>
            <p class="lead">
              <a class="btn btn-info btn-lg" style="float:right ; margin-top: 5px;" href="${el.querySelector("link").innerHTML}" target="_blank" role="button">Read more</a>
            </p>    
        </div>
      	</div>
       
        `;
        first_article = false;

      }
      else {
        str += `
        <div class="card mb-3 mx-1 border-1 ">
            <div class="row no-gutters">

            <div class="col-md-4" style = "text-align: center">
                <img src="${desc_tag.querySelector("img").src}" style="height: 100%;" class="card-img " onerror="this.onerror=null; this.src='./images/placeholder.jpg'"  alt="" id = "article_image" >
            </div>

            <div class="col-md-8">
                <div class="card-body" style = "padding-top: 0px; "padding-bottom:30px">
                <p class= "text-muted" style="font-size: 12px ; padding-top: 5px">${category.innerHTML}</p>
                <h5 class="card-title" style="text-align: left;">${el.querySelector("title").innerHTML}</h5>
                <hr class="my-2">
                <p class="card-text" style="font-size: 12px; color: rgb(5, 82, 82);">${content_ptag_list[2].innerText}</p>
                <a class="btn btn-info btn-lg" style="float:right ; margin-bottom: 10px;" href="${el.querySelector("link").innerHTML}" target="_blank" role="button">Read more</a>
                </div>
            </div>
            </div>
        </div>
        </div>`



      }
    });

    document.getElementById("first_article").innerHTML = first
    document.getElementById("articles").innerHTML += str;
  })};
