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


    let searchForm = document.getElementById("searchForm");
    console.log(searchForm);

    searchForm.addEventListener('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url : '/user/admin/searchByEmail',
            data: $(searchForm).serialize(),
            success: function(data){
                appendDataToHTML(data.data);
            },
            error : function(error){
                console.log(error);
            }
        });
    });

    function appendDataToHTML(data){
        let dataContainer = document.getElementById('user-container');
        dataContainer.innerHTML = '';   
        let htmlContent = '';
        if(data.users.length == 0){
            htmlContent = `<p>No Users Found</p>`;
        }else{
            
            for(let user of data.users){
                htmlContent+=`<div class="user">
                                <p>User name : ${user.name}</p>
                                <p>User Email : ${user.email}</p>
                                <p>Is Admin : ${user.isAdmin}</p>
                                <div class="btn-container">
                                    <button class="btn btn-primary">Edit</button>
                                    <button class="btn btn-secondary">Remove</button>
                                </div>
                            </div>`;
            }
        }
        dataContainer.innerHTML = htmlContent;
    }
}