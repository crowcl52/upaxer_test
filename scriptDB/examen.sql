CREATE TABLE `examen`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO users (name, email, password, phone)
VALUES ('Eduardo Sanchez', 'crowcl52@hotmail.com', '123456', '5555555555');

select * from examen.users

