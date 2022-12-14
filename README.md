# Marlow technical exercise

This is simple app built using React Native and tested on Android.

## General requirements

A new checklist functionality is required to be added in the app to enable seafarers to see and check all their documents prior on-boarding to a specific assignment. 

This feature should be separated in two different futilities. 

### Two main functions

- Pre-Departure checklist

> A checklist created from main operational system with all documents required to be checked, this checklist should be migrated from Oracle and shown to the seafarer to check his documents. Checklist should be updated from
 Oracle when user login or swipe down the checklist page. 

- Personal checklist

> Seafarer should be able to create independent checklists for his own use just to keep track of specific tasks he creates in the app. Seafarer should be able to delete a personal
checklist only by swiping left the specific personal checklist and tap on Delete. Seafarer should be able to Add a new personal checklist by clicking on the + button on button right of the page. User should provide the Checklist’s name in order to be able
 to create a new personal checklist. By clicking on Done button user should be able to open the new checklist created and start adding items in it. 

### Pre-Departure Documents List

1. Implement swipe functionality with the below cases: 
    - Mandatory documents - Choices to check it as done “Done” 
    - Attention required document - Choice that doc was submitted “Submitted” 
    - Optional documents - Choices to “Done” and “Skip” 
2. When user selects “Done” for a Mandatory or Optional document, the document should move to the bottom of the list as Done. User should have the option to Undone the document by swiping left. 
3. When user selects “Skip” then document should by moved on the bottom of the list as Skipped and user should be able to revert the choice 
4. When user selects “Submitted” for an attention required documents, the status of the document should change to Pending. Under pending status no action should be allowed to the user until the document is validated by Oracle. Upon Oracle validation and update the document should change to a normal Mandatory or Optional document and user should be able to select as points 2 & 3 above. 
5. A progress bar should be added to calculate the ratio between checked items compared to total items.  
6. The documents in this checklist are separated in categories, User should be able to scroll to choose the category he wants to review. 
7. The items in this checklist should show:(as per designs) 
    - Document name 
    - Nationality 
    - Doc number 
    - Issue date 
    - Expiry date

### My Checklist
1. Implement swipe functionality like payslip page with only available choice “Done” 
2. Seafarer should be able to undone items from the checklist 
3. User should be able to delete items from the checklist 
4. No categories or progress bar is needed for those checklists.

## UI requirements

https://xd.adobe.com/view/543231a1-3096-4a09-9d6a-64a3f5ee8604-0161/ 

## Mock API requirements

### GET Pre-departure checklist

- Request body
    ```sh
    N/A
    ```

- Response
    - Success
        ```sh
        {
          "id": "uuid",
          "status": "Archive",
          "items": [
          {
            "id": "uuid",
            "status": "Done",
            "documentInfo": {
              "description": "string",
              "documentNumber": "string",
              "issueDate": "string",
              "unlimited": true,
              "categoryName": "string",
              "categoryId": "string",
              "documentId": 0,
              "expiryDate": "string",
              "nation": "string",
              "counter": 0,
              "followUp": true,
              "optional": true
            }
          }
          ],
          "percentage": 0
        }
        ```
    - Failure
        ```sh
        {"message": "string"}
        ```
- Description
  - category: STCW National, Flag State, GDPR Documents, Training, Technical.
  - status: Active, Done, Submitted, or Skipped
  - entry type: Mandatory, Attention, Optional
      - If the followup is true, it means that the document is attention.
      - If the optional is true, it means that the task is optional.
      - If both (followup and optional) are false, it means that the task is mandatory.

### PUT Pre-departure checklist
- Request body
    ```sh
    { "status": "Done"}
    ```

- Response
    - Success
        ```sh
        { "code": 200,   "data": "Successfully updated"}
        ```
    - Failure
        ```sh
        {
          "code": 400,
          "message": "Error message"
        }
        ```
