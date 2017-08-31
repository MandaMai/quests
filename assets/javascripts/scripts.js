(function() {
let apiUrl = "http://localhost:1337/user/";
let questName;
$("#successDelete").hide();//hide when page is loaded

//edit, remove, progress


  $(function(){
    getQuests(apiUrl);

    function getQuests(tempUrl) {
      $("tbody").html("");
      //$("tbody").empty();
          $.get(tempUrl, function(data){
              quest = data;
              for(let i = 0; i < quest.length; i++){
                questName = quest[i].questName;
                questID = quest[i].id;
                questImgUrl = quest[i].cover;
                questImg = imageDisplay(questImgUrl);
                // let info =
                // `
                // <tr class="questRow">
                //   <td class="name">${questName}</td>
                //   <td class="image">${+questImg}</td>
                //   <td><button type="button" class="remove" data-id="${questID}" data-target="${questName}" data-img="${questImgUrl}">Remove Item</button></td>
                //   <td><button type="button" class="edit" data-id="${questID}" data-target="${questName}" data-img="${questImgUrl}">Edit Item</button></td>
                // </tr>
                // `
                $('tbody').append('<tr class="questRow"><td class="name">'+questName+'</td><td class="image">'+questImg+'</td><td><button type="button" class="remove btn btn-default" data-id="'+questID+'" data-target="'+questName+'" data-img="'+questImgUrl+'">Remove Item</button></td><td><button type="button" class="edit btn btn-default" data-id="'+questID+'" data-target="'+questName+'" data-img="'+questImgUrl+'">Edit Item</button></td></tr>');

                }//end for
            })//end get
    }//end getQuests


    function imageDisplay(tempImg) {
      return '<img src="'+tempImg+'" />';
    }

    $(document).on('click','.remove',function(){
        let userConfirm = confirm("Are you sure you want to delete "+ $(this).attr("data-target"));
        console.log(apiUrl+$(this).attr("data-id"));
        //$(this).data("id");
        if(userConfirm) {
          $.ajax({
            url: apiUrl+$(this).attr("data-id"),
            type: 'DELETE',
            success:function(result){
              getQuests(apiUrl);
              alert("Your quest has been deleted")
              $("#successDelete").slideDown();
            },//end success
            error:function(result){
              alert("Problem with request, quest was not deleted.")
            }
          })
        }

    })

    $(document).on('click','.edit',function(){
        console.log("edit button clicked");
    })

    $("#submit").click(function(e){
      e.preventDefault();
      console.log("clicked teh button");
      $.post( apiUrl, $("#addQuest").serialize(), function(data){
    //do something with the result
    alert("Quest has been added!")
      });
    })//end submit click

    $("#getInfo").click(function(){
      let tempId = $("#questIdRet").val();
      console.log(tempId);
      $("#idDetail").html(tempId);
      //get form info from api

    })

    $("#addQuest").submit(function(e){
      e.preventDefault();
      console.log("clicked teh button");
    })





  })//end functions that run when page loads
})()
