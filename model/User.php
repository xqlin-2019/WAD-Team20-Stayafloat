<?php 
class User {
    private $email;
    private $hashed_password;
    private $sur_name;
    private $given_name;
    private $faculty;
    private $preference;
    
    function __construct($email,$hashed_password,$sur_name,$given_name,$faculty,$preference){
        $this->email = $email;
        $this->hashed_password = $hashed_password;
        $this->sur_name = $sur_name;
        $this->given_name = $given_name;
        $this->faculty = $faculty;
        $this->preference = $preference;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getHashedPassword() {
        return $this->hashed_password;
    }

    public function getSurName() {
        return $this->sur_name;
    }
    
    public function getGivenName() {
        return $this->given_name;
    }

    public function getFaculty() {
        return $this->faculty;
    }

    public function getPreference() {
        return $this->preference;
    }
}
?>
