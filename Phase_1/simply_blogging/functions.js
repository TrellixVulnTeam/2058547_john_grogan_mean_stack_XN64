
function displayBlogs(){
    var i = 0;
    var keys = []
    while(true){
        var k = sessionStorage.key(i)
        if(k==null){
            i++;
            break
        }
        else{
            i++;
            keys.push(k)
        }
    }
    var htmlContent = "";
    var htmlBlogs = "";
    var htmlStart = "<div class='col-5'> <div class = content>";
    var htmlEnd = "</div> </div>";

    for(var i = 0; i < keys.length; i++){
        var blog = JSON.parse(sessionStorage.getItem(keys[i]))
        htmlContent = "<h3>"+blog.title+"</h3> <p>"+blog.text+"</p> <img src='"+blog.img+"' class='rounded float-left' width = 300px>"
        var htmlBlog = htmlStart + htmlContent + htmlEnd
        htmlBlogs += htmlBlog
    }

 
    document.getElementById("blogs").innerHTML = htmlBlogs
}


function addBlog(){

    var t = document.getElementById("title").value;
    var te = document.getElementById("textArticle").value;
    var i = document.getElementById("imageAdress").value;
    var temp = {title:t, text:te, img:i};
    sessionStorage.setItem("blog"+Math.random()*1000,JSON.stringify(temp));

    document.getElementById("title").value = "";
    document.getElementById("textArticle").value = "";
    document.getElementById("imageAdress").value = "";

    displayBlogs()
}
