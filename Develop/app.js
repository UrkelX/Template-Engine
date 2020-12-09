const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { ADDRGETNETWORKPARAMS } = require("dns");

// const writeFileAsync = util.promisify(fs.writeFile);




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
        ]).then(function(response){
            if(response.addTeam){
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
// render(team);


// New team members Yes or no. If yes loop the questions, if no render. 


// async function makeDirectory(){
//     fs.mkdir(OUTPUT_DIR);
// }

// const pumpOutHTML = async () => {
//     try {
//         // const renderHtml = render()
//         generateTeam();
//         await makeDirectory();
//         // const teamContent = generateContent(answers);

//         await fs.writeFile(outputPath);

//         console.log('');
//     } catch (err) {
//         console.log(err);
//     }
// };

// pumpOutHTML();







// {
//     type: "list",
//         message: "Manager's Office Number",
//             name: "officeNumber"
// },


// After the user has input all team desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
