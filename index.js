const taskInput = document.getElementById("text");

const addBtn = document.getElementById("button");

const taskList = document.getElementById("taskList");


// Load data from localStorage

let todos = JSON.parse(
    localStorage.getItem("todos")
) || [];


// Add task

addBtn.addEventListener("click",()=>{


    const task = taskInput.value.trim();


    if(task === ""){
        return;
    }


    const todo = {

        id: Date.now(),

        title: task,

        completed:false

    };


    todos.push(todo);


    saveTodos();

    displayTask();


    taskInput.value="";


});



// Display tasks

function displayTask(){


    taskList.innerHTML="";


    todos.forEach((todo)=>{


        const li = document.createElement("li");


        li.innerText = todo.title;



        // Completed style

        if(todo.completed){

            li.style.textDecoration="line-through";

        }



        // Delete button

        const deleteBtn = document.createElement("button");


        deleteBtn.innerText="Delete";



        deleteBtn.addEventListener("click",(event)=>{


            // Stop li click event

            event.stopPropagation();



            todos = todos.filter((item)=>{


                return item.id !== todo.id;


            });



            saveTodos();

            displayTask();


        });



        li.appendChild(deleteBtn);



        // Complete task

        li.addEventListener("click",()=>{


            todos = todos.map((item)=>{


                if(item.id === todo.id){


                    item.completed = !item.completed;


                }


                return item;


            });



            saveTodos();

            displayTask();



        });



        taskList.appendChild(li);



    });


}




// Save data

function saveTodos(){


    localStorage.setItem(

        "todos",

        JSON.stringify(todos)

    );


}



// Display existing tasks when page loads

displayTask();