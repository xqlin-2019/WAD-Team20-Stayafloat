// Login in check
function login_check() {
    let status = sessionStorage.getItem('login_status');
    if (status != 'successful'){
        window.location.href = "../login.html?";
    }
}

// User Log out
function clear_session() {
    sessionStorage.clear();
    window.location.href = "../login.html?";
  }

// User Login
function process_login(){
    var request = new XMLHttpRequest(); 

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); 
            if (obj.login_status == "successful"){
                sessionStorage.setItem('login_status', 'successful')
                sessionStorage.setItem('email', obj.email)
                sessionStorage.setItem('password', password)
                sessionStorage.setItem('sur_name', obj.profile.sur_name)
                sessionStorage.setItem('given_name', obj.profile.given_name)
                sessionStorage.setItem('faculty', obj.profile.faculty)
                sessionStorage.setItem('preference', obj.profile.preference)
                window.location.href = "../Profile.html?";          
            }
        }
    }

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var url = `../php/userAuth.php?action=login&email=${email}&password=${password}`;

    request.open("GET", url, true); // synchronous
    request.send();
  }


// User Registration
  function process_register(){
    if (check_empty_input()){
        console.log('Please fill up all the input')
        return;
    }

    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            if (obj.register_status == "successful"){
                sessionStorage.setItem('login_status', 'successful')
                process_login();
            }
        }
    }

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var sur_name = document.getElementById("sur_name").value;
    var given_name = document.getElementById("given_name").value;
    var faculty = document.getElementById("faculty").value;
    var preference = getPreference();
    var url = `../php/userAuth.php?action=register&email=${email}&password=${password}&sur_name=${sur_name}&given_name=${given_name}&faculty=${faculty}&preference=${preference}`;
    
    request.open("GET", url, true); // synchronous
    request.send();
  }

  function check_empty_input() {
    var empty = false;
    var error_str = '';
    if (document.getElementById("email").value == "") {
        error_str += "<span style='color: red;'>Please enter your email</span></br>";
        empty = true;}

    if (document.getElementById("password").value == "") {
        error_str += "<span style='color: red;'>Please enter your password</span></br>";
        empty = true;}

    if (document.getElementById("password2").value == "") {
        error_str += "<span style='color: red;'>Please confirm your password</span></br>";
        empty = true;}

    if (document.getElementById("sur_name").value == "") {
        error_str += "<span style='color: red;'>Please enter your sur name</span></br>";
        empty = true;}

    if (document.getElementById("given_name").value == "") {
        error_str += "<span style='color: red;'>Please enter your given name</span></br>";
        empty = true;}

    if (document.getElementById("faculty").value == "") {
        error_str += "<span style='color: red;'>Please enter your email</span></br>";
        empty = true;}

    document.getElementById("register_status").innerHTML = error_str;
    return empty;
  }

  function check_exist(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText);
            if (obj.already_exist == "true"){
                document.getElementById("emailHelp").innerHTML = "<span style='color: red;'>This email has been used, try another one.</span>";
                document.getElementById("register_btn").disabled = true;
            }
            else {
                document.getElementById("emailHelp").innerHTML = "<span style='color: green;'>This email is not taken, can be use.</span>";
                document.getElementById("register_btn").disabled = false;             
            }
            console.log(obj);
        }
    }

    var email = document.getElementById("email").value;
    var url = `../php/userAuth.php?action=exist&email=${email}`;

    request.open("GET", url, true); // synchronous
    request.send();
  }

  function check_password() {
    var password_1 = document.getElementById("password").value;
    var password_2 = document.getElementById("password2").value;
    
    if (password_1 == password_2) {
        document.getElementById("register_btn").disabled = false;
        document.getElementById("register_status").innerHTML ="";
    }
    else{
        document.getElementById("register_btn").disabled = true;
        document.getElementById("register_status").innerHTML = "<span style='color: red;'>Your password does not match!</span>";  
    }
  }
  
  function display_profile() {
    if (sessionStorage.getItem('login_status') == 'successful'){
        document.getElementById("email").innerText = sessionStorage.getItem('email');
        document.getElementById("password").innerText = sessionStorage.getItem('password');
        document.getElementById("sur_name").innerText = sessionStorage.getItem('sur_name');
        document.getElementById("given_name").innerText = sessionStorage.getItem('given_name');
        document.getElementById("faculty").innerText = sessionStorage.getItem('faculty');
        
        var preferences = sessionStorage.getItem('preference');
        var topics = preferences.split(',');
        var str = ``;
        for (each of topics){
            str += `<h1>${each}</h1>`;
        }
        document.getElementById("preference").innerHTML = str;        
    }
  }

  function getPreference() {
    var item_check_list = document.getElementsByClassName('form-check-input');
    
    // Initial return result variables
    var preference_str = "";
    
    // Loop through every checkbox element
    for (each of item_check_list) {

        // If the item have been selected
        if (each.checked == true) {
            // Update the result
            preference_str += `${each.value},`;
        }
    }
    //console.log(preference_str);
    return preference_str.slice(0, -1);;
}

