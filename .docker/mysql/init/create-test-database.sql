CREATE DATABASE IF NOT EXISTS `wfrepent_repentance_test`;

CREATE USER 'wfrepent_repentance_test'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON wfrepent_repentance_test.* TO 'wfrepent_repentance_test'@'%';
