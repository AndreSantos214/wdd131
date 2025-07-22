const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("ul");

button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
      const li = document.createElement("li");
      const deleteButton = document.createElement("button");

      li.textContent = input.value;
      deleteButton.textContent = "❌";
      deleteButton.setAttribute("aria-label", `Remove ${input.value}`);

      deleteButton.addEventListener('click', function() {
        list.removeChild(li);
        input.focus();
        console.log('Item removed!');
      });
      
      li.append(deleteButton);
      list.append(li);

      input.value = '';
      input.focus();

    } else {
      input.focus();
    }

});

input.addEventListener('keyup', function(event) {
  if (event.key == 'Enter') {
    button.click()
  }
});

