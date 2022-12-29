// method to submit the form
{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data);      
                   let newComment = newCommentDom(data.data.comment);
                   $(' .post-comment-list>ul').prepend(newComment);
                   deleteComment($(' .delete-comment-button', newComment))
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

// method to create a comment in the dome
    let newCommentDom = function(comment){
        return $(`<li id = "comment-${comment._id}">
        <p>
            <small>
                    <a class = "delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
            </small>
            ${comment.content}
            <br>
            <small>
                    ${comment.user.name}
            </small>
         </p>
    </li>`)
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    createComment();
}

