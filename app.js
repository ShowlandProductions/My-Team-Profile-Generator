const Employee = require("./lib");
const inquirer = require("inquirer");
const fs = require("fs");
let employeesHTML = "";
// This will determine the questions to identify who is on the team and their description.
const empQ = [
  {
    name: "name",
    type: "input",
    message: "what is your name?",
    validate: answer => {
      if (answer !== "") {
        return true;
      }
      return "Please enter at least one character!";
    }
  },
  // this asked for the ID while verifying that a valid positive number is input, not sure how to blocke it to negative numbers yet. 
  {
    name: "id",
    type: "input",
    message: "Enter ID number",
    validate: answer => {
      const pass = answer.match(/^[1-9]\d*$/);
      if (pass) {
        return true;
      }
      return "Please enter a valid number (1-9).";
    }
  },

  // This creates the input to ask for the email and verifies that the user input valid info or an error will be presented.
  {
    name: "email",
    type: "input",
    message: "Please enter your email",
    validate: answer => {
      const pass = answer.match(/\S+@\S+\.\S+/);
      if (pass) {
        return true;
      }
      return "Please enter a valid email address.";
    }
  }
];
//  After we the managers has to answer questions about what they would like to do.
const questions = {
  manager: [
    ...empQ,
    {
      name: "officeNumber",
      type: "input",
      message: "Please enter your office number",
      validate: answer => {
        const pass = answer.match(/^[1-9]\d*$/);
        if (pass) {
          return true;
        }
        return "Please enter a valid number (1-9).";
      }
    }
  ],
  new: [
    {
      name: "confirm",
      message: "Add employee to your team?",
      type: "list",
      choices: ["yes", "no"]
    }
  ],
  another: [
    {
      name: "addNew",
      message: "Add another employee?",
      type: "list",
      choices: ["yes", "no"]
    }
  ],
  employeeType: [
    {
      name: "add",
      message: "Role of desired employee you would you like to add?",
      type: "list",
      choices: ["engineer", "intern", "none"]
    }
  ],
  intern: [
    ...empQ,
    {
      name: "school",
      type: "input",
      message: "Please enter school name attended",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    }
  ],
  engineer: [
    ...empQ,
    {
      name: "github",
      type: "input",
      message: "What is your github username",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    }
  ]
};

init();

// Information sent to manager.html to give us the information provided
function init() {
  inquirer
    .prompt(questions.manager)
    .then(manager => {
      fs.readFile("./templates/manager.html", "utf8", (err, data) => {
        if (err) throw err;
        const replaced = data
          .replace("{{name}}", manager.name)
          .replace("{{id}}", manager.id)
          .replace("{{email}}", manager.email)
          .replace("{{officeNumber}}", manager.officeNumber);
        employeesHTML += replaced;
        inquirer.prompt(questions.new).then(newEmployee => {
          if (newEmployee.confirm == "yes") {
            addEmployee();
          } else {
            renderHtml(employeesHTML);
            console.log("Ok, bye!");
          }
        });
      });
    })
    .catch(error => console.log(error));
}

// engineer.html info needed to create the card
function addEmployee() {
  inquirer.prompt(questions.employeeType).then(employeeType => {
    if (employeeType.add === "engineer") {
      inquirer.prompt(questions.engineer).then(engineer => {
        fs.readFile("./templates/engineer.html", "utf8", (err, data) => {
          if (err) throw err;
          const replaced = data
            .replace("{{name}}", engineer.name)
            .replace("{{id}}", engineer.id)
            .replace("{{email}}", engineer.email)
            .replace("{{github}}", engineer.github);
          employeesHTML += replaced;
          addNew();
        });
      });

      // Determines who desired questions are intended for
    } else if ((employeeType.add = "intern")) {
      inquirer.prompt(questions.intern).then(intern => {
        fs.readFile("./templates/intern.html", "utf8", (err, data) => {
          if (err) throw err;
          const replaced = data
            .replace("{{name}}", intern.name)
            .replace("{{id}}", intern.id)
            .replace("{{email}}", intern.email)
            .replace("{{school}}", intern.school);
          employeesHTML += replaced;
          addNew();
        });
      });
    } else if ((employeeType.add = "none")) {
      console.log("Ok, bye!");
    }
  });
}

// Function to continue adding new roles to the team 
function addNew() {
  inquirer.prompt(questions.another).then(runAgain => {
    if (runAgain.addNew == "yes") {
      addEmployee();
    } else {
      renderHtml(employeesHTML);
    }
  });
}
// Ties Main.html information together
function renderHtml(replaced) {
  fs.readFile("./templates/main.html", "utf8", (err, data) => {
    if (err) throw err;
    let mainHtml = data.replace("{{main}}", replaced);
    fs.writeFile("./output/main.html", mainHtml, function(err) {
      if (err) throw err;
      console.log("Your team is ready to rock!");
    });
  });
}
