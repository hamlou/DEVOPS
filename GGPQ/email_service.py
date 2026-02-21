import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def send_welcome_email(to_email, username, site_link):
    """
    Send a professional HTML welcome email to new users.
    
    Args:
        to_email (str): Recipient's email address
        username (str): Recipient's name
        site_link (str): Link to the platform
    
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    # Load credentials from environment variables
    sender_email = os.getenv('EMAIL_USER')
    password = os.getenv('EMAIL_PASS')
    sender_name = os.getenv('SENDER_NAME', 'GGPQ Platform')
    
    if not sender_email or not password:
        print("❌ Email credentials not found in .env file.")
        print("Please add EMAIL_USER and EMAIL_PASS to your .env file.")
        return False

    # Create message container
    message = MIMEMultipart("alternative")
    message["Subject"] = f"🎉 Welcome to {sender_name}, {username}!"
    message["From"] = f"{sender_name} <{sender_email}>"
    message["To"] = to_email

    # Load HTML template
    try:
        template_path = os.path.join('templates', 'welcome_email.html')
        with open(template_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print("⚠️ Warning: Email template not found. Using default template.")
        html_content = get_default_template()
    
    # Replace template variables
    html_content = html_content.replace('{{ username }}', username)
    html_content = html_content.replace('{{ site_link }}', site_link)
    html_content = html_content.replace('{{ sender_name }}', sender_name)
    html_content = html_content.replace('{{ current_year }}', str(os.getenv('CURRENT_YEAR', '2024')))
    
    # Attach HTML content
    part = MIMEText(html_content, "html", "utf-8")
    message.attach(part)

    # Send email using SMTP_SSL (port 465 for secure connection)
    try:
        print(f"📧 Sending welcome email to {to_email}...")
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, to_email, message.as_string())
        print(f"✅ Welcome email sent successfully to {to_email}")
        return True
    except smtplib.SMTPAuthenticationError:
        print("❌ Authentication failed. Check your email credentials.")
        print("💡 Tip: If using Gmail, you may need to use an App Password.")
        return False
    except smtplib.SMTPException as e:
        print(f"❌ SMTP error occurred: {e}")
        return False
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False

def get_default_template():
    """
    Returns a default HTML template if the template file is not found.
    """
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome, {{ username }}! 🎉</h1>
            </div>
            <div style="padding: 40px 30px;">
                <p style="color: #333333; font-size: 16px; line-height: 1.6;">Thank you for joining our platform!</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{{ site_link }}" style="background-color: #667eea; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Get Started</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
