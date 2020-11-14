function get_Week() {

    var today = new Date();
    var curr_date = new Date((today.getMonth()+1)+'/'+today.getDate()+'/' + today.getFullYear());
    console.log(typeof(curr_date));
    var start_date = new Date("08/17/2020");
    console.log(typeof(start_date));

    var diff_in_time = curr_date.getTime() - start_date.getTime();
    var diff_in_days = diff_in_time / (1000 * 3600 * 24);
    console.log(diff_in_days);

    var week = 0;
    var progressvalue = "0%"
    if(diff_in_days < 5){
        week = 1;
        progressvalue = "6.5%";
    }
    else{
        week = Math.ceil(diff_in_days/7);
        console.log(week);
        percent = week * 6.5;
        console.log(typeof(percent));
        progress_str = percent.toString();
        console.log(progress_str);
        progressvalue = progress_str + "%";
    }



    var progressdiv = document.getElementById("progressbar");
    progressdiv.innerHTML = "";
    prog_str = ''

    prog_str += ` 
    <h1 style="text-align: center; ">Week ${week}</h1>
    <div class="progress p_bar" style="height: 25px;" >
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
        style="width: ${progressvalue} " aria-valuenow="${week}" aria-valuemin="1" aria-valuemax="15">${progressvalue}</div>
    </div>    `

    document.getElementById('progressbar').innerHTML = prog_str;
    console.log(progressdiv);


}


// function get_milestone() {
//     var request = new XMLHttpRequest(); // Prep to make an API call
//     var str = "";
//     request.onreadystatechange = function() {
//         if( this.readyState == 4 && this.status == 200 ) {
//             var obj = JSON.parse(this.responseText); // JS JSON object
//             milestones_arr = obj.milestones
//             if (obj.retrieve_status == "successful"){
//                 for(milestone of milestones_arr){
//                     //console.log(milestone);
//                     // console.log(milestone.date);
//                     var date = milestone.date;
//                     var count_down = countdown(date);
//                     var description = milestone.description;
//                     //console.log(count_down);

//                     str+= `<div class="card">
//                             <div class="card-body" style="padding:0">
//                                 <h1 class="card-title text-uppercase  text-white" style=" background-color: #102B72; padding:20px;">${count_down} DAYS LEFT</h1>
//                                 <p class="card-text" style="color:black; font-size:large">${description}</p>

//                             </div>
//                          </div>`;
//                 }
//                 document.getElementById("milestone_cards").innerHTML = str;
//                 //console.log(str)
//             }
            
//         }
//     }

//     var email = sessionStorage.getItem('email');

//     // console.log(description, date);
//     var url = `./php/userAuth.php?action=getMilestones&email=${email}`;
//     request.open("GET", url, true); // synchronous
//     request.send();
// }


