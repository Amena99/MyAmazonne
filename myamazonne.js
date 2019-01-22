var mysql = require("mysql");
var inquirer = require("inquirer");
 
// call once somewhere in the beginning of the app
//https://www.npmjs.com/package/console.table
const cTable = require('console.table');
let customerAccount = 5000.00;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yourRootPassword",
  database: "amazonne_DB"
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
            message: "\nWelcome to MyAmazonne! What category would you like to shop?",
            choices: ["Appliances", "Video Games", "Electronics"]
        })
        .then(function(answer){
            //logging answer object to check ...
            // console.log(answer);
            // console.log(answer.Category);
            displayItems(answer.Category);
        });
}

//Function that takes in the parameter "category" and displays all the items in a category and asks user to select one.
//Stores user's choice of selection and displays more details about that item by 
//running the itemDetails function.

function displayItems (category){
    connection.query("SELECT * FROM inventory WHERE category = ?", [category],function(err, results){
        if(err) throw err;
        // console.log("line 72 = "+results);
    
    inquirer
        .prompt([
        {
            name: "item",
            type: "rawlist",
            //reference: the function for 'choices' taken from Class Activity greatBayBasic.js
            choices: function() {
                
                var choiceArray = [];
                for (var i=0; i < results.length; i++){
                    //log each item looped through
                    // console.log(results[i].item_name);
                    choiceArray.push(results[i].item_name);
                }
                //log entire array to be displayed before displayed
                // console.log(choiceArray);
                //return array to be displayed as choices
                return choiceArray;
            },
            message: "\nWhat item would you like to learn more about?",
        }    
        ])
        .then(function(answer){
            // console.log(answer);
            displayDetails(answer.item);
        });

   })
};

//Function to display all the details of an item that the user has selected.
//Takes in the item name and category name as parameters. If user confirms "buy this", the purchaseItem 
//function is run using the item name as a parameter. If user confirms "do not buy", 
//the start function is run again. 

function displayDetails(item){
    connection.query(`SELECT * FROM inventory WHERE item_name = '${item}'`, function(err, results){
        if(err) throw err;

        //results of the sql select statement
        // console.log(results[0]);
        let itemPriceD = (results[0].price).toFixed(2);
        console.log(`\n*************************\nThese are the details for the item you chose.\nItem Name: ${results[0].item_name}\nCategory: ${results[0].category}\nPrice: $${itemPriceD} \nFeatures: ${results[0].features}\nAdditional Descriptor: ${results[0].additional_descriptors} \nNumber Available: ${results[0].number_available}\n*************************\n\n`);

        inquirer
        .prompt([
        {
            name: "buychoice",
            type: "confirm",
            message: "\nWould you like to go ahead and buy the item?",
        }    
        ])
        .then(function(answer){
            // console.log(answer);
            purchaseItem(answer, item);
        });

   })
};


//Function to complete the transaction of purchasing. Decrement the number available of the item 
//from the database. If number available is zero, display that transaction cannot be completed.
//Display to the consumer what they have bought, then show consumer that X amount has 
//been debited from their account. Show the balance of their account. 

function purchaseItem(buyBoolean, itemName) {
    connection.query(`SELECT * FROM inventory WHERE item_name = '${itemName}'`, function(err, results){
        if(err) throw err;
        let itemInfo = results[0];
        // console.log("number available: "+ itemInfo.number_available);

    if(buyBoolean && itemInfo.number_available > 0){
        let itemPriceP = (itemInfo.price).toFixed(2);
        console.log(`\nGreat! Completing purchase of ${itemName} for $${itemPriceP}...`);
        
        //Update the customer's account by decrementing by the item price
        customerAccount -= (itemInfo.price);
        console.log(`\nPurchase complete! Your new account balance is $${(customerAccount).toFixed(2)}`);
        
        //Inventory needs to updated by decrementing number of items available
        let newNumAvail = itemInfo.number_available-1;
        // console.log(newNumAvail);
        // console.log(itemInfo.id);

        connection.query(
            `UPDATE inventory SET ? WHERE ?`,
            [
                {
                    number_available : newNumAvail
                },
                {
                    id: itemInfo.id
                }
            ],
            function(error){
                if (error) throw err;
                // console.log("line 165" + results[0].number_available);
                connection.query(`SELECT number_available FROM inventory WHERE id = ? `, [itemInfo.id], function(error, results){
                if (error) throw err;
                console.log(`\nInventory updated successfully! \nUpdated number of items available for ${itemInfo.item_name} : ${results[0].number_available}`);
                console.log("\nTaking you back to MyAmazonne home...\n\n\n");
                start();
            
                });
            });
        }
    else{
        console.log("\nTransaction Cancelled! Taking you back to MyAmazonne home...\n");
        start();
    }
});
}