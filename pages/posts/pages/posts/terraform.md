---
title: Deploying and Scaling a Node.js Express Server on AWS with Terraform
date: 2023-08-15
description: An in-depth guide to deploying and scaling a Node.js Express server on AWS EC2 backed by RDS using Terraform for high customer loads.
tags:
  [
    terraform,
    aws,
    rds,
    ec2,
    node.js,
    express,
    infrastructure as code,
    git,
    ssh,
    scalability
  ]
author: Tanner Bleakley
---

### Introduction:

Scaling to support a growing user base requires thoughtful infrastructure decisions. In this tutorial, we'll securely deploy a Node.js Express application on AWS EC2 instances, backed by RDS, and use Elastic Load Balancing to distribute incoming traffic. Terraform will be our tool of choice for provisioning.

### 1. Prerequisites:

- Terraform installed.
- AWS CLI configured.
- Node.js and Express basics.
- A private Git repository with your Express application.

### 2. SSH for Secure Git Operations:

**a. Generate a Deploy Key:**  
Generate an SSH deploy key specific for this project:

```bash
ssh-keygen -t rsa -b 4096 -C "deploy@myapp.com"
```

**b. Git Repository Key Setup:**  
Add the public deploy key to your Git hosting platform under deploy keys.

**c. Safe Key Storage:**  
Use AWS Secrets Manager to store the private key, ensuring it's retrievable by EC2 instances but not publicly accessible.

### 3. Terraform Setup:

**a. Configuration Initiation:**

```bash
mkdir express_terraform_setup
cd express_terraform_setup
terraform init
```

**b. EC2, RDS, and Load Balancer Configuration:**  
Define EC2 instances, RDS settings, and an Application Load Balancer in your `main.tf`. Ensure you set up auto-scaling groups for EC2 instances to handle varying loads.

**c. Security Group Configuration:**  
Define security groups to control inbound and outbound traffic to EC2 instances, RDS, and the load balancer.

```hcl
resource "aws_security_group" "example" {
  name        = "example"
  description = "Example security group for EC2"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

**d. User Data for EC2 Initialization:**  
Utilize `user_data` to automate the setup process for each EC2 instance:

```hcl
user_data = <<-EOF
              #!/bin/bash

              # Update and install dependencies
              sudo apt-get update
              sudo apt-get install -y nodejs npm git

              # Set up SSH for Git
              # Fetch the private key from AWS Secrets Manager (replace with your retrieval method)
              echo "$(aws secretsmanager get-secret-value --secret-id your-secret-id | jq -r .SecretString)" > /home/ubuntu/.ssh/id_rsa
              chmod 600 /home/ubuntu/.ssh/id_rsa
              chown ubuntu:ubuntu /home/ubuntu/.ssh/id_rsa
              ssh-keyscan github.com >> /home/ubuntu/.ssh/known_hosts

              # Clone the repo and set up the app
              git clone git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.git express_app
              cd express_app
              npm install
              sudo npm install pm2 -g
              pm2 start app.js
              EOF
```

### 4. Scaling with Elastic Load Balancing:

For high-availability and efficient traffic distribution, use an Application Load Balancer (ALB). It will distribute incoming traffic among all healthy EC2 instances and will work seamlessly with the auto-scaling groups you've defined.

### 5. Deploy and Scale:

Now, it's time to execute:

```bash
terraform plan
terraform apply
```

Monitor your setup using AWS CloudWatch to ensure that auto-scaling kicks in during high traffic and scales down during lulls, optimizing cost.

### Conclusion:

I Hope you enjoyed this tutorial! If you have any questions, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/tannerbleakley/).

### References:

https://registry.terraform.io/modules/terraform-aws-modules/ec2-instance/aws/latest/examples/complete
https://pm2.keymetrics.io/
https://ubuntu.com/
