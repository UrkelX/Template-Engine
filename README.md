
# TEMPLATE-ENGINE

## Description
This project is an application that allows a manager or user to navigate node prompts and fill out employee information and then render an HTML file that includes the necessary information. 

## Table of Contents

* [Installation](#installation)

* [Code](#code)

* [Usage](#usage)

* [Contributions](#contributions)

* [Tests](#tests)

* [License](#license)

* [Contact](#contact)

## Installation
To ensure prompts can work, run npm install
* inquirer

## Code
```
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
```


## Usage

Currently utlized via node. See sample here:

[Full Demo Video](https://drive.google.com/file/d/1Ow37CgRA7bnEOh-u1sh09qCtTCxWcU9o/view?usp=sharing)


## Contributions
Thank you for the support from my TAs, intructor, and claqssmates. 


## Tests
All tests passed. See repo. 


## License
[MIT License](https://github.com/UrkelX/Template-Engine/blob/main/LICENSE)


## Contact
GitHub: @[UrkelX](https://github.com/UrkelX)

Email: jordon@blackbirdrevolt.com

