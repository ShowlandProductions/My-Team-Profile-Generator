# Team-Profile-Generator



Instructions on how to use My Team Profile Generator
Clone the repo 
Install the modules with: npm install
Open app.js in Terminal, then input: node app.js
Follow the instructions and answer questions to build your team.
HTML with provided information will be generated.

Created JS files for my team manager, engineer, and intern.
Created HTML for each team member
Added package.json & package-lock with required dependencies 
Uploaded app.js with functions on how to address questions for my team and options to continue adding team members
Created a main.html for my output 

User Story
AS A manager
I WANT to generate a webpage that displays my team's basic info
SO THAT I have quick access to their emails and GitHub profiles

Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address
WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab
WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
