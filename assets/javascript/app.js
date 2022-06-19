// Selectors
const containerDiv = document.querySelector(".container");
const noteTextarea = document.querySelector(".note-text")
const addNoteButton = document.querySelector(".add-note-button")
const notesDiv = document.querySelector(".notes")
const noNotesText = document.querySelector(".no-notes")

// Variables
let counter = 0;

// Event Listeners
addNoteButton.addEventListener("click", addNote);
notesDiv.addEventListener("click", viewDeleteNote);

// Functions
function addNote(e) {
    e.preventDefault();

    if (noteTextarea.value === "") {
        alert("You can't add an empty note");
    } else {
        noNotesText.style.display = "none";

        const newNote = document.createElement("div");
        newNote.classList.add("note");
        newNote.style.marginRight = "5%";
        
        const noteTitle = document.createElement("h2");
        noteTitle.classList.add("note-title");
        counter += 1;
        noteTitle.textContent = "Note " + counter;
        newNote.appendChild(noteTitle);

        const noteDescription = document.createElement("p");
        noteDescription.classList.add("note-description");
        noteDescription.textContent = noteTextarea.value;
        newNote.appendChild(noteDescription);
        
        const noteButtons = document.createElement("div");
        noteButtons.classList.add("note-buttons");
        newNote.appendChild(noteButtons);
        
        const detailsButton = document.createElement("button");
        detailsButton.classList.add("note-button","note-details");
        detailsButton.textContent = "View details";
        noteButtons.appendChild(detailsButton);
        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("note-button" , "note-delete");
        deleteButton.textContent = "Delete note";
        noteButtons.appendChild(deleteButton);
        
        notesDiv.appendChild(newNote);
        containerDiv.appendChild(notesDiv);

        noteTextarea.value = "";
    }
}

function viewDeleteNote(e) {
    const item = e.target;

    if (item.classList[1] === 'note-delete') {
        const note = item.parentElement.parentElement;
        note.classList.add("fall");
        note.addEventListener("transitionend", () => {
            note.remove();
        })
    }

    if (item.classList[1] === 'note-details') {
        const note = item.parentElement.parentElement;
        const noteTextValue = note.children[1].textContent;
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container","active");
        document.body.appendChild(noteContainer);

        const notePopup = document.createElement("div");
        notePopup.classList.add("note-popup","active");

        const notePopupCloseButton = document.createElement("button");
        notePopupCloseButton.classList.add("note-close");
        notePopupCloseButton.textContent = "X";
        notePopup.appendChild(notePopupCloseButton);

        const noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.textContent = noteTextValue;
        notePopup.appendChild(noteText);

        noteContainer.appendChild(notePopup);

        notePopupCloseButton.addEventListener("click", () => {
            noteContainer.classList.remove("active");
            notePopup.classList.remove("active");
        })

    }
}
