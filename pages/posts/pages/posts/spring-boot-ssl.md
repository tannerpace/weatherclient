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

Running a Spring Boot application on AWS with an Application Load Balancer (ALB) and SSL termination is a common setup. However, for hobby projects or small applications, this setup might be overkill and expensive. In this post, I'll show you how to add SSL directly to your Spring Boot project and remove the load balancer to save on costs.

### Why Remove the Load Balancer?

While load balancers offer several benefits like traffic distribution, SSL termination, and improved security, they come with ongoing costs. If your application doesn’t require these features at scale, you can significantly reduce your AWS bill by handling SSL directly within your Spring Boot application.

### Adding SSL to Your Spring Boot Project

To configure SSL in your Spring Boot application, you’ll need to follow these steps:

#### 1. Obtain an SSL Certificate

First, you need an SSL certificate. If your domain is managed through AWS, you might have an AWS Certificate Manager (ACM) certificate, but for direct SSL configuration in Spring Boot, you'll need the certificate files. You can use Let's Encrypt to obtain a free SSL certificate.

#### 2. Convert Your SSL Certificate to a Java Keystore

Spring Boot requires the SSL certificate to be in a Java Keystore (JKS) format. If you have your certificate in PEM format, you can convert it using the following commands:

```bash
# Convert the key and certificate to PKCS12 format
openssl pkcs12 -export -in your-cert.pem -inkey your-key.pem -out keystore.p12 -name your-alias

# Convert the PKCS12 keystore to JKS format
keytool -importkeystore -srckeystore keystore.p12 -srcstoretype pkcs12 -destkeystore keystore.jks -deststoretype JKS
3. Configure Spring Boot to Use the SSL Certificate
Next, configure your application.properties or application.yml file to use the JKS keystore:

properties
Copy code
# application.properties
server.port=443
server.ssl.key-store=classpath:keystore.jks
server.ssl.key-store-password=your-keystore-password
server.ssl.key-alias=your-alias
Or, if you use YAML:

yaml
Copy code
# application.yml
server:
  port: 443
  ssl:
    key-store: classpath:keystore.jks
    key-store-password: your-keystore-password
    key-alias: your-alias
Ensure that your keystore file is included in your project’s resources directory (src/main/resources/).

4. Test Your Configuration
After configuring SSL, start your Spring Boot application and ensure it’s accessible over HTTPS. You should be able to access your application at https://your-domain.com.

Removing the Load Balancer
With SSL now configured directly in your Spring Boot application, you can remove the AWS Application Load Balancer to cut down on costs. Here’s how to do it:

Update Your DNS Settings: If your domain was pointing to the load balancer, update your DNS settings to point directly to your EC2 instance's public IP address or Elastic IP.

Modify Security Groups: Ensure that your EC2 instance’s security group allows inbound traffic on port 443 for HTTPS.

Terminate the Load Balancer: Once everything is working correctly and you’ve confirmed that traffic is reaching your instance as expected, you can safely terminate the load balancer in the AWS console.

Conclusion
By configuring SSL directly in your Spring Boot application, you can maintain a secure connection while eliminating the costs associated with an AWS load balancer. This approach is particularly useful for small-scale projects or when you need to optimize your cloud spending.

If you have any questions or run into issues while setting this up, feel free to leave a comment below. Happy coding and saving!
```
