<?php
class ConnectionManager {
    public function getConnection() {
        $servername = 'localhost';
        $dbname = 'stay_afloat';
        $username = 'root';
        $password = '';
        
        $dsn  = "mysql:host=$servername;dbname=$dbname";
        $pdo = new PDO($dsn, $username, $password);  
        
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  

        return $pdo;
    }
}
?>