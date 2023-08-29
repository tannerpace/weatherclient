---
title: How To Deploy A Backend for REST API to AWS EC2
date: 2023-07-14
description: A comprehensive guide on deploying a REST API backend on AWS EC2.
tag: web development
tags: [react, typescript, aws, ec2, backend, deployment, web dev, REST API]
author: Tanner Bleakley
---



### Introduction:
Harness the power of AWS to deploy a backend for your React app. This guide elucidates every step in detail.

### 1. Domain Purchase on Amazon Route 53:
- Sign in to AWS Management Console.
- Head to Route 53 and click on "Domain Registration."
- Secure your desired domain.

### 2. Security Groups Configuration:
- Visit EC2 and then "Security Groups."
- Creating 'open-sg':
  - Click "Create Security Group."
  - Name it 'open-sg'.
  - For inbound rules, allow HTTP (port 80) and HTTPS (port 443) from `0.0.0.0/0`.
- Creating 'internal-sg':
  - Click "Create Security Group" again.
  - Name it 'internal-sg'.
  - Set inbound rules to accept SSH from your IP and traffic from 'open-sg'.

### 3. Launching EC2 Instance:
- In EC2, click "Launch Instance."
- Choose your Amazon Machine Image (AMI).
- During setup, link it to the 'internal-sg'.

### 4. Application Load Balancer (ALB) Configuration:
- In EC2, go to "Load Balancers."
- Create an "Application Load Balancer."
- For security settings, use 'open-sg'.
- Setting up Target Group:
  - Name it 'ec2-tg'.
  - Set the target type as 'instance'.
  - Protocol should be HTTP and port as 80.
  - For health checks, use the default settings or customize as needed.
  - Register your EC2 instance with this group.

### 5. Subdomain Setup for ALB:
- Head back to Route 53.
- In your domain’s hosted zone, click "Create Record Set."
- Label it as "api."
- Set the type to "A – IPv4 address."
- For the destination, select the alias target as your ALB.

### 6. React App Endpoint Configuration:
- Update your API calls in the React app to target "https://api.mydomainname.com."

### 7. Backend Server CORS Configuration:
- Modify your backend setup to recognize CORS from your React domain.

### 8. Secure the Communication:
- Use AWS Certificate Manager (ACM) to generate a free SSL/TLS certificate.
- Attach this certificate to your ALB to ensure encrypted communication.

### 9. Testing:
- Access your React app.
- Trigger an API call and ensure there's no problem in communication.

### Conclusion:
By meticulously following this guide, you can establish a secure and efficient bridge between your React application and the backend, harnessing the reliability of AWS.

---

Up Next: Our subsequent post will guide you through setting up the frontend of your React application using Vercel. This combination of AWS for the backend and Vercel for the frontend ensures a full-fledged and efficient deployment of your app. We will also cover aws front end deployent, how to use pm2 to keep your server running,and even integrating github actions to deploy changes every time you make a commit to your repository.