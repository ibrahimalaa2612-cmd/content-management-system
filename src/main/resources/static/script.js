const API_URL = "/api/content";

const contentForm = document.getElementById("contentForm");
const contentId = document.getElementById("contentId");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const contentList = document.getElementById("contentList");


// Load all content when the page opens
loadContent();


// CREATE / UPDATE
contentForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const content = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim()
    };

    try {
        if (contentId.value) {
            // UPDATE
            const response = await fetch(`${API_URL}/${contentId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(content)
            });

            if (!response.ok) {
                throw new Error("Failed to update content");
            }

            alert("Content updated successfully!");

        } else {
            // CREATE
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(content)
            });

            if (!response.ok) {
                throw new Error("Failed to create content");
            }

            alert("Content added successfully!");
        }

        resetForm();
        loadContent();

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
});


// READ
async function loadContent() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load content");
        }

        const contents = await response.json();

        contentList.innerHTML = "";

        if (contents.length === 0) {
            contentList.innerHTML = "<p>No content available.</p>";
            return;
        }

        contents.forEach(content => {
            const contentItem = document.createElement("div");
            contentItem.className = "content-item";

            contentItem.innerHTML = `
                <h3>${escapeHtml(content.title)}</h3>
                <p>${escapeHtml(content.description)}</p>

                <div class="actions">
                    <button
                        class="edit-btn"
                        onclick="editContent(${content.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteContent(${content.id})">
                        Delete
                    </button>
                </div>
            `;

            contentList.appendChild(contentItem);
        });

    } catch (error) {
        console.error(error);
        contentList.innerHTML = "<p>Failed to load content.</p>";
    }
}


// EDIT
async function editContent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Content not found");
        }

        const content = await response.json();

        contentId.value = content.id;
        titleInput.value = content.title;
        descriptionInput.value = content.description;

        submitBtn.textContent = "Update Content";
        cancelBtn.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load content!");
    }
}


// DELETE
async function deleteContent(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this content?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete content");
        }

        alert("Content deleted successfully!");

        loadContent();

    } catch (error) {
        console.error(error);
        alert("Failed to delete content!");
    }
}


// Cancel Edit
function cancelEdit() {
    resetForm();
}


// Reset Form
function resetForm() {
    contentForm.reset();

    contentId.value = "";

    submitBtn.textContent = "Add Content";

    cancelBtn.style.display = "none";
}


// Prevent HTML injection when displaying user content
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}