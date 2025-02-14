# Connecting to the UF MySQL Database for LearnOS Backend  

## Prerequisites  
Ensure you meet the following requirements before proceeding:  
- Be connected to **UF WiFi** or use **Cisco Secure Client** to connect to the **UF VPN**.  

## Setup Instructions  

### 1. Configure Environment Variables (Windows)  
Open PowerShell and run the following commands, replacing `{MYSQLUSERNAME}` and `{MYSQLPASSWORD}` with your MySQL credentials for UF servers:  

```powershell
$env:DB_USERNAME="{MYSQLUSERNAME}"
$env:DB_PASSWORD="{MYSQLPASSWORD}"
```


## Set Up SSH Tunnel
Run the following command in your terminal, replacing username with your UF username:


```ssh -L 3380:mysql.cise.ufl.edu:3306 username@storm.cise.ufl.edu```


## Install Spring Boot Extension Pack in VS Code
Open VS Code
Install the Spring Boot Extension Pack from the Extensions Marketplace


## Run the LearnOS Backend
Open the Spring Boot Dashboard in VS Code
Locate and run the learnOS-backend app
