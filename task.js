tasks = [
  { id: 1, name: "Task 1", etat: "Pending" },
  { id: 2, name: "Task 2", etat: "Done" },
];

function ajouter(task) {
  this.tasks.push(task);
  return this.tasks;
}

function supprimer(id) {
  this.tasks = this.tasks.filter((task) => task.id != id);
  loadtasks();
}

function modifier(id) {
  const taskToEdit = tasks.find((task) => task.id === id);

  const form = document.createElement("form");
  form.classList.add(
    "container",
    "p-3",
    "bg-white",
    "border",
    "rounded",
    "shadow",
    "mb-4"
  );
  form.innerHTML = `
        <div class="mb-3">
            <label for="name" class="form-label">Nom :</label>
            <input type="text" id="name" class="form-control" value="${
              taskToEdit.name
            }" required>
        </div>
        <div class="mb-3">
            <label for="etat" class="form-label">État :</label>
            <select id="etat" class="form-select">
                <option value="Pending" ${
                  taskToEdit.etat === "Pending" ? "selected" : ""
                }>Pending</option>
                <option value="Done" ${
                  taskToEdit.etat === "Done" ? "selected" : ""
                }>Done</option>
            </select>
        </div>
        <button type="button" class="btn btn-primary me-2" onclick="sauvegarder(${id})">Sauvegarder</button>
        <button type="button" class="btn btn-secondary" onclick="annuler()">Annuler</button>
    `;

  const body = document.getElementById("body");
  body.appendChild(form);

  window.currentForm = form;
}

function sauvegarder(id) {
  const name = document.getElementById("name").value;
  const etat = document.getElementById("etat").value;

  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, name, etat };
    }
    return task;
  });

  annuler();
  loadtasks();
}

function annuler() {
  if (window.currentForm) {
    window.currentForm.remove();
    window.currentForm = null;
  }
}

function loadtasks() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.etat}</td>
            <td>
                <button class="btn btn-danger btn-sm me-2" onclick="supprimer(${task.id})">Supprimer</button>
                <button class="btn btn-primary btn-sm" onclick="modifier(${task.id})">Modifier</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}
