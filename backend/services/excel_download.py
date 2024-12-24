import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

# Google Drive API Scopes
SCOPES = ['https://www.googleapis.com/auth/drive']

# Function to authenticate Google Drive
def authenticate_google_drive():
    creds = None
    TOKEN_PATH = 'token.json'
    CREDENTIALS_PATH = 'credentials.json'

    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)
        
        with open(TOKEN_PATH, 'w') as token:
            token.write(creds.to_json())

    return build('drive', 'v3', credentials=creds)

# Function to download a file from Google Drive


# def download_drive_file(service, file_id, destination_path):
#     request = service.files().get_media(fileId=file_id)
#     with open(destination_path, 'wb') as f:
#         downloader = MediaIoBaseDownload(f, request)
#         done = False
#         while not done:
#             status, done = downloader.next_chunk()
#             print(f"Download progress: {int(status.progress() * 100)}%")
#     return destination_path
def download_drive_file(service, file_id, destination_path):
    request = service.files().get_media(fileId=file_id)
    with open(destination_path, 'wb') as f:
        downloader = MediaIoBaseDownload(f, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}% complete.")


