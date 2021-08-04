
function add(){
    var client = document.getElementById("client").value;
    var project = document.getElementById("project").value;
    var budget = document.getElementById("budget").value;
    if(client != "" && project != "" && budget != ""){
        var temp = {c:client, p:project, b:budget};
        localStorage.setItem("arrayClients"+temp.c,JSON.stringify(temp));


        document.getElementById("client").value = "";
        document.getElementById("project").value = "";
        document.getElementById("budget").value = "";
    }  
}

function clearStuff(){
    document.getElementById("client").value = "";
    document.getElementById("project").value = "";
    document.getElementById("budget").value = "";
}

function displayData(){
    var i = 0;
    var keys = []
    while(true){
        var k = localStorage.key(i)
        if(k==null){
            i++;
            break
        }
        else{
            i++;
            keys.push(k)
        }
    }
    var tableContent = "";
    var startTable ="<table border=1 class='table'><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
    var total = 0;
    for(var i = 0; i < keys.length; i++){
        var text = JSON.parse(localStorage.getItem(keys[i]))
        total += parseInt(text.b)
        tableContent += "<tr><td>"+text.c+"</td><td>"+text.p+"</td><td>"+"$"+text.b+"</td></tr>"
    }

    var endTable="</table>"
    tableContent = startTable+tableContent+endTable

    var t = "Total Budget for all projects listed is: $" + total;
    
    document.getElementById("total").innerHTML=t;   
    document.getElementById("tableDiv").innerHTML=tableContent;

}

