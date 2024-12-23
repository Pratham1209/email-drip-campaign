import google.generativeai as genai
from config import Gemini_API_KEY;

# Set up the Gemini API key
api_key = Gemini_API_KEY;  

# Configure Gemini API
genai.configure(api_key=api_key)

# Function to generate email content using the Google Gemini API (via google.generativeai)
def generate_email_with_gemini(prompt):
    # Create the model configuration
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    # Create the model instance
    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash-exp",  # or use "gemini-1.5-flash" depending on the version
        generation_config=generation_config,
    )

    # Start a new chat session and send the prompt
    chat_session = model.start_chat(
        history=[]  # You can customize history if needed
    )

    # Send the input message (prompt) to generate the email content
    response = chat_session.send_message(prompt)

    # Return the generated text (email content)
    return response.text.strip() if response else None

# Function to generate email sequences for each account and contact
def generate_email_sequence(data):
    accounts = data.get("accounts", [])
    number_of_emails = data.get("number_of_emails", 1)
    email_sequences = []

    for account in accounts:
        # Loop through all contacts for this account
        for contact in account.get("contacts", []):
            sequence = []

            # Loop through the number of emails to generate
            for i in range(number_of_emails):
                # Define the prompt for generating email content for the current contact
                prompt = (
                f"Write a professional email for {account['account_name']} in the {account['industry']} industry, addressing their pain points: {', '.join(account['pain_points'])}. "
                f"Provide solutions and focus on {account['campaign_objective']} with a nurturing tone. "
                f"Try to write a professional email without including irrelevant data. "
                f"Start writing directly from 'Hello {account['contacts'][0]['name']}' and avoid subject lines in the body, at last only add greeting not necessary to mention company name but write {account['account_name']} from where you are sending."
                f"Try to write short , crisp and attractive"
            )

                # Generate email content for the current contact
                email_content = generate_email_with_gemini(prompt)

                if email_content:
                    sequence.append({
                        "subject": f"Exclusive Solutions for {account['account_name']}",
                        "body": email_content,
                        "call_to_action": "Click here to learn more!"
                    })

            # Ensure that we only add the contact's email once in the sequence
            if sequence:
                email_sequences.append({
                    "account_name": account["account_name"],
                    "emails": sequence,
                    "contacts": [contact]  # Ensure this contact is uniquely added
                })

    print("Generated email sequences:", email_sequences)  # Debugging line

    return email_sequences
