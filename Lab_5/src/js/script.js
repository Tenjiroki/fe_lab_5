/* document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;
    const fields = {
      fullName: {
        element: document.getElementById("fullName"),
        regex:
          /^[А-Яа-яЁёІіЇї]{2,}\s+[А-Яа-яЁёІіЇї]{1}\.\s?[А-Яа-яЁёІіЇї]{1}\.$/,
      },
      group: {
        element: document.getElementById("group"),
        regex: /^[А-Яа-яЁёІіЇї0-9\-]{2,4}-?[0-9]{1,2}$/,
      },
      birthDate: {
        element: document.getElementById("birthDate"),
        regex: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/,
        validate: function (value) {
          const parts = value.split(".");
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          const date = new Date(year, month - 1, day);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
          );
        },
      },
      IDcard: {
        element: document.getElementById("ID-card"),
        regex: /^[A-ZА-Я]{2} №\d{6}$/,
      },
      email: {
        element: document.getElementById("email"),
        regex: /^[\w-]+@[\w-]+\.[a-z]{2,}$/,
      },
    };

    for (let field in fields) {
      fields[field].element.classList.remove("highlight");
    }

    for (let field in fields) {
      const { element, regex, validate } = fields[field];
      if (
        !regex.test(element.value) ||
        (validate && !validate(element.value))
      ) {
        valid = false;
        element.classList.add("highlight");
      }
    }

    if (valid) {
      let formData = {};
      const infoTableBody = document.getElementById("infoTableBody");

      for (let field in fields) {
        formData[field] = fields[field].element.value;
        const row = document.createElement("tr");
        row.innerHTML = `<td>${field}</td><td>${formData[field]}</td>`;
        infoTableBody.appendChild(row);
      }

      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = '<td colspan="2">&nbsp;</td>';
      infoTableBody.appendChild(emptyRow);

      for (let field in fields) {
        fields[field].element.value = "";
      }
    } else {
      alert("Будь ласка, виправте помилки у формі.");
    }
  });

document.getElementById("birthDate").addEventListener("keypress", function (e) {
  if (!/[0-9.]/.test(e.key)) {
    e.preventDefault();
  }
});

document.getElementById("ID-card").addEventListener("keypress", function (e) {
  if (!/[A-ZА-Я0-9№\-]/.test(e.key)) {
    e.preventDefault();
  }
});

document.getElementById("email").addEventListener("keypress", function (e) {
  if (!/[A-Za-z0-9@._-]/.test(e.key)) {
    e.preventDefault();
  }
});

document.getElementById("fullName").addEventListener("keypress", function (e) {
  if (!/[А-Яа-яЁёІіЇї ]/.test(e.key) && e.key !== ".") {
    e.preventDefault();
  }
});

document.getElementById("group").addEventListener("keypress", function (e) {
  if (!/[А-Яа-яЁёІіЇї0-9\-]/.test(e.key)) {
    e.preventDefault();
  }
}); */



function createTable() {
  const table = document.getElementById("colorTable");
  let number = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement("td");
      cell.textContent = number;
      cell.dataset.number = number; // Зберігаємо номер клітинки
      number++;

      // Додати обробники подій
      cell.addEventListener("click", changeColumnColors);

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Зміна кольору стовпців через один
function changeColumnColors() {
  const columnIndex = this.cellIndex; // Індекс вибраного стовпця
  const rows = document.querySelectorAll("#colorTable tr");

  rows.forEach((row) => {
    Array.from(row.cells).forEach((cell, index) => {
      if ((index - columnIndex) % 2 === 0) {
        cell.style.backgroundColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
    });
  });
}

// Створюємо таблицю при завантаженні сторінки
window.onload = createTable;

