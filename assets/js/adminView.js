{

    const addUser = document.getElementById("add-user");
    let userCreationForm = document.getElementById("userCreationForm");
    let isVisible = false;
    addUser.addEventListener('click', function(e){
        if(isVisible){
            userCreationForm.style.display = "none";
            isVisible = false;
        }
        else{
            userCreationForm.style.display = "block";
            isVisible = true;
        }
    })
}