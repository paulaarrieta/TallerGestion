// script.js

document.addEventListener("DOMContentLoaded", () => {
    const programForm = document.getElementById("programForm");
    const programList = document.getElementById("programList");
  
    // Función para cargar programas desde localStorage
    function loadPrograms() {
      const programs = JSON.parse(localStorage.getItem("programs")) || [];
      programList.innerHTML = "";
      programs.forEach((program, index) => {
        const programEntry = document.createElement("div");
        programEntry.classList.add("program-entry");
        programEntry.innerHTML = `
          <strong>Código:</strong> ${program.code} |
          <strong>Nombre:</strong> ${program.name} |
          <strong>Duración:</strong> ${program.duration} semestres |
          <strong>Modalidad:</strong> ${program.modality} |
          <strong>Fecha de Inicio:</strong> ${program.startDate || "N/A"}
        `;
        programList.appendChild(programEntry);
      });
    }
  
    // Validar fecha de inicio (no permite fechas futuras)
    function validateStartDate(date) {
      const today = new Date().toISOString().split("T")[0];
      return date <= today;
    }
  
    // Manejar el envío del formulario
    programForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const code = document.getElementById("programCode").value;
      const name = document.getElementById("programName").value;
      const duration = document.getElementById("duration").value;
      const modality = document.getElementById("modality").value;
      const startDate = document.getElementById("startDate").value;
  
      // Validar fecha de inicio si se ingresa
      if (startDate && !validateStartDate(startDate)) {
        alert("La fecha de inicio no puede ser en el futuro.");
        return;
      }
  
      // Crear objeto de programa
      const newProgram = { code, name, duration, modality, startDate };
  
      // Guardar en localStorage
      const programs = JSON.parse(localStorage.getItem("programs")) || [];
      programs.push(newProgram);
      localStorage.setItem("programs", JSON.stringify(programs));
  
      // Limpiar el formulario
      programForm.reset();
  
      // Recargar la lista de programas
      loadPrograms();
    });
  
    // Cargar programas al iniciar
    loadPrograms();
  });
  