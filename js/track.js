function add_milestone(){

    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            //console.log(obj)
            if (obj.update_status == "successful"){
                document.getElementById("update_status").innerHTML = "<span style='background-color: green;color: white; margin-bottom:10px;'>New Milestone Added!</span>";
            }
            else {
                document.getElementById("update_status").innerHTML = "<span style='color: red;'>An error occured</span>";         
            }
        }
    }
    var email = sessionStorage.getItem('email');
    var description = document.getElementById("milestone_desc").value;
    var date = document.getElementById("due_date").value;

    if(description==""||date ==""){
        document.getElementById("update_status").innerHTML = "<span style='color: red;'>Please fill in both inputs!</span>";         
        console.log("error");
        return;
    }else{
        var url = `./php/userAuth.php?action=addMilestone&email=${email}&description=${description}&date=${date}`;

    }

    request.open("GET", url, true); // synchronous
    request.send();
}

function countdown(date){
    //console.log(date);
    var countdownDate = new Date(date).getTime();
    var today = new Date().getTime();
    //console.log(countdownDate);


    var distance = countdownDate - today;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //console.log(days);
    
    return days;

}


function get_milestone(){
    var request = new XMLHttpRequest(); // Prep to make an API call
    var str = "";
    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            //console.log(obj)
            milestones_arr = obj.milestones
            if (obj.retrieve_status == "successful"){
                milestones_arr.sort(function(a,b){return new Date(a.date) - new Date(b.date);});
                for(milestone of milestones_arr){
                    //console.log(milestone);
                    // console.log(milestone.date);
                    var date = milestone.date;
                    var count_down = countdown(date);
                    var description = milestone.description;
                    //console.log(count_down);
                    var ms_ID = milestone.ms_ID;

                    str+= `
                        <div class="col-xl-4">
                            <div class="card">
                                <div class="card-body" style="padding:0">
                                    <h1 class="card-title text-uppercase  text-white" style=" background-color: #102B72; padding:20px;">${count_down} DAYS LEFT</h1>
                                    <p class="card-text" style="color:black; font-size:large">${description}</p>

                                    <button type="button" id="deleteBtn" class="btn btn-link btn-sm" onclick="remove_milestone(${ms_ID});">Delete</button>
                                </div>
                            </div>
                        </div>`;
                }
                document.getElementById("milestone_cards").innerHTML = str;
                //console.log(str)
            }
            
        }
    }

    var email = sessionStorage.getItem('email');

    // console.log(description, date);
    var url = `./php/userAuth.php?action=getMilestones&email=${email}`;
    request.open("GET", url, true); // synchronous
    request.send();
}

function remove_milestone(ms_ID){

    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object

            if (obj.delete_status == "successful"){
                location.reload();
            }
            else {
                document.getElementById("delete_status").innerHTML = "<span style='color: red;'>An error occured</span>";         
            }
            //console.log("hello");

        }

    }
    var email = sessionStorage.getItem('email');

    var url = `./php/userAuth.php?action=removeMilestones&email=${email}&ms_ID=${ms_ID}`;
    //console.log(ms_ID);



    request.open("GET", url, true); // synchronous
    request.send();
}

function add_mood(){

    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            console.log(obj)
            if (obj.update_mood_status == "successful"){
                document.getElementById("update_status").innerHTML = "<span style='background-color: green;color: white; margin-bottom:10px;'>New Mood Added!</span>";
            }
            else {
                document.getElementById("update_status").innerHTML = "<span style='color: red;'>An error occured</span>";         
            }
        }
    }


    var radios = document.getElementsByName("mood");

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            var mood = radios[i].value;
          break;
        }
    }

    var email = sessionStorage.getItem('email');
    var today = new Date();
    var date = today.toISOString().substring(0, 10);


    if(mood==""){
        document.getElementById("update_mood_status").innerHTML = "<span style='color: red;'>Please fill in the input!</span>";         
        console.log("error");
        return;
    }else{
        if (mood == 1){
            document.getElementById("update_mood_status").innerHTML = "<div style='color:red'>Cheer Up Pal!! Things will get better!!<br><a href='home.html' class='text-center'>Go read some articles and relax!</a></div>";
        }else if (mood == 2){
            document.getElementById("update_mood_status").innerHTML = "<div style='color:orange'> Don't Worry Pal!! Tough Time Don't Last, But Tough People Do! Push Through! <br> <a href='relax.html' class='text-center'>Relax with some music!</a></div>";
        }else if (mood == 3){
            document.getElementById("update_mood_status").innerHTML = "<div style='color:grey'>WAKE UP WAKE UP!<br><a href='tracking.html' class='text-center'> No time already, look at all your countdowns!</a></div>";
        }else if (mood == 4){
            document.getElementById("update_mood_status").innerHTML = "<div style='color:goldenrod'> Stay Happy, My Friend!<br><a href='news.html' class='text-center'>Catch up with some news!</a></div>";
        }else if (mood == 5){
            document.getElementById("update_mood_status").innerHTML = "<div style='color:#add8e6'>Good job! You deserve a break!!<br><a href='relax.html' class='text-center'>Go watch some videos!</a></div>";
        };
        var url = `./php/userAuth.php?action=addMood&email=${email}&mood=${mood}&date=${date}`;

    }


    //console.log(radios, email,mood, date)
    //console.log(url)


    request.open("GET", url, true); // synchronous
    request.send();
}

function display_mood(){
    var request = new XMLHttpRequest(); // Prep to make an API call
    var str = "";
    var data =[];
    var label=[];
    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            mood_arr = obj.moods;
            if (obj.moodRetrieve_status == "successful"){
            
                    for(mood of mood_arr){

                    // mood_index = mood["mood"];
                    // data.push(mood_index);

                    date = (mood.date);
                    // label_date = (date.toString()).slice(4,10)
                    label.push(date);
                    
                    var point ={x:mood.date, y:mood.mood};
                    data.push(point);
                    

                }
            }
            
        }
    }

    var email = sessionStorage.getItem('email');

    var url = `./php/userAuth.php?action=getMood&email=${email}`;
    request.open("GET", url, true); // synchronous
    request.send();

    
    renderChart(data,label);

}

function renderChart(data, label){
    console.log(label);

    var yLabels = {
        1 : 'Unhappy', 2 : 'Worried', 3 : 'Sleepy', 4 : 'Contented',  5: 'Relaxed'
    }
    
    // var data =label;
    // for(var data_pint in label){
    //     console.log(data_pint)
    // }
    var ctx = document.getElementById("chart").getContext('2d');
    // console.log(data);


    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label:false,
                data: data,
                showLine:false,
                fill:false,
                pointBackgroundColor: function(yLabels) {
                    var index = yLabels.dataIndex;
                    var value = yLabels.dataset.data[index].y;
                    return value == 1 ? 'red' :  // draw negative values in red
                        value == 2 ? 'orange' :    // else, alternate values in blue and green
                        value == 3 ? 'grey':
                        value == 4 ? 'yellow':
                        "#add8e6";
                },
                pointRadius:10,
                pointStyle:'circle'

            }],
        },
        
        options: {
            responsive: true,
            maintainAspectRatio: false,
            events: [],
            legend:{
                display:false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 50
                }
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time:
                    {
                        unit: 'day',
                        // parser:'MM',
                        displayFormats: { month: 'MMM DD' },
                        unitStepSize: 1,
                    },
                    ticks:{
                        source: 'label',
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 6,
                        min: 0,
                        stepSize: 1,
                        callback: function(value, index, values) {
                            return yLabels[value];
                        }
                    }
                }]
            }
        },
        
     });
}
