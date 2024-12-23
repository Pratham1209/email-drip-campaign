// api.js
import axios from 'axios';

const API_URL = "http://127.0.0.1:5000/generate_emails";  // Replace with your actual API endpoint

export const fetchEmailData = async () => {
    const dataToSend = {
      accounts: [
        {
          account_name: "MarketLeads",
          industry: "Marketing Automation",
          pain_points: ["Low conversion rates", "Inefficient targeting"],
          contacts: [
            { name: "Sarah Johnson", email: "lexnos1234@gmail.com", job_title: "Marketing Director" }
          ],
          campaign_objective: "awareness"
        }
      ],
      number_of_emails: 1
    };
  
    try {
      const response = await axios.post(`${API_URL}`, dataToSend);
      console.log("Response from backend:", response.data);  // Log the response data
      return response.data;  // Returning the response data to the component
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  