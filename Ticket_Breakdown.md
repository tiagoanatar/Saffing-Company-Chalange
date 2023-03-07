# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom ID field to Agents table
Description:
Add a new column to the Agents table to store custom IDs provided by Facilities.

Acceptance Criteria:

- A new column named "custom_id" is added to the Agents table
- The custom_id column is nullable
- The custom_id column is unique across all Facilities
- An API endpoint is added to update the custom_id for a specific Agent
- An API endpoint is added to retrieve the custom_id for a specific Agent
- The custom_id is displayed on the Shifts report PDF instead of the internal database id

Time/effort estimate:
2-3 hours

Implementation details:

Add migration script to create the custom_id column in the Agents table
Update the Agent model to include a custom_id attribute with the corresponding database column
Add API endpoints to update and retrieve the custom_id, using the existing Agent controller and route
Update the Shifts report generator function to use the custom_id instead of the internal database id

### Ticket 2: Add custom ID field to Facility-Agent mapping table
Description:
Add a new column to the Facility-Agent mapping table to store custom IDs provided by Facilities.

Acceptance Criteria:

- A new column named "custom_id" is added to the Facility-Agent mapping table
- The custom_id column is nullable
- The custom_id column is unique within each Facility
- An API endpoint is added to update the custom_id for a specific Agent in a specific Facility
- An API endpoint is added to retrieve the custom_id for a specific Agent in a specific Facility
- The Shifts report PDF displays the custom_id instead of the internal database id for each Agent

Time/effort estimate:
2-3 hours

Implementation details:

Add migration script to create the custom_id column in the Facility-Agent mapping table
Update the FacilityAgent model to include a custom_id attribute with the corresponding database column
Add API endpoints to update and retrieve the custom_id, using the existing FacilityAgent controller and route
Update the Shifts report generator function to use the custom_id instead of the internal database id for each Agent

### Ticket 3: Add custom ID field to Facility table
Description:
Add a new column to the Facility table to store custom IDs provided by Facilities.

Acceptance Criteria:

- A new column named "custom_id" is added to the Facility table
- The custom_id column is nullable
- The custom_id column is unique across all Facilities
- An API endpoint is added to update the custom_id for a specific Facility
- An API endpoint is added to retrieve the custom_id for a specific Facility
- The Shifts report PDF displays the Facility custom_id instead of the internal database id

Time/effort estimate:
1-2 hours

Implementation details:

Add migration script to create the custom_id column in the Facility table
Update the Facility model to include a custom_id attribute with the corresponding database column
Add API endpoints to update and retrieve the custom_id, using the existing Facility controller and route
Update the Shifts report generator function to use the custom_id instead of the internal database id for the Facility

### Ticket 4: Validate uniqueness of custom IDs
Description:
Validate that custom IDs provided by Facilities are unique.

Acceptance Criteria:

- An error message is returned if a Facility attempts to set a custom_id that already exists for another Agent or Facility
- The Shifts report PDF uses the internal database id if the custom_id is not unique

Time/effort estimate:
2-3 hours

Implementation details:

Update the API endpoints for setting custom_id to validate that the custom_id is unique within the Facility or across all Facilities, depending on