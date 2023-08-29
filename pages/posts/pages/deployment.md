
Setting Up and Connecting a Backend Server on AWS EC2   with a Custom Subdomain 

### Introduction:
In today's cloud-centric world, deploying and integrating applications has never been easier. This guide focuses on AWS, the leader in cloud services, to set up a backend server for a React app.

### 1. Domain Purchase on Amazon Route 53:
- Sign in to AWS Management Console.
- Navigate to Route 53 and select "Domain Registration."
- Purchase your desired domain.

### 2. Security Groups Configuration:
- Go to EC2 > "Security Groups."
- Create 'open-sg' to allow traffic from the internet.
- Create 'internal-sg' for more restricted access.

### 3. Launching EC2 Instance:
- Choose your desired Amazon Machine Image (AMI) in EC2.
- Assign 'internal-sg' during setup.

### 4. Application Load Balancer (ALB) Configuration:
- Navigate to "Load Balancers" within EC2.
- Set up an "Application Load Balancer."
- Attach 'open-sg' and create a target group 'ec2-tg' for your EC2 instance.

### 5. Subdomain Setup for ALB:
- Head to Route 53.
- Under your domain’s hosted zone, create a Record Set named "api."
- Link the record to your ALB.

### 6. React App Endpoint Configuration:
- Direct API endpoint calls to "https://api.mydomain.com."

### 7. Backend Server CORS Configuration:
- Modify your backend, whether it's Express.js, Flask, or another, to handle CORS from your React domain.

### 8. Secure the Communication:
- Obtain an SSL/TLS certificate via AWS Certificate Manager (ACM).
- Affix the certificate to your ALB for encrypted traffic.

### 9. Testing:
- Interact with your React app.
- Initiate an API call and verify its success, ensuring no network or CORS issues arise.

### Conclusion:
Deploying a backend for a React application on AWS is a streamlined process. By adhering to this guide, your deployment and integration should proceed without hitches.

---

**Up Next**: Stay tuned for our follow-up post where we dive into setting up the frontend. The power of AWS combined with the simplicity of Vercel ensures a seamless deployment for your React application. We'll break down the steps to get your frontend live, effectively completing the bridge between your user interface and backend services. Join us in exploring these exciting platforms!