import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

const EmailGenerator = () => {
  const [formData, setFormData] = useState({
    accounts: [
      {
        account_name: '',
        industry: '',
        pain_points: [''],
        contacts: [{ name: '', email: '', job_title: '' }],
        campaign_objective: '',
      },
    ],
    number_of_emails: 1,
  });

  const notify = () => {
    toast.success('🦄 Emails have been generated and sent successfully!', {
      position: "top-right",
      autoClose: 5000, // Duration the toast will be visible
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: toast.Bounce,
      onClose: () => {
        window.location.reload();
      },
    });
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedAccounts = [...formData.accounts];
    updatedAccounts[index][field] = value;
    setFormData({ ...formData, accounts: updatedAccounts });
  };

  const handleNestedChange = (e, accountIndex, type, subIndex) => {
    const { value } = e.target;
    const updatedAccounts = [...formData.accounts];

    if (type === 'pain_points') {
      updatedAccounts[accountIndex][type][subIndex] = value;
    } else {
      updatedAccounts[accountIndex][type][subIndex] = {
        ...updatedAccounts[accountIndex][type][subIndex],
        [e.target.name]: value,
      };
    }

    setFormData({ ...formData, accounts: updatedAccounts });
  };

  const handleAddPainPoint = (index) => {
    const updatedAccounts = [...formData.accounts];
    updatedAccounts[index].pain_points.push('');
    setFormData({ ...formData, accounts: updatedAccounts });
  };

  const handleAddContact = (index) => {
    const updatedAccounts = [...formData.accounts];
    updatedAccounts[index].contacts.push({ name: '', email: '', job_title: '' });
    setFormData({ ...formData, accounts: updatedAccounts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    try {
      console.log("Form data before sending:", formData); // Debugging log
      const response = await axios.post("http://127.0.0.1:5000/generate_emails", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response from backend:", response.data); // Debugging log
      notify(); // Trigger success toast after successful submission
    } catch (error) {
      console.error("Error in submitting data:", error); // Error log
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Email Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formData.accounts.map((account, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account {index + 1}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Account Name</label>
                <input
                  type="text"
                  value={account.account_name}
                  onChange={(e) => handleInputChange(e, index, 'account_name')}
                  className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Industry</label>
                <input
                  type="text"
                  value={account.industry}
                  onChange={(e) => handleInputChange(e, index, 'industry')}
                  className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-600">Campaign Objective</label>
              <input
                type="text"
                value={account.campaign_objective}
                onChange={(e) => handleInputChange(e, index, 'campaign_objective')}
                className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-600">Pain Points</h3>
              {account.pain_points.map((painPoint, subIndex) => (
                <div key={subIndex} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={painPoint}
                    onChange={(e) => handleNestedChange(e, index, 'pain_points', subIndex)}
                    className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddPainPoint(index)}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Add Pain Point
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-600">Contacts</h3>
              {account.contacts.map((contact, subIndex) => (
                <div key={subIndex} className="flex flex-col space-y-4 mt-2">
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/3">
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={contact.name}
                        onChange={(e) => handleNestedChange(e, index, 'contacts', subIndex)}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col w-1/3">
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={(e) => handleNestedChange(e, index, 'contacts', subIndex)}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col w-1/3">
                      <label className="text-sm font-medium text-gray-600">Job Title</label>
                      <input
                        type="text"
                        name="job_title"
                        value={contact.job_title}
                        onChange={(e) => handleNestedChange(e, index, 'contacts', subIndex)}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddContact(index)}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Add Contact
              </button>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <label className="text-sm font-medium text-gray-600">Number of Emails</label>
          <input
            type="number"
            value={formData.number_of_emails}
            onChange={(e) =>
              setFormData({ ...formData, number_of_emails: e.target.value })
            }
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center gap-6 mt-6">
          {/* Generate Emails Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-300 transform hover:scale-105"
          >
            Generate Emails
          </button>

          {/* Download Excel Button */}
          <button
            onClick={() => {
              window.location.href = "http://127.0.0.1:5000/download_file"; // Trigger the download route
            }}
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all ease-in-out duration-300 transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16 10a1 1 0 10-2 0v3H6v-3a1 1 0 10-2 0v3a2 2 0 002 2h8a2 2 0 002-2v-3zM10 2a1 1 0 00-1 1v6H7l3 3 3-3h-2V3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Download Excel
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EmailGenerator;
