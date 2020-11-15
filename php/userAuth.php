<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    // Load Class and DAO 
    spl_autoload_register(function($class){
            require_once "../model/$class.php";
    });

    if(isset($_GET["action"])) {
        $action = $_GET["action"];
        $result = [];
        if ($action == "login") {
            $result = userLogin();
        } 
        else if ($action == "register") {
            $result = userRegister();
        }
        else if ($action == "exist") {
            $result = userExist();
        }
        else if ($action == "updatePreference") {
            $result = updatePreference();
        }
        else if ($action == "updatePassword") {
            $result = updatePassword();
        }
        else if ($action == "addMilestone") {
            $result = addMilestone();
        }
        else if ($action == "getMilestones") {
            $result = getMilestones();
        }
        else if ($action == "removeMilestones") {
            $result = removeMilestones();
        }
        else if ($action == "addMood") {
            $result = addMood();
        }
        else if ($action == "getMood") {
            $result = getMood();
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($result);
    }


    function userRegister() {
        $email = $_GET["email"];
        $password = $_GET["password"];
        $sur_name = $_GET["sur_name"];
        $given_name = $_GET["given_name"];
        $faculty = $_GET["faculty"];
        $preference = $_GET["preference"];
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $user = new User($email, $hashed,$sur_name,$given_name,$faculty,$preference);
        $dao = new UserDAO();
        $status = $dao->add($user);
        if($status){
            return array("register_status" => "successful","email" => $email);
        }
        else{
            return array("register_status" => "fail","email" => $email);
        }
    }


    function userLogin(){
        $email = $_GET["email"];
        $password = $_GET["password"];
        $dao = new UserDAO();
        $hashed = $dao->getHashedPassword($email);
        $profile = $dao->getProfile($email);
        $status = password_verify($password,$hashed);
        if($status){
            return array("login_status" => "successful","email" => $email, "profile" => $profile);
        }
        else{
            return array("login_status" => "fail","email" => $email);
        }
    }

    function userExist(){
        $email = $_GET["email"];
        $dao = new UserDAO();
        $exist = $dao->getHashedPassword($email);
        if($exist == False){
            return array("already_exist" => "false","email" => $email);
        }
        else{
            return array("already_exist" => "true","email" => $email);
        }
    }

    function updatePreference() {
        $email = $_GET["email"];
        $preference = $_GET["preference"];
        $dao = new UserDAO();
        $status = $dao->updatePreference($email,$preference);
        if($status){
            return array("update_status" => "successful","email" => $email);
        }
        else{
            return array("update_status" => "fail","email" => $email);
        }
    }

    function updatePassword() {
        $email = $_GET["email"];
        $password = $_GET["password"];
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $dao = new UserDAO();
        $status = $dao->updatePassword($email,$hashed);
        if($status){
            return array("update_status" => "successful","email" => $email);
        }
        else{
            return array("update_status" => "fail","email" => $email);
        }
    }

    function addMilestone() {
        $email = $_GET["email"];
        $description = $_GET["description"];
        $date = $_GET["date"];

        $dao = new UserDAO();
        $status = $dao->addMilestone($email,$description, $date);
        if($status){
            return array("update_status" => "successful","email" => $email);
        }
        else{
        return array("update_status" => "fail","email" => $email);
        }
    }

    function getMilestones(){
        $email = $_GET["email"];
        $dao = new UserDAO();
        $milestones = $dao->getMilestones($email);
        if($milestones){
            // var_dump($milestones);
            return array("retrieve_status" => "successful","email" => $email, "milestones" => $milestones);
        }
        else{
            return array("retrieve_status" => "fail","email" => $email);
        }
    }

    function removeMilestones(){
        $email = $_GET["email"];
        $ms_ID = $_GET["ms_ID"];
        //console.log($email,$ms_ID);
        $dao = new UserDAO();
        $status = $dao->removeMilestones($email, $ms_ID);
        if($status){
            // var_dump($milestones);
            return array("delete_status" => "successful","email" => $email);
        }
        else{
            return array("delete_status" => "fail","email" => $email);
        }
        console.log($status);
    }

    function addMood() {
        $email = $_GET["email"];
        $mood = $_GET["mood"];
        $date = $_GET["date"];
        $entry = $_GET["entry"];


        $dao = new UserDAO();
        $status = $dao->addMood($email,$mood, $date, $entry);
        if($status){
            return array("update_mood_status" => "successful","email" => $email);
        }
        else{
        return array("update_mood_status" => "fail","email" => $email);
        }
    }

    function getMood(){
        $email = $_GET["email"];
        $dao = new UserDAO();
        $moods = $dao->getMood($email);
        if($moods){ 
            return array("moodRetrieve_status" => "successful","email" => $email, "moods" => $moods);
        }
        else{
            return array("moodRetrieve_status" => "fail","email" => $email);
        }
    }
?>
