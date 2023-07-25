{
    let submitButton = document.getElementById("sunmit_button");
    let checkUserBtn = document.getElementById("check_user");
    checkUserBtn.addEventListener('click',function(e){
        e.preventDefault();
        let email = document.getElementById('user_email').value;
        $.ajax({
            type: 'GET',
            url : '/user/checkEmail/'+email,
            success: function(data){
                appendDataToHTML(data.data);
            },
            error : function(error){
                console.log(error);
            }
        });

    });

    function appendDataToHTML(data){
        let dataContainer = document.getElementById('message');
        dataContainer.innerHTML = '';   
        let htmlContent = '';
        if(!data.user){
            htmlContent = `<p>No Users found for the entered email address</p>`;
            submitButton.disabled = true;
        }else{
            htmlContent+=`<p>This is a valid email address</p>`;
            submitButton.disabled = false;
        }
        dataContainer.innerHTML = htmlContent;
    }
}