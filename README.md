# Module 10 Challenge 

## Description
This challenge was to create an employee tracker to handle employee information for a business. It is an interactive application that allows the user to view current employees, departments, and roles within a business. In the application, the user can also add new employees, roles, or departments. Lastly, they get the option to change employee roles if they move to a different department or role. The application utilizes PostgreSQL and inquirer to create an easy-to-use application for HR or managers to view employee information and update it if needed. Demonstration of the application: https://drive.google.com/file/d/1PIAbNfqDRJobT_kX6RuI5Bm34YYJX7BZ/view?usp=sharing

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Installation
- Clone the repository using the SSH key. All neccesary files will be in the "Develop" folder.
- In VS Code, open a terminal in the Develop folder's location
- Initialize the employee database by running the schema.sql file and seeds.sql file in PostgreSQL
- Quit out of PostgreSQL
- Run npm install in the Develop folder in the terminal
- Run node index.js to start the application
  
## Usage
This application has a simple user interface where the user can use the up/down arrow keys to select options and then press "enter" to select any options. Each option logs in the console to confirm the action the user chose is actually happening.

## License
No license was used for this repository. A license was not part of this project's requirements.

## Contributing
Github user jmayoung was the main contributor. If any other github users would like to contribute, there are additional ways this application can be expanded. Here are some of the ways:
- Application allows users to update employee managers 
- Application allows users to view employees by manager
- Application allows users to view employees by department
- Application allows users to delete departments, roles, and employees
- Application allows users to view the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department (8 points).

## Tests
The application can be tested by trying all of the different choices. A console log was included for each action to help validate that the action is occurring.

## Questions
If you have any questions you can email me at young.juliamay@gmail.com. Visit my GitHub profile at https://github.com/jmayoung
