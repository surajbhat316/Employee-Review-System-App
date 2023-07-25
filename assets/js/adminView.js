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
                htmlContent+=`
                            <form id="userUpdateForm" action="/user/admin/update/${user._id}" method="post">
                                <label class="form-label" for="name">Name</label>
                                <input class="form-control" type="text" name="name" id="name" value="${user.name}">
                            
                                <label class="form-label" for="email">Email</label>
                                <input class="form-control" type="text" name="email" id="userEmail" value="${user.email}">

                                <label class="form-label" for="isAdmin">IsAdmin</label>
                                <input type="checkbox" name="isAdmin" id="isAdmin" ${user.isAdmin ? "checked" :""}><br>
                            
                                <button class="btn btn-primary my-2" type="submit">Update</button>
                                <a href="/user/admin/delete/${user._id}"><button class="btn btn-secondary" type="button" >Delete</button></a>
                            </form>
                            `;
            }
        }
        dataContainer.innerHTML = htmlContent;
    }
    
}