var mysql = require("mysql");
var inquirer = require("inquirer");
 
// call once somewhere in the beginning of the app
//https://www.npmjs.com/package/console.table
const cTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "youRootPassword",
  database: "MyAmazonne_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made
  start();
});

//Start the app
function start (){
    inquirer
        .prompt({
            name: "Category",
            type: "rawlist",
            message: "Welcome to MyAmazonne! What category would you like to shop?",
            choices: ["Appliances", "Clothing", "Electronics", "Furniture", "Toys"]
        })
        .then(function(answer){
            displayItems(answer);
        });
}

//Function that takes in the parameter "category" and displays all the items in a category and ask user to select one
//Store user's choice of selection and display more details about that item by 
//running the itemDetails function.
function start (){
    inquirer
        .prompt({
            name: "Category",
            type: "rawlist",
            message: "Welcome to MyAmazonne! What category would you like to shop?",
            choices: ["Appliances", "Clothing", "Electronics", "Furniture", "Toys"]
        })
        .then(function(answer){
            displayItems(answer);
        });
}

//Function to display all the details of an item that the user has selected
//Takes in the item name and category name as parameters. If user confirms "buy this", the sellItem 
//function is run using the item name as a parameter. If user confirms "go back to item listing", 
//the displayItems function is run again for this category. 
function displayItems (category){
    inquirer
        .prompt({
            name: "Item",
            type: "rawlist",
            message: "What item would you like to learn more about?",
            choices: 
                switch(category){
                    case "Appliances":
                        connection.query()
                    case "Clothing":
                    case "Electronics":
                    case "Furniture":
                    case "Toys":
                }
        })
        .then(function(answer){
            displayItems(answer);
        });
}

//Function that takes in name of item to sell and removes the item from the 
//inventory and displays a message to the user that the item has been bought
//by user for X price. Displays a thank you message and asks the user if they would like to shop
//for more items. If yes, run start function again, if no, exit app. 