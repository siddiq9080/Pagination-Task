document.addEventListener("DOMContentLoaded", function () {
  const paginationContainer = document.getElementById("pagination-container");

  // Create title
  const title = document.createElement("h1");
  title.id = "title";
  title.textContent = "Pagination Example";
  paginationContainer.appendChild(title);

  // Create description
  const description = document.createElement("p");
  description.id = "description";
  description.textContent =
    "This example demonstrates a pagination component created using JavaScript.";
  paginationContainer.appendChild(description);

  // Create table container
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-responsive";
  paginationContainer.appendChild(tableContainer);

  // Create table
  const table = document.createElement("table");
  table.className = "table table-bordered";
  tableContainer.appendChild(table);

  // Create table header
  const thead = document.createElement("thead");
  table.appendChild(thead);

  const headerRow = document.createElement("tr");
  thead.appendChild(headerRow);

  const headers = ["#", "Name", "Age"];
  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  // Create table body
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  // Create pagination buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "buttons";
  buttonsContainer.className = "d-flex justify-content-center";
  paginationContainer.appendChild(buttonsContainer);

  // Sample data
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Name ${i + 1}`,
    age: 20 + (i % 30),
  }));

  const itemsPerPage = 10;
  let currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  function renderTable(page) {
    tbody.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach((item) => {
      const row = document.createElement("tr");
      Object.values(item).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
  }

  function createPagination() {
    buttonsContainer.innerHTML = "";

    const createButton = (text, disabled, onClick) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.className = "btn btn-primary mx-1";
      button.disabled = disabled;
      button.addEventListener("click", onClick);
      return button;
    };

    // First button
    buttonsContainer.appendChild(
      createButton("First", currentPage === 1, () => {
        currentPage = 1;
        updatePagination();
      })
    );

    // Previous button
    buttonsContainer.appendChild(
      createButton("Previous", currentPage === 1, () => {
        currentPage--;
        updatePagination();
      })
    );

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      buttonsContainer.appendChild(
        createButton(i, currentPage === i, () => {
          currentPage = i;
          updatePagination();
        })
      );
    }

    // Next button
    buttonsContainer.appendChild(
      createButton("Next", currentPage === totalPages, () => {
        currentPage++;
        updatePagination();
      })
    );

    // Last button
    buttonsContainer.appendChild(
      createButton("Last", currentPage === totalPages, () => {
        currentPage = totalPages;
        updatePagination();
      })
    );
  }

  function updatePagination() {
    renderTable(currentPage);
    createPagination();
  }

  // Initial render
  updatePagination();
});
