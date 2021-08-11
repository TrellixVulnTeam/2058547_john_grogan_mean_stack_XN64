function add(s:string){
    var cart = JSON.parse(localStorage.getItem("cart"))
    var temp = {item:"",price:0}
    if(s == "laptop"){
        temp = {item:"Laptop", price:1000}
    }
    if(s == "phone"){
        temp = {item:"MobilePhone", price:500}
    }
    if(s == "perfume"){
        temp = {item:"Perfume", price:20}
    }
    if(s == "helmet"){
        temp = {item:"Helmet", price:15}
    }
    cart.push(temp)
    localStorage.setItem("cart", JSON.stringify(cart))
}

function displayData(){
    var cart = JSON.parse(localStorage.getItem("cart"))
    var htmlContent = ""
    var htmlStart = 
    `<table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
        </tr>
    </thead>
    <tbody>`
    for(var item of cart){
        htmlContent += "<tr> <td> " + item.item + "</td>" + "<td> " + item.price + "</td>" + "<td> <a href='' onclick=deleteItem("+"'"+item.item+"'"+")>Delete Item</a> </td> </tr>"
    }
    var htmlEnd = "</tbody> </table>"

    var htmlTotal = htmlStart + htmlContent + htmlEnd
    document.getElementById("tableContainer").innerHTML = htmlTotal
}

function deleteItem(s:string){
    console.log("event fired")
    var cart = JSON.parse(localStorage.getItem("cart"))
    var i = 0;
    while(true){
        if(cart[i].item == s){
            break
        }
        i++
    }
    console.log(i)
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
}