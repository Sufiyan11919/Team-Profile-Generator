const fs = require("fs");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");

const employees = []

const addManager = () => {

    console.log(`
    ============================
    Add a Team Manager
    ============================
    `);

    return inquirer
    .prompt([
        {
           type:"input",
           name: "name",
           message: "Who is the team manager?",
           validate: (nameInput) => {
           if (nameInput) {
                   return true;
               } else {
                   console.log("Plz enter the manager's name.");
                   return false;
               }
           } 
        },
        {
           type:"input",
           name: "id",
           message: "Enter the the team Manager ID",
           validate: (nameInput) => {
           if (nameInput) {
                   return true;
               } else {
                   console.log("Plz enter the manager's ID.");
                   return false;
               }
           } 
        },
        {
            type:"input",
            name: "email",
            message: "Enter the email address of team Manager",
            validate: (nameInput) => {
                if (nameInput) {
                        return true;
                    } else {
                        console.log("Plz enter the manager's email.");
                        return false;
                    }
                } 
        },
        {
            type:"input",
            name: "office",
            message: "Enter the office number of the team manager",
            validate: (nameInput) => {
            if (nameInput) {
                    return true;
                } else {
                    console.log("Plz enter a valid office number.");
                    return false;
                }
            }
        }
    ])
    .then(managerData => {
        const { name, id, email, office } = managerData;
        const manager = new Manager(name, id, email, office);
        employees.push(manager);
    })
};



// **********************************************************************************************

const addEmployee = () => {
    console.log(`
    ============================
    Adding a new member in team
    ============================
    `);
return inquirer
.prompt([
    {
        type: "list",
        name: "role",
        message: "What is the role of employee??",
        choices: ["Engineer", "Intern"],
        validate: (nameInput) => {
            if (nameInput) {
                return true;
            } else {
                console.log("Plz select a role.");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "name",
        message: "What is the name of the employee?(*)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Plz enter the employee's name!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is their employee ID?",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Plz enter an ID number!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "Provide the employee's email address.",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Plz enter an employee email!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "github",
        message: "Enter the engineer's github username.",
        when: (answers) => answers.role === "Engineer",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Plz enter a username!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "school",
        message: "Enter the name of the intern's school.",
        when: (answers) => answers.role === "Intern",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Plz enter a school name!");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to enter another team member?",
        default: false
    }
])
.then(empData => {
    if(empData.role === 'Intern') {
        const { name, id, email, school } = empData;
        const intern = new Intern(name, id, email, school);
        employees.push(intern);
    }
    else {
        const { name, id, email, github } = empData;
        const engineer = new Engineer(name, id, email, github);
        employees.push(engineer); 
    }

    if(empData.confirmAddEmployee) {
        return addEmployee(empData);
    } else {
        return employees;
    }
});
}
// ***********************************************************************************************

const writeFile = (fileData) => {
    fs.writeFile('./dist/index.html', fileData, err => {
        if(error) {
            console.log(error);
            return;
        }
        console.log('Your team profile has been successfully created')
    });
}



// ****************************************************************************************************


function init() {
    addManager()
        .then(addEmployee)
        .then((teamArray) => {
            return generateHTML(teamArray);
            })
        .then((pageHTML) => {
            return writeFile(pageHTML);
            })
        .catch((err) => {
        console.log(err);
    });
}

init();