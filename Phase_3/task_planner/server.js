let http = require("http");
let url = require("url");
let fs = require("fs")

function getTableContent(){
    let tableContent = ""
    let taskArray =  JSON.parse(fs.readFileSync("tasks.json").toString());
    for(let t of taskArray){
        tableContent += "<tr> <td>" + t.empId + "</td> <td> " + t.taskId + "</td> <td> " + t.task + "</td> <td> " + t.deadline + "</td> </tr>"
    }
    return tableContent
}

let start = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Planner</title>
</head>
<body>
<h2 style="text-align: center;"> Task Planner</h2><br>
`
let addHTML = 
`
<div style="border: 1px solid; width: 30%; padding: 10px; margin: 10px;">
    <h2>Add Task</h2>
    <form action="addTask">
            <label>Employee ID: </label>
            <input type="text" name="empId" required><br/><br/>
            <label>Task ID: </label>
            <input type="text" name="taskId" required><br/><br/>
            <label>Task: </label>
            <input type="text" name="task" required><br/><br/>
            <label>Deadline: </label>
            <input type="date" name="deadline" required><br/><br/>
            <input type="submit" value="Add Task">
            <input type="reset" value="Reset">
        </form>
    </div><br>
`
let deleteHTML = 
`
<div style="border: 1px solid; width: 30%; padding: 10px; margin: 10px;">
        <h2>Delete Task</h2>
        <form action="deleteTask">
            <label>Task ID: </label>
            <input type="text" name="taskId" required><br/><br/>
            <input type="submit" value="Add Task">
            <input type="reset" value="Reset">
        </form>
    </div><br>
`
let startTableHTML = 
`
<div style="border: 1px solid; width: 30%; padding: 10px; margin: 10px;">
        <h2>List Task</h2>
        <table style="border:solid;">
            <tr>
                <th>Employee Id</th>
                <th>Task Id</th>
                <th>Task</th>
                <th>Deadline</th>
            </tr>
`
let tableEndHTML =
`
</table>
    </div>
</body>
</html>
`

let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);

    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path == "/"){
            let tableContent = getTableContent()
        
            response.write(start)
            response.write(addHTML)
            response.write(deleteHTML)
            response.write(startTableHTML)
            response.write(tableContent)
            response.write(tableEndHTML)
        }
        else if(urlInfo.pathname == "/addTask"){
            let task = urlInfo.query;
            let taskArray =  JSON.parse(fs.readFileSync("tasks.json").toString());
            let result = taskArray.find(t=>t.taskId == task.taskId);
            if(result != undefined){
                let tableContent = getTableContent()

                response.write(start)
                response.write(addHTML)
                response.write("task already exists...")
                response.write(deleteHTML)
                response.write(startTableHTML)
                response.write(tableContent)
                response.write(tableEndHTML)
            }
            else{
                taskArray.push(task)
                fs.writeFileSync("tasks.json",JSON.stringify(taskArray));

                let tableContent = getTableContent()
                response.write(start)
                response.write(addHTML)
                response.write("task added!")
                response.write(deleteHTML)
                response.write(startTableHTML)
                response.write(tableContent)
                response.write(tableEndHTML)
            }
        }
        else if(urlInfo.pathname == "/deleteTask"){
            let task = urlInfo.query;
            let taskArray =  JSON.parse(fs.readFileSync("tasks.json").toString());
            let result = taskArray.find(t=>t.taskId == task.taskId);
            if(result != undefined){
                let index = 0
                for(let i=0; i < taskArray.length; i++){
                    if(taskArray[i].taskId == task.taskId){
                        index = i
                    }
                }
                taskArray.splice(index,1)
                fs.writeFileSync("tasks.json",JSON.stringify(taskArray));

                let tableContent = getTableContent()

                response.write(start)
                response.write(addHTML)
                response.write(deleteHTML)
                response.write("event deleted!")
                response.write(startTableHTML)
                response.write(tableContent)
                response.write(tableEndHTML)
            }
            else{
                let tableContent = getTableContent()
                response.write(start)
                response.write(addHTML)
                response.write(deleteHTML)
                response.write("task does not exist...")
                response.write(startTableHTML)
                response.write(tableContent)
                response.write(tableEndHTML)
            }
        }
    }
    response.end();
})

server.listen(9090,()=>console.log("Server running on port number 9090"))