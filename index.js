const inquirer = require("inquirer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const fs = require("fs");
// const indexPage = require("./generate")

const allTeam = []

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
        allTeam.push(manager);
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
        validate: (nameInput) => {
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
        validate: (nameInput) => {
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
.then(data => {
    if(data.role === 'Intern') {
        const { name, id, email, school } = data;
        const intern = new Intern(name, id, email, school);
        allTeam.push(intern);
    }
    else {
        const { name, id, email, github } = data;
        const engineer = new Engineer(name, id, email, github);
        allTeam.push(engineer); 
    }

    if(data.confirmAddEmployee) {
        return addEmployee(data);
    } else {
        return allTeam;
    }
});
}

// **************************************************************************************************

const indexPage = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team-Profile</title>
        <link rel="stylesheet" href="./style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        
    </head>
    <body>
        <header class="header ">
            <h1>Team<h1>
        </header>

        <div class = "container">
            ${allTeam
                .filter((employee) => employee instanceof Manager)
                .map((manager) => `
                    <div class="block">
                        <div class="block-header">
                            <h3>${manager.name}</h3>
                            <h4>Manager</h4>
                        </div>
                        <div class="block-body">
                            <p>ID: ${manager.id}</p>
                            <p>Email: 
                                <a href="mailto:${manager.email}">${manager.email}</a>
                            </p>
                            <p>Office Number: ${manager.office}</p>
                        </div>
                    </div>`)}

            ${allTeam
                .filter((employee) => employee instanceof Engineer)
                .map((engineer) => `
                    <div class="block">
                            <div class="block-header">
                                <h3>${engineer.name}</h3>
                                <h4>Engineer</h4>
                            </div>
                        <div class="block-body">
                            <p>ID: ${engineer.id}</p>
                            <p>Email: 
                                <a href="mailto:${engineer.email}">${engineer.email}</a>
                            </p>
                            <p>Github: 
                                <a href="https://github.com/${engineer.github}" class="mt-auto"><i class="fab fa-github mr-2"></i>${engineer.github}</a>
                            </p>
                        </div>
                    
                    </div>`)}

            ${allTeam
                .filter((employee) => employee instanceof Intern)
                .map((intern) => `
                    <div class="block">
                        <div class="block-header">
                            <h3>${intern.name}</h3>
                            <h4>Intern</h4>
                        </div>
                        <div class="block-body">
                            <p>ID: ${intern.id}</p>
                            <p>Email: 
                                <a href="mailto:${intern.email}">${intern.email}</a>
                            </p>
                            <p>School: ${intern.school}</p>
                        </div>
                    </div>`)}

        </div>
    </body>
    </html>`; 
}


// ***********************************************************************************************

const writeFile = (data) => {
    fs.writeFile('./dist/index.html', data, error => {
        if(error) {
            console.log(error);
            return;
        }
        console.log('Your team profile has been successfully created')
    });
}



// ****************************************************************************************************



    addManager()
        .then(addEmployee)
        .then(() => {
            return indexPage()})
        .then((data) => {
          writeFile(data);
            })
        .catch((error) => {
        console.log(error);
    });
