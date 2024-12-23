from flask import Flask, request, jsonify,send_file
from services.excel_download import authenticate_google_drive, download_drive_file
from flask_cors import CORS
from services.email_generator import generate_email_sequence
from services.email_sender import send_email
from concurrent.futures import ThreadPoolExecutor
from services.excel_handler import handle_post_request  # Importing the function from excel_handler
import os

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Create a ThreadPoolExecutor for handling concurrent email sending
executor = ThreadPoolExecutor(max_workers=10)

# Function to send emails concurrently
def send_email_async(subject, body, to_email):
    send_email(subject=subject, body=body, to_email=to_email)
    print(f"Sent email to {to_email} with subject: {subject}")

@app.route('/generate_emails', methods=['POST'])
def generate_emails():
    data = request.get_json()
    print("Received data:", data)

    if not data or "accounts" not in data:
        return jsonify({"error": "No accounts data received!"}), 400

    email_sequences = generate_email_sequence(data)
    print("Generated email sequences:", email_sequences)  # Debugging line

    if not email_sequences:
        return jsonify({"error": "No email sequences generated!"}), 400

    # Prepare success response format
    campaigns = []

    # List to hold the email sending tasks
    tasks = []

    # Loop through the email sequences and create tasks for sending emails
    for account in email_sequences:
        if "contacts" not in account or not account["contacts"]:
            print(f"Skipping account {account.get('account_name', 'Unnamed')} due to missing or empty 'contacts'")
            continue

        emails_sent = []
        for email in account['emails']:
            for contact in account['contacts']:
                # Submit the email sending task to the executor
                tasks.append(executor.submit(send_email_async, email['subject'], email['body'], contact['email']))

                # Add email details to the response
                emails_sent.append({
                    "subject": email["subject"],
                    "body": email["body"],
                    "call_to_action": email["call_to_action"]
                })

        # Add campaign details to the response
        campaigns.append({
            "account_name": account["account_name"],
            "emails": emails_sent
        })

    # Call the function to update the Excel file on Google Drive
    handle_post_request(email_sequences)

    # Wait for all email sending tasks to complete
    for task in tasks:
        task.result()

    return jsonify({"campaigns": campaigns}), 200

@app.route('/download_file', methods=['GET'])
def download_file():
    # Get the file ID from the request (or use a default ID)
    file_id = request.args.get('file_id', '1ynbIxCcD-heVaIpSNUJADkDRZ-9yDKVX')
    
    # Set a temporary destination path (file name inside the Downloads directory)
    destination_path = os.path.join(os.path.expanduser('~'), 'Downloads', 'downloaded_file.xlsx')
    
    # Authenticate and download the file
    service = authenticate_google_drive()
    download_drive_file(service, file_id, destination_path)
    
    # Send the file to the user for download
    return send_file(destination_path, as_attachment=True, download_name="downloaded_file.xlsx")


if __name__ == "__main__":
    app.run(debug=True)
