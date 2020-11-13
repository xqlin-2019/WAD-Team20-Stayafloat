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
    <h1 style="text-align: left; margin-left: 131px; ">Week ${week}</h1>
    <div class="progress p_bar" style="height: 25px;" >
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
        style="width: ${progressvalue} " aria-valuenow="${week}" aria-valuemin="1" aria-valuemax="15">${progressvalue}</div>
    </div>    `

    document.getElementById('progressbar').innerHTML = prog_str;
    console.log(progressdiv);


}

