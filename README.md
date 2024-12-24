# This `README.md` includes:

    1. A brief project description.
    2. Setup instructions for both the frontend and backend.
    3. Detailed steps on how to run the application.
    4. API endpoints with request and response examples.
    5. A Postman collection button for API testing.

# Email Drip Campaign

This project automates the generation, sending, and tracking of marketing emails using the Gemini API. The backend is implemented in Python using Flask, while the frontend is built with React. It also allows users to generate an Excel report with details of all emails sent.

## Features

- **Generate and send emails** using the Gemini API to a list of contacts.
- **Track email data** such as the recipients' details, email content, and send status in an Excel file.
- **Download Excel file** that contains all email send details.
- **Backend**: Python with Flask
- **Frontend**: React.js

## Prerequisites

- **Python 3.x**: For the backend.
- **Node.js and npm**: For the frontend.

## Getting Started

Follow the steps below to get this project up and running on your local machine for development and testing.

### 1. Clone the Repository

Clone the repository to your local machine:
 ```sh
git clone https://github.com/Pratham1209/email-drip-campaign.git
```
### 2. Set Up the Backend
Install Python Dependencies
Ensure you're using a virtual environment, then install the required Python dependencies:
 ```sh
pip install -r requirements.txt
```
```
```
### 3. Set Up Environment Variables

- Create a .env file in the root of your project and add the following:
  
- GEMINI_API_KEY=your_gemini_api_key

- EMAIL_ADDRESS=your_email@example.com

- EMAIL_PASSWORD=your_email_password
  
## Google Drive API Authentication
## Download the credentials.json** file from the [Google Developer Console](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjpovrqlMGKAxVoDIMDHVEaOO0YABAAGgJzZg&co=1&ase=2&gclid=Cj0KCQiA1Km7BhC9ARIsAFZfEItbH9wQ8bJ2drufLtZimLUyBRKZEE0kc7_C2NnDlcpfS5PB7ajtupUaAn8lEALw_wcB&ei=dQ5rZ8LnEt7H4-EPgcibsQo&ohost=www.google.com&cid=CAESVeD2YcLFtPD6_6WVPmo9nP5ahfhiPjdjLsqwXNo8IZS_mBAI-MDRa28hcefHksy0yEll2EU8V10_lC1EK0eo_dciprkBfK9tKpzUSLjmVl73io5J9cs&sig=AOD64_3pwV00DMh916t11d2pB6VrhJS3pg&q&sqi=2&nis=4&adurl&ved=2ahUKEwiC9vXqlMGKAxXe4zgGHQHkJqYQ0Qx6BAgNEAE).
## Replace the credentials.json file in the backend directory with your file.
## token.json will be automatically created when the backend is first run.


### 4. Run the Backend
To start the backend server, run:
   ```sh
   python app.py

```
### 5. Set Up the Frontend
Install Node.js Dependencies

Navigate to the frontend directory and install the necessary packages using npm:

```sh
cd frontend
npm install
```
Run the Frontend
To start the frontend development server, run:
```sh
npm run dev
```

### 6. Generate Emails

- Navigate to the frontend application.

- Fill in the account and contact details in the form.

- Click the "Generate Emails" button to send the emails.

- Download Email Tracking Report

- Once the emails are sent, you can download the tracking Excel file by clicking the "Download Excel" button. The file will contain all the details of the emails that were sent, including recipient name, email, subject, and body.

### 7. API Endpoints
POST /generate_emails

Generates and sends the emails based on the provided input data.

```sh
Post-https://email-drip-campaign.onrender.com/generate_emails
```

Request:

{
```sh
  "accounts": [

    {
      "account_name": "MarketLeads",
      "industry": "Marketing Automation",
      "pain_points": ["Low conversion rates", "Inefficient targeting"],
      "contacts": [
        {
          "name": "Lex Nos",
          "email": "lex@example.com",
          "job_title": "Marketing Director"
        }
      ],
      "campaign_objective": "awareness"
    }
  ],
  
  "number_of_emails": 1
}
```
``
Response:
```sh
{

    "campaigns": [

        {
            "account_name": "MarketLeads",
            "emails": [
                {
                    "body": "Hello Lex nos,\n\nWe understand the frustration of low conversion rates and inefficient targeting – common challenges in today's marketing landscape. It's like casting a wide net and hoping for the best, which often leads to wasted resources and missed opportunities.\n\nAt MarketLeads, we specialize in helping businesses like yours transform these pain points into powerful results. Our marketing automation solutions are designed to refine your targeting, reaching the right audience with the right message at the right time. We can help you nurture leads with personalized content, guiding them through the buyer's journey and significantly boosting your conversion rates.\n\nWe believe awareness is key. Let’s discuss how our strategies can create a more focused and efficient approach to your marketing efforts.\n\nMarketLeads",
                    "call_to_action": "Click here to learn more!",
                    "subject": "Exclusive Solutions for MarketLeads"
                }
            ]
        }
    ]
}
```
GET /download_file

Downloads the generated Excel file with email details.

- Query Parameters:
- file_id: The ID of the file on Google Drive that contains the email tracking data.

```sh
GET https://your-backend-url.com/download_file?file_id=your_file_id
```
### 8. Postman Collection
You can import the Postman collection for testing the API:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/33785306-3abe4073-7c3b-4fa5-bd34-f06b9184c756?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33785306-3abe4073-7c3b-4fa5-bd34-f06b9184c756%26entityType%3Dcollection%26workspaceId%3D45dfb44a-9237-41be-9edd-bdba79abe8cd)

### Thank you!!








