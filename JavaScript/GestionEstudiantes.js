// script.js

document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentList = document.getElementById("studentList");
  
    // Función para cargar estudiantes desde localStorage
    function loadStudents() {
      const students = JSON.parse(localStorage.getItem("students")) || [];
      studentList.innerHTML = "";
      students.forEach((student, index) => {
        const studentEntry = document.createElement("div");
        studentEntry.classList.add("student-entry");
        studentEntry.innerHTML = `
          <strong>ID:</strong> ${student.id} |
          <strong>Nombre:</strong> ${student.name} |
          <strong>Fecha de Nacimiento:</strong> ${student.birthDate} |
          <strong>Email:</strong> ${student.email} |
          <strong>Teléfono:</strong> ${student.phone || "N/A"}
        `;
        studentList.appendChild(studentEntry);
      });
    }
  
    // Validar fecha de nacimiento (no permite fechas futuras)
    function validateBirthDate(date) {
      const today = new Date().toISOString().split("T")[0];
      return date <= today;
    }
  
    // Manejar el envío del formulario
    studentForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const id = document.getElementById("studentId").value;
      const name = document.getElementById("fullName").value;
      const birthDate = document.getElementById("birthDate").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
  
      // Validar fecha de nacimiento
      if (!validateBirthDate(birthDate)) {
        alert("La fecha de nacimiento no puede ser en el futuro.");
        return;
      }
  
      // Crear objeto de estudiante
      const newStudent = { id, name, birthDate, email, phone };
  
      // Guardar en localStorage
      const students = JSON.parse(localStorage.getItem("students")) || [];
      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));
  
      // Limpiar el formulario
      studentForm.reset();
  
      // Recargar la lista de estudiantes
      loadStudents();
    });
  
    // Cargar estudiantes al iniciar
    loadStudents();
  });
  