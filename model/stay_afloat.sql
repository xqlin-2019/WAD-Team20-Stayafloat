CREATE DATABASE IF NOT EXISTS `stay_afloat` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `stay_afloat`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) NOT NULL,
  `hashed_password` varchar(256) NOT NULL,
  `sur_name` varchar(50) NOT NULL,
  `given_name` varchar(50) NOT NULL,
  `faculty` varchar(50) NOT NULL,
  `preference` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `milestones`;
CREATE TABLE IF NOT EXISTS `milestones` (
  `ms_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `description` varchar(256) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`ms_ID`),
  FOREIGN KEY (`email`) REFERENCES `user`(`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `moods`;
CREATE TABLE IF NOT EXISTS `moods` (
  `mood_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `mood` char(1) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`mood_ID`),
  FOREIGN KEY (`email`) REFERENCES `user`(`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `bookmarks`;
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `bookmark_ID` int NOT NULL,
  `email` varchar(50) NOT NULL,
  `description` char(1) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`bookmark_ID`),
  FOREIGN KEY (`email`) REFERENCES `user`(`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


COMMIT;
