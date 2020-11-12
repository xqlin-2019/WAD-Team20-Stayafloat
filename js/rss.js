
function display_rss(){


    const RSS_URL = `https://cors-anywhere.herokuapp.com/https://tinybuddha.com/feed/`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data);
    const items = data.querySelectorAll("item");
    console.log(items);

    var count = 1;
    let html = ``;
    items.forEach(el => {
        console.log(el.querySelector("link"))
        // console.log(items[count].querySelector("description").innerHTML)
      
    //   for( var $i = 0 ; $i < items.length ; $i ++ )  {
        // var article = items[count];
        
      html += `
        <article>
          <img src="${el.querySelector("description").innerHTML}" alt="">
          <h4></h4>
          <h2>
            <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h2>
        </article>
      `;
        count++;
    }
    );
    document.body.insertAdjacentHTML("beforeend", html);
  })};

//   /image/large.png
// children[description].firstChild.data