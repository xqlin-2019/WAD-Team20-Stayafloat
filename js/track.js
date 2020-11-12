function login_check() {
    let status = sessionStorage.getItem('login_status');
    if (status != 'successful'){
        window.location.href = "./login.html";
    }
}

function clear_session() {
    sessionStorage.clear();
    window.location.href = "../login.html?";
}

function process_login(){
    var request = new XMLHttpRequest(); 

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); 
            if (obj.login_status == "successful"){
                sessionStorage.setItem('login_status', 'successful')
                sessionStorage.setItem('email', obj.email);      
            }
        }
    }
  }

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
    login_check();
    process_login();

    var request = new XMLHttpRequest(); // Prep to make an API call
    var str = "";
    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            console.log(obj)
            milestones_arr = obj.milestones
            if (obj.retrieve_status == "successful"){
                console.log("hello");
                for(milestone of milestones_arr){
                    console.log(milestone);
                    // console.log(milestone.date);
                    var date = milestone.date;
                    var count_down = countdown(date);
                    var description = milestone.description;
                    //console.log(count_down);
                    

                    str+= `<div class="card" style="max-width: 18rem; min-height:10rem;">
                        <div class="card-body text-white" style="padding:0">
                        <h1 class="card-title text-uppercase" style=" background-color: #102B72; padding:10px; ">${count_down} DAYS LEFT</h1>
                        <p class="card-text" style="color:black">${description}</p>
                        </div>
                    </div>`;
                }
                document.getElementById("milestone_cards").innerHTML = str;
            }
        }
    }
    var email = sessionStorage.getItem('email');

    // console.log(description, date);
    var url = `./php/userAuth.php?action=getMilestones&email=${email}`;
    request.open("GET", url, true); // synchronous
    request.send();
}

function display_mood(){
    var chart = new CanvasJS.Chart("chartContainer",
    {	
        axisX:{
        valueFormatString: "DD MMM",
        },
        axisY:{
        interval: 1
        },
        data: [
        {        
            type: "splineArea",
            dataPoints: [
            {x: new Date(2018, 11, 24), y: 1},
            {x: new Date(2018, 11, 25), y: 2},     
            {x: new Date(2018, 11, 27), y: 2},     
            ]
        }             
        ]
    });

    chart.render();

}

