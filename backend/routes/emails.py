from flask import request, jsonify
from services.email_generator import generate_email_sequence
from services.email_sender import send_email

def generate_emails():
    data = request.get_json()
    print("Received data:", data)

    if not data or "accounts" not in data:
        return jsonify({"error": "No accounts data received!"}), 400

    email_sequences = generate_email_sequence(data)
    print("Generated email sequences:", email_sequences)  # Debugging line

    if not email_sequences:
        return jsonify({"error": "No email sequences generated!"}), 400

    # Sending emails and preparing response
    campaigns = []
    for account in email_sequences:
        if "contacts" not in account or not account["contacts"]:
            print(f"Skipping account {account.get('account_name', 'Unnamed')} due to missing or empty 'contacts'")
            continue
        
        emails_sent = []
        for email in account['emails']:
            contact_email = account['contacts'][0]['email']  # Assuming first contact
            print(f"Sending email: Subject: {email['subject']}, To: {contact_email}")  # Debugging line
            send_email(
                subject=email['subject'],
                body=email['body'],
                to_email=contact_email
            )
            emails_sent.append({
                "subject": email['subject'],
                "body": email['body'],
                "call_to_action": email['call_to_action']
            })

        campaigns.append({
            "account_name": account["account_name"],
            "emails": emails_sent
        })

        

    return jsonify({"campaigns": campaigns}), 200
