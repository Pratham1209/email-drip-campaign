import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config import GMAIL_EMAIL, GMAIL_PASSWORD  # Make sure to have your Gmail credentials here

def send_email(subject, body, to_email):
    # Set up the server (Gmail SMTP)
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
    
    # Login to your email account
    server.login(GMAIL_EMAIL, GMAIL_PASSWORD)
    
    # Prepare the email
    msg = MIMEMultipart()
    msg['From'] = GMAIL_EMAIL
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    
    # Send the email
    server.sendmail(GMAIL_EMAIL, to_email, msg.as_string())
    server.quit()
