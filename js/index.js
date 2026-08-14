var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var bookMarkList = [];

var AlertBox = document.querySelector(".alertBox");
var btnSumbit = document.querySelector(".btn-submit");
var btnOk = document.querySelector(".btn-ok");

var alertBoxDelete = document.querySelector(".alertBoxDelete");
var btnDelete = document.querySelector(".btn-delete");
var btncancel = document.querySelector(".btn-cancel");

var alertDeleted = document.querySelector(".alertDeleted")
var btnOk2 = document.querySelector(".btn-ok2");

var deletedIndex = null;

if (localStorage.getItem("bookMarkcontainer") !== null) {
    bookMarkList = JSON.parse(localStorage.getItem("bookMarkcontainer"));
    displayData();
}
function AddBookmark(){
    if(ValidationElement(bookmarkName , "msgName") == true &&
       ValidationElement(bookmarkUrl, "msgUrl") == true
    ){
    var bookmark ={
        name:bookmarkName.value,
        url:bookmarkUrl.value,
    };
    bookMarkList.push(bookmark);
    localStorage.setItem("bookMarkcontainer",JSON.stringify(bookMarkList) );
    displayData();
    AlertBox.classList.remove("d-none")
    clearForm();
    };
};
function displayData(){
    var cartona = "";
    for(var i = 0 ; i < bookMarkList.length ; i++){
        cartona +=`
            <tr>
                <td>${i}</td>
                <td>${bookMarkList[i].name.trim()}</td>
                <td><button class="btn btn-success"><i class="fa-solid fa-eye pe-3"></i><a href="${bookMarkList[i].url.trim()}" class="text-white" target="_blank">Visit</a></button></td>
                <td><button onclick="confirmDelete(${i})" class="btn btn-danger"><i class="fa-solid fa-trash pe-3"></i>Delete</button></td>
            </tr>
        `;
    };
    document.getElementById("tableContent").innerHTML= cartona;
};
function clearForm(){
    bookmarkName.value = null;
    bookmarkUrl.value = null;
    //claer Validation
    bookmarkName.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-valid");
};
function ValidationElement(Element , msg){
    var regex = {
        bookmarkName : /^[A-Za-z][a-zA-Z0-9 ]{3,20}$/,
        bookmarkUrl : /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
    };
    var text = Element.value;
    var msginput = document.getElementById(msg);
    if(regex[Element.id] .test(text) == true){
        Element.classList.add("is-valid");
        Element.classList.remove("is-invalid");
        msginput.classList.add("d-none");
        return true;

    }
    else{
        Element.classList.add("is-invalid");
        Element.classList.remove("is-valid");
        msginput.classList.remove("d-none");
        return false;
    };  
};
function changecolor() {
    document.documentElement.classList.toggle("dark-theme");
};
btnOk.addEventListener('click' , function(){
    AlertBox.classList.add("d-none");
});
btncancel.addEventListener('click' , function(){
    alertBoxDelete.classList.add("d-none");
    deletedIndex = null;
});
function confirmDelete(index) {
    deletedIndex = index; 
    alertBoxDelete.classList.remove("d-none");
};
btnDelete.addEventListener('click', function () {
    if (deletedIndex !== null) {
        bookMarkList.splice(deletedIndex, 1);
        localStorage.setItem("bookMarkcontainer", JSON.stringify(bookMarkList));
        displayData();
        alertBoxDelete.classList.add("d-none");
        alertDeleted.classList.remove("d-none");
        deletedIndex = null;
    }
});
btnOk2.addEventListener('click' , function(){
    alertDeleted.classList.add("d-none");
});
