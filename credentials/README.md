***************************************    
         Steps for AWS Deployment
***************************************

1) Created AWS educate account with university email.
2) Created AWS s3 bucket.
3) Created a policy for bucket and made access to public. <br>
            {
                "Version": "2012-10-17", <br>
                "Id": "Policy1636365811553", <br>
                "Statement": <br>
                [ <br>
                    {
                    "Sid": "Stmt1636365807616", <br>
                    "Effect": "Allow", <br>
                    "Principal": "*", <br>
                    "Action": "s3:GetObject", <br>
                    "Resource": "arn:aws:s3:::student-tutor-portfolio/*" <br>
                    } <br>
                ] <br>
            } <br>
            
4) Enabled static website hosting on properties. 
5) Uploaded the static html file

Link: http://student-tutor-portfolio.s3-website-us-east-1.amazonaws.com/





***************************************
               MYSQL
***************************************
username : root <br>
password : root <br>
url      : TBD  <br>
