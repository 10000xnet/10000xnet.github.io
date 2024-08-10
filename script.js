const openDialogButton = document.getElementById("openDialogButton");
const dialog = document.getElementById("dialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialogButton = document.getElementById("closeDialogButton");

openDialogButton.addEventListener("click", () => {
    // Show the dialog box
    dialog.style.display = "block";

    // Load the text file's content
    fetch("killfeed.txt") // Replace with your text file's path
        .then(response => response.text())
        .then(data => {
            dialogContent.innerText = data;
        })
        .catch(error => console.error(error));
});

closeDialogButton.addEventListener("click", () => {
    // Close the dialog box
    dialog.style.display = "none";
});
