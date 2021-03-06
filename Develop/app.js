const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { ADDRGETNETWORKPARAMS } = require("dns");


// ASYNC FUNCTION TO GENERATE PROMPTS
async function userPrompts() {
    const userInput = await inquirer.prompt([
        {
            type: "input",
            message: "Name",
            name: "name"
        },
        {
            type: "input",
            message: "ID",
            name: "id"
        },
        {
            type: "input",
            message: "Email",
            name: "email"
        },
        {
            type: "list",
            message: "What is Your Role?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        }

    ])
    switch (userInput.role) {
        case "Manager":
            const officeNumberPrompt = await inquirer.prompt([

                {
                    type: "input",
                    message: "Office Number",
                    name: "officeNumber"
                }
            ])

            let managerInfo = new Manager(userInput.name, userInput.id, userInput.email, officeNumberPrompt.officeNumber)
            return managerInfo


        case "Engineer":
            const githubPrompt = await inquirer.prompt([

                {
                    type: "input",
                    message: "GitHub Username",
                    name: "github"
                }

            ])

            let engineerInfo = new Engineer(userInput.name, userInput.id, userInput.email, githubPrompt.github)
            return engineerInfo


        case "Intern":
            const schoolPrompt = await inquirer.prompt([

                {
                    type: "input",
                    message: "Current School",
                    name: "school"
                }

            ])

            let internInfo = new Intern(userInput.name, userInput.id, userInput.email, schoolPrompt.school)
            return internInfo

        default:
            console.log("Working")
            return
    }

}
const team = [];
const testy = async () => {
    // const team = [];
    let newTeamMember = await userPrompts();
    team.push(newTeamMember);

    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Add More Team Members?",
                name: "addTeam",
            },
        ]).then(function (response) {
            if (response.addTeam) {
                testy();
            } else {
                fs.mkdir(OUTPUT_DIR, function (error) { });
                render(team);
                fs.writeFile(outputPath, render(team), (err) => {
                    if (err) {
                        console.log("Fail");
                    } else {
                        console.log("Yes! win!");
                    }
                });

            }
        });

}

testy();

