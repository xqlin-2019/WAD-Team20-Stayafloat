<?php
    spl_autoload_register(function($class){
        require_once $class . ".php";
    });

    class UserDAO{
        
        function add($user) {
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();

            $email = $user->getEmail();
            $hashed_password = $user->getHashedPassword();
            $sur_name = $user->getSurName();
            $given_name = $user->getGivenName();
            $faculty = $user->getFaculty();
            $preference = $user->getPreference();
            
            $sql = "insert into users (email, hashed_password, sur_name, given_name, faculty, preference) values (:email, :hashed_password, :sur_name, :given_name, :faculty, :preference)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email",$email, PDO::PARAM_STR);
            $stmt->bindParam(":hashed_password",$hashed_password, PDO::PARAM_STR);
            $stmt->bindParam(":sur_name",$sur_name, PDO::PARAM_STR);
            $stmt->bindParam(":given_name",$given_name, PDO::PARAM_STR);
            $stmt->bindParam(":faculty",$faculty, PDO::PARAM_STR);
            $stmt->bindParam(":preference",$preference, PDO::PARAM_STR);
            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function getHashedPassword($email){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from users where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            if($row = $stmt->fetch()){
                
               $hashed_password = $row["hashed_password"];

            } else {
                $hashed_password = FALSE;
            }

            $stmt->closeCursor();
            $pdo = null;

            return $hashed_password;
        }

        function getProfile($email){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from users where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            if($row = $stmt->fetch()){
                
               $profile = array("hashed_password" => $row["hashed_password"],
                                "sur_name" => $row["sur_name"],
                                "given_name" => $row["given_name"],
                                "faculty" => $row["faculty"],
                                "preference" => $row["preference"]);

            } else {
                $profile = FALSE;
            }

            $stmt->closeCursor();
            $pdo = null;

            return $profile;
        }

        function updatePassword($email,$hashed_password){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "update users set hashed_password = :hashed_password where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":hashed_password", $hashed_password, PDO::PARAM_STR);
            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function updatePreference($email,$preference){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "update users set preference = :preference where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":preference", $preference, PDO::PARAM_STR);
            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function addMilestone($email,$description, $date){
            
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();

            $sql = "insert into milestones (email, description, date) values (:email, :description, :date)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":description", $description, PDO::PARAM_STR);
            $stmt->bindParam(":date", $date, PDO::PARAM_STR);

            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function getMilestones($email){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select description, date, ms_ID from milestones where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            $milestones = [];
            while($row = $stmt->fetch()){

               $milestone = array("description" => $row["description"],
                                "date" => $row["date"],
                                "ms_ID" => $row["ms_ID"]);
                $milestones[] = $milestone;

            }
            $stmt->closeCursor();
            $pdo = null;
            return $milestones;
        }
        function removeMilestones($email, $ms_ID){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "delete from milestones where email= :email and ms_ID= :ms_ID";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":ms_ID", $ms_ID, PDO::PARAM_INT);

            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function addMood($email,$mood, $date,$entry){
            
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();

            $sql = "insert into moods (email, mood, date, entry) values (:email, :mood, :date, :entry)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":mood", $mood, PDO::PARAM_STR);
            $stmt->bindParam(":date", $date, PDO::PARAM_STR);
            $stmt->bindParam(":entry", $entry, PDO::PARAM_STR);


            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function getMood($email){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select mood, date, mood_ID, entry from moods where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            $moods = [];
            while($row = $stmt->fetch()){ 

               $mood = array("mood" => $row["mood"],
                                "date" => $row["date"],
                                "mood_ID" => $row["mood_ID"],
                                "entry" => $row["entry"]);
                $moods[] = $mood;

            }
            $stmt->closeCursor();
            $pdo = null;
            return $moods;
        }
    }
?>
