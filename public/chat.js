const socket = io("http://localhost:3000");

let user = ''

socket.on("update_messages", (messages) => {
  updateMessagesOnScreen(messages);
});
function updateMessagesOnScreen(messages) {
  const div_msg = document.querySelector("#messages");

  let list_msg = "<ul>";
  messages.forEach((message) => {
    list_msg += `<li>${message.user}: ${message.msg} </li>`;
  });
  list_msg += "</ul>";
  
  div_msg.innerHTML = list_msg;
}

document.addEventListener('DOMContentLoaded', ()=>{
        const form = document.querySelector("#message_form")
        form.addEventListener('submit', (event)=>{
            event.preventDefault();
                if(!user){
                    alert ("DEFINE A USER!")
                    return
                }else{         
            const message = document.forms['message_form_name']['msg'].value;
            document.forms['message_form_name']['msg'].value = ''
            socket.emit('new_message', {user:user, msg : message})
     }})

     const user_form = document.querySelector("#user_form")
     user_form.addEventListener('submit', (event)=>{
         event.preventDefault();
         user = document.forms['user_form_name']['user'].value;
         user_form.parentNode.removeChild(user_form)         
    })

})