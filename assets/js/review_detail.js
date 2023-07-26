{
    let isVisible = false;
    let btn = document.getElementById("outer_link");
    let addUserForm = document.getElementById("add_user_form");
    btn.addEventListener('click', function(e){
        if(isVisible){
            addUserForm.style.display = 'none';
            isVisible = false;
        }else{
            addUserForm.style.display = 'block';
            isVisible = true;
        }
    })


    let submitButton = document.getElementById("sunmit_button");
    let checkUserBtn = document.getElementById("check_user_btn");
    let reviewed_user_email = document.getElementById("hiddenInp").value;
    let created_by_user_email = document.getElementById("hiddenInpCreatedUser").value;
    let dataContainer = document.getElementById('message');
    
    checkUserBtn.addEventListener('click',function(e){
        e.preventDefault();
        let email = document.getElementById('user_email').value;
        if(email == reviewed_user_email){
            dataContainer.innerHTML = '<p>Can not enter email of the reviewed user</p>';
            return;
        }
        if(email == created_by_user_email){
            dataContainer.innerHTML = '<p>Can not enter email of the user who created the review</p>';
            return;
        }
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