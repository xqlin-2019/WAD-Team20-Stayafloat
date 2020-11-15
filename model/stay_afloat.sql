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

INSERT INTO users (email, hashed_password, sur_name, given_name, faculty, preference) VALUES ("xqlin.2019@sis.smu.edu.sg","$2y$10$M.KxKSYSkpu8B1rvfY0SlOFRLBMzJ.yf44xF8tg7FYmH1z1OGkwfO","Lin","Xiongqing","Information Systems","Business,Health,Science");
INSERT INTO users (email, hashed_password, sur_name, given_name, faculty, preference) VALUES ("jared.ng.2019@sis.smu.edu.sg","$2y$10$M.KxKSYSkpu8B1rvfY0SlOFRLBMzJ.yf44xF8tg7FYmH1z1OGkwfO","Ng","Jared","Information Systems","Business,Health,Sports");
INSERT INTO users (email, hashed_password, sur_name, given_name, faculty, preference) VALUES ("demo@smu.edu.sg","$2y$10$M.KxKSYSkpu8B1rvfY0SlOFRLBMzJ.yf44xF8tg7FYmH1z1OGkwfO","WAD2","STUDENT","Information Systems","Business,Health,Science,Technology");


INSERT INTO milestones (email, description, date) VALUES ("demo@smu.edu.sg","WAD2 FINAL","2020-11-26");
INSERT INTO milestones (email, description, date) VALUES ("demo@smu.edu.sg","SPM FINAL","2020-12-02");
INSERT INTO milestones (email, description, date) VALUES ("demo@smu.edu.sg","Holiday!!!!","2020-12-03");
INSERT INTO milestones (email, description, date) VALUES ("demo@smu.edu.sg","Merry Christmas!!!!","2020-12-25");
INSERT INTO milestones (email, description, date) VALUES ("demo@smu.edu.sg","BYEBYE 2020!!!!","2021-01-01");
INSERT INTO milestones (email, description, date) VALUES ("demo@smu.edu.sg","Ang Pao!!!!","2021-02-12");

INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","2","2020-11-01");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","3","2020-11-02");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","4","2020-11-03");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","4","2020-11-04");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","5","2020-11-05");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","2","2020-11-06");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","5","2020-11-07");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","4","2020-11-08");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","4","2020-11-09");
INSERT INTO moods (email, mood, date) VALUES ("demo@smu.edu.sg","5","2020-11-10");


COMMIT;