function display_preference() {
    var preferences = sessionStorage.getItem('preference');
    if (preferences == "") {
        return
    }
    var topics = preferences.split(',');
    console.log(topics);
    for (each of topics){
        var id = `cb_${each}`;
        console.log(id);
        document.getElementById(id).checked =true;
    }
}

function check_exist(){
    //event.preventDefault();
    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            if (obj.already_exist == "true"){
                document.getElementById("emailHelp").innerHTML = "<span style='color: red;'>This email has been used, try another one.</span>";
                document.getElementById("register_btn").disabled = true;
            }
            else {
                document.getElementById("emailHelp").innerHTML = "<span style='color: green;'>This email is not taken, can be use.</span>";
                document.getElementById("register_btn").disabled = false;             
            }
            console.log(obj);
        }
    }

    var email = document.getElementById("email").value;

    var url = `../php/userAuth.php?action=exist&email=${email}`;
    request.open("GET", url, true); // synchronous
    request.send();
  }

  function update_preference(){
    //event.preventDefault();
    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            if (obj.update_status == "successful"){
                document.getElementById("update_status").innerHTML = "<span style='color: green;'>News Preference updated </span>";
                sessionStorage.setItem('preference', new_preference)
            }
            else {
                document.getElementById("update_status").innerHTML = "<span style='color: red;'>Error occurs</span>";         
            }
            console.log(obj);
        }
    }
    var email = sessionStorage.getItem('email');
    var new_preference  = getPreference();
    
    var url = `../php/userAuth.php?action=updatePreference&email=${email}&preference=${new_preference}`;
    request.open("GET", url, true); // synchronous
    request.send();
  }

  function check_password_2() {
    var error = false;
    var password_old = document.getElementById("password_old").value;
    var password_system = sessionStorage.getItem('password');
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    var error_str = "";
    
    if (password_old ==''){
        error_str += "<span style='color: red;'>Please enter your old password</span></br>";
        error = true;}

    if (password_old != '' && password_old != password_system){
        error_str += "<span style='color: red;'>You have enter a invalid old password!</span></br>";
        error = true;}

    if (password == ''){
        error_str += "<span style='color: red;'>Please enter your new password</span></br>";
        error = true;}
    
    if (password == ''){
        error_str += "<span style='color: red;'>Please confirm your new password</span></br>";
        error = true;}

    if (password != password2){
        error_str += "<span style='color: red;'>Your new password does not match!</span></br>";
        error = true;}
    
    document.getElementById("update_status").innerHTML = error_str;
    return error;
  }

  function update_password(){
    //event.preventDefault();
    if (check_password_2()){
        return;
    }
    var request = new XMLHttpRequest(); // Prep to make an API call

    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            if (obj.update_status == "successful"){
                document.getElementById("update_status").innerHTML = "<span style='color: green;'>Your password has been changed</span>";
                sessionStorage.setItem('password', new_password)
            }
            else {
                document.getElementById("update_status").innerHTML = "<span style='color: red;'>Error occurs</span>";         
            }
            console.log(obj);
        }
    }
    var email = sessionStorage.getItem('email');
    var new_password  = document.getElementById("password2").value;;
    
    var url = `../php/userAuth.php?action=updatePassword&email=${email}&password=${new_password}`;
    request.open("GET", url, true); // synchronous
    request.send();
  }
