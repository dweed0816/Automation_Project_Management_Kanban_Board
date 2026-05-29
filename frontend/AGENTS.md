# Requirements for the frontend layout and functionality

## frontend layout
- 3 distinct sections, laid out horizontally across the page:
-- Section #1 - Page Banner: 
--- Banner with Company Logo 
---- Use "Ascential_Logo.webp" as the image for the company logo
--- Page Title
---- Banner title text "Ascential: Automation Project Management Kanban Board"
--- Logged in user name
--- Logged in user role 
-- Section #2: 
--- 7 fields: 
---- "Customer" (Dropdown box)
---- "Project" (Dropdown box)
---- "Manager" (Text box)
---- "Status" (Dropdown box)
---- "Start Date" (Date picker)
---- "End Date" Date picker)
---- "Project Description" (Textarea)
---- "Admin Config" (Button)
-- Section #3: 
--- Horizontal swimlanes with configurable headers
----In each swimlane, kanban post it notes with the following subsections: 
----- "Title" (Text box)
----- "Task Description" (Text box) 
----- "Assigned to" (Text box)
----- "Updates" (Textarea)
----- "Status" (Dropdown box)

## frontend functionality
- Swimlane functionality
-- Ability for user to add and delete swimlanes
-- Ability for user to drag and re-order swimlanes
-- Implement a unique identifier for each Swimlane within the project named SwimlaneID in the backend database. For the SwimlaneID, generate it by using the sequence: IIDC-IIDP-running (upper case) alphabet. Note that the SwimlaneID should not be used to set the order for which swimlanes are displayed on the web app. The Swimlanes should be able to be reordered without changing their unique SwimlaneIDs. SwimlaneID should be displayed as a greyed out text label in each swimlane.
- Kanban card functionality
-- Ability for user to add and delete kanban cards
-- Ability for user to drag and re-order kanban cards
-- Implement a unique identifier for each Kanban card within the project named KanbanCardID in the backend database. For the KanbanCardID, generate it by using sequence: SwimlaneID-running number. Note that the KanbanCardID should not be used to set the order which Kanban cards are displayed in the web app. The Kanban cards should be able to be reordered without changing their unique KanbancardIDs. KanbanCardID should be displayed as a greyed out text label in each Kanban Card.
- User role functionality
-- "Admin Config" button in Section #2 should only be available to user with "Administrator" role
-- Invoking the "Admin Config" button launches an in-page Modal consisting of the following sections and fields:
--- Section #1 
---- Customer: Allow user to select existing customer from dropdown list, or ability to create a new customer. Each "Customer" should have 2 corresponding fields: "IIDC" and "Cust ID". "IIDC" is not editable and is meant to be a primary key looked up from an external database table. "Cust ID" is an editable input. "Customer Name" is an editable input.
--- Section #2 
---- Project: Allow user to select existing project from dropdown list, or ability to create a new project. Each "Project" should have 2 corresponding fields: "IIDP" and "Proj ID". "IIDP" is not editable and is meant to be a primary key looked up from an external database table. "Proj ID" is an editable input. "Project Name" is an editable input.
--- Section #3 
---- Project Description: Block text area for user to input short description of project

## frontend design
- Professional, minimalistic, sleek style
- Color scheme:
-- Accent Yellow: `#ecad0a` - accent lines, highlights
-- Orange: `#de7621` - links, key sections
-- Dark Orange: `#dd7722` - submit buttons, important actions
-- Purple: `#5522dd` - main headings
-- Gray Text: `#888888` - supporting text, labels