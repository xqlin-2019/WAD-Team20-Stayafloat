function login_check() {
    let status = sessionStorage.getItem('login_status');
    if (status != 'successful'){
        window.location.href = "../UserAuth/login.html?";
    }
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
            console.log(obj)
            if (obj.update_status == "successful"){
                document.getElementById("update_status").innerHTML = "<span style='background-color: green; color: white;'>New Milestone Added!</span>";
            }
            else {
                document.getElementById("update_status").innerHTML = "<span style='color: red;'>Error occurs</span>";         
            }
        }
    }
    var email = sessionStorage.getItem('email');
    var description = document.getElementById("milestone_desc").value;
    var date = document.getElementById("due_date").value;

    console.log(description, date);
    var url = `../UserAuth/userAuth.php?action=addMilestone&email=${email}&description=${description}&date=${date}`;
    request.open("GET", url, true); // synchronous
    request.send();
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
            $milestones_arr = obj.milestones
            if (obj.retrieve_status == "successful"){
                console.log("hello");
                for($milestone of $milestones_arr){
                    console.log($milestone);
                    // console.log($milestone.date);
                    var date = $milestone.date;
                    var count_down = "";
                    var description = $milestone.description;
                    

                    str+= `<div class="card text-white" style="max-width: 18rem; background-color: #102B72;">
                        <div class="card-body">
                        <h1 class="card-title text-uppercase">Primary card title</h1>
                        <p class="card-text">${description}</p>
                        </div>
                    </div>`;
                }
                document.getElementById("milestone_cards").innerHTML = str;
            }
        }
    }
    var email = sessionStorage.getItem('email');

    // console.log(description, date);
    var url = `../UserAuth/userAuth.php?action=getMilestones&email=${email}`;
    request.open("GET", url, true); // synchronous
    request.send();


}

function count_down(){
    var today = new Date();

}