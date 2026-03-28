# Setting up MySQL Workbench

To connect your Spring Boot application to a real MySQL database instead of the temporary memory database, follow these steps:

## 1. Create the Database in MySQL Workbench
1. Open **MySQL Workbench** and connect to your local server (usually `Local instance 3306` with user `root`).
2. Open a new SQL Query tab (File -> New Query Tab).
3. Paste and execute the following commands:

```sql
-- Create the new database
CREATE DATABASE equipment_borrowing_db;

-- Switch to the new database
USE equipment_borrowing_db;

-- Create a dedicated user for your app (Optional but recommended)
-- Replace 'password123' with a secure password
CREATE USER 'springuser'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON equipment_borrowing_db.* TO 'springuser'@'localhost';
FLUSH PRIVILEGES;

-- NOTE: You do NOT need to manually create the `users` table!
-- Spring Boot's Hibernate will automatically create the table
-- as long as we set `spring.jpa.hibernate.ddl-auto=update` in application.properties
```
4. Click the "lightening bolt" execute button to run the script.

## 2. Add MySQL Driver to Spring Boot
You need to add the MySQL connector to your `pom.xml`. Open the file and add this block inside your `<dependencies>` section:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 3. Update application.properties
Open `src/main/resources/application.properties` and replace your H2 configuration with this MySQL configuration:

```properties
spring.application.name=equipmentborrowingsystem
server.port=8080

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/equipment_borrowing_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
# Change this to your actual MySQL root password (or use springuser/password123 if you created the user above)
spring.datasource.password=your_mysql_password 

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

# CORS configuration to allow local React app
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
```

Once you do this, restart your Spring Boot application and it will automatically connect to MySQL and generate the `users` table for you!
