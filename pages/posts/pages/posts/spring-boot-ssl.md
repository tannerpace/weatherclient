---
title: Adding SSL to a Spring Boot Project and Removing the Load Balancer to Save Costs
date: 2024-09-02
description: A guide to configuring SSL directly in your Spring Boot application and removing a load balancer to reduce costs.
tag: cloud computing
tags:
  [
    AWS,
    Spring Boot,
    SSL,
    HTTPS,
    cost optimization,
    cloud computing,
    devops,
    load balancer
  ]
author: [Tanner Bleakley]
---

## Adding SSL to a Spring Boot Project and Removing the Load Balancer to Save Costs

```
Setting Up SSL Directly on EC2 for kiteninja: Cutting Costs by Eliminating the Load Balancer

Recently, I worked on optimizing the infrastructure for my kiteninja project by eliminating the cost of an AWS Application Load Balancer (ALB). Instead of routing SSL through the ALB, I enabled SSL termination directly on the EC2 instance hosting my Spring Boot application. This change significantly cut costs while maintaining performance. Here’s how I did it, why I chose a t3a.medium instance, and the cost savings compared to using an ALB.

Why Eliminate the Application Load Balancer?

The ALB is often a default choice for handling SSL termination, but it adds unnecessary overhead in small to medium-sized projects. For my project, I noticed that the ALB costs were more than the EC2 instance itself. By removing the ALB and enabling SSL directly on the EC2 instance, I could save over 50% on infrastructure costs while maintaining the same functionality.

Choosing the Right EC2 Instance

When I first tested the setup with a t3.micro instance (the smallest option), it worked but I quickly ran into memory limitations. Handling both the Spring Boot application and the SSL encryption (via Certbot) required more resources than the smallest instance could provide.

After evaluating my needs, I upgraded to a t3a.medium instance. This instance provides 2 vCPUs and 4 GB of RAM, which gave me enough headroom to run the application, MySQL database, and SSL encryption without bottlenecks.

Why a t3a.medium?

Here’s why the t3a.medium is a great choice:

Burstable Performance: The t3 instance types are burstable, meaning they provide baseline performance with the ability to handle occasional spikes. For small and medium workloads, this is cost-effective.

More RAM: With 4 GB of RAM, the t3a.medium has more than enough memory to handle SSL termination and run a Java Spring Boot application alongside MySQL.

Cheaper than ALB: The t3a.medium instance costs around $0.0336/hour, which totals about $24.19/month. In contrast, using a t3.micro plus an ALB would cost significantly more. An ALB alone can cost around $16/month (excluding data transfer costs), so switching to a t3a.medium without an ALB is about 50% cheaper overall.


Cost Breakdown

The t3a.medium instance was not only able to handle my workload, but also reduced my overall AWS bill compared to the smaller instance paired with an ALB.

Setting It Up: Step-by-Step

EC2 Configuration with Terraform

Here’s how I configured my EC2 instance using Terraform. The following setup provisions an EC2 instance, installs necessary software, and enables SSL termination directly on the instance.

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "kiteninja_app" {
  ami                    = "ami-06f555bf2f102b63c"  # Amazon Linux 2 AMI
  instance_type          = "t3a.medium"
  key_name               = "api_ec2_ssh_key"
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.kiteninja_sg.id]

  user_data = <<-EOF
  #!/bin/bash
  sudo yum update -y

  # Install Java 17
  sudo amazon-linux-extras install java-openjdk17 -y

  # Install MySQL Server
  sudo yum install -y mysql-server
  sudo systemctl start mysqld
  sudo systemctl enable mysqld

  # Set MySQL root password and create api_schema database
  sudo mysql --execute="ALTER USER 'root'@'localhost' IDENTIFIED BY 'ExamplePassword123!';"
  sudo mysql --execute="CREATE DATABASE IF NOT EXISTS api_schema;"

  # Install Git, Maven, and Certbot for SSL
  sudo yum install -y git maven epel-release certbot

  # Obtain SSL certificate with Certbot for api.kitesurf.ninja
  sudo certbot certonly --standalone -d api.kitesurf.ninja

  # Convert SSL certificate to PKCS12 format for Spring Boot
  sudo openssl pkcs12 -export -in /etc/letsencrypt/live/api.kitesurf.ninja/fullchain.pem \
    -inkey /etc/letsencrypt/live/api.kitesurf.ninja/privkey.pem \
    -out keystore.p12 -name springboot -passout pass:ExamplePassword123!

  # Set up the application (clone repo, build it)
  APP_DIR="/opt/kiteninja-app"
  REPO_URL="https://github.com/tannerpace/api.git"
  SUBDIR="app"  # Subdirectory where pom.xml is located
  JAR_NAME="app-0.0.1-SNAPSHOT.jar"

  if [ ! -d "$APP_DIR" ]; then
    sudo mkdir -p $APP_DIR
    sudo chown ec2-user:ec2-user $APP_DIR
  fi

  if [ ! -d "$APP_DIR/.git" ]; then
    sudo git clone $REPO_URL $APP_DIR
    sudo chown -R ec2-user:ec2-user $APP_DIR
  fi

  cd $APP_DIR/$SUBDIR
  sudo git pull origin main
  sudo mvn clean package

  # Set up the application as a systemd service
  sudo bash -c "cat > /etc/systemd/system/kiteninja-app.service <<EOF
  [Unit]
  Description=Kiteninja Spring Boot Application
  After=network.target
  
  [Service]
  User=ec2-user
  Group=ec2-user
  WorkingDirectory=$APP_DIR/$SUBDIR
  ExecStart=/usr/bin/java -jar $APP_DIR/$SUBDIR/target/$JAR_NAME
  SuccessExitStatus=143
  Restart=on-failure
  
  [Install]
  WantedBy=multi-user.target
  EOF"
  
  sudo systemctl daemon-reload
  sudo systemctl enable kiteninja-app
  sudo systemctl start kiteninja-app
EOF

  tags = {
    Name = "kiteninja-app"
  }
}

resource "aws_security_group" "kiteninja_sg" {
  name        = "kiteninja-sg"
  description = "Allow HTTP, HTTPS, and SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "kiteninja-sg"
  }
}

output "instance_public_ip" {
  value = aws_instance.kiteninja_app.public_ip
}

SSL Configuration in Spring Boot

After obtaining the SSL certificate from Let's Encrypt, I converted it to PKCS12 format so that it can be used in Spring Boot. Here’s how I configured it in my application.properties:

server.ssl.key-store-type=PKCS12
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=ExamplePassword123!
server.ssl.key-alias=springboot

Conclusion: More Performance, Less Cost

By switching from a t3.micro with an ALB to a t3a.medium instance handling SSL directly, I was able to save over 50% on infrastructure costs while ensuring my application had enough resources to handle traffic and encryption. The t3a.medium offers enough CPU and memory for small to medium workloads, making it a perfect fit for running a Java-based web application without the need for additional costly infrastructure like an ALB.

This approach not only reduced my monthly AWS bill but also simplified my infrastructure. If you’re looking for cost-saving options in a small project, consider handling SSL directly on an EC2 instance with a t3a.medium.


```
