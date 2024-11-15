// script.js

document.addEventListener("DOMContentLoaded", () => {
    const enrollmentForm = document.getElementById("enrollmentForm");
    const enrollmentList = document.getElementById("enrollmentList");
  
    // Cargar estudiantes y programas existentes desde localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const programs = JSON.parse(localStorage.getItem("programs")) || [];
  
    // Función para cargar matrículas desde localStorage
    function loadEnrollments() {
      const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
      enrollmentList.innerHTML = "";
      enrollments.forEach((enrollment, index) => {
        const enrollmentEntry = document.createElement("div");
        enrollmentEntry.classList.add("enrollment-entry");
        enrollmentEntry.innerHTML = `
          <strong>ID Matrícula:</strong> ${enrollment.enrollmentId} |
          <strong>ID Estudiante:</strong> ${enrollment.studentId} |
          <strong>Código Programa:</strong> ${enrollment.programCode} |
          <strong>Fecha de Matrícula:</strong> ${enrollment.enrollmentDate} |
          <strong>Estado:</strong> ${enrollment.status}
        `;
        enrollmentList.appendChild(enrollmentEntry);
      });
    }
  
    // Validar fecha de matrícula (debe ser hoy o futura)
    function validateEnrollmentDate(date) {
      const today = new Date().toISOString().split("T")[0];
      return date >= today;
    }
  
    // Función para verificar si el estudiante existe
    function studentExists(studentId) {
      return students.some(student => student.id === studentId);
    }
  
    // Función para verificar si el programa existe
    function programExists(programCode) {
      return programs.some(program => program.code === programCode);
    }
  
    // Manejar el envío del formulario
    enrollmentForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const enrollmentId = document.getElementById("enrollmentId").value;
      const studentId = document.getElementById("studentId").value;
      const programCode = document.getElementById("programCode").value;
      const enrollmentDate = document.getElementById("enrollmentDate").value;
      const status = document.getElementById("status").value;
  
      // Verificar si el estudiante y el programa existen
      if (!studentExists(studentId)) {
        alert("El estudiante con el ID proporcionado no está registrado.");
        return;
      }
      if (!programExists(programCode)) {
        alert("El programa con el código proporcionado no está registrado.");
        return;
      }
  
      // Validar fecha de matrícula
      if (!validateEnrollmentDate(enrollmentDate)) {
        alert("La fecha de matrícula debe ser hoy o en el futuro.");
        return;
      }
  
      // Crear objeto de matrícula
      const newEnrollment = { enrollmentId, studentId, programCode, enrollmentDate, status };
  
      // Guardar en localStorage
      const enrollments = JSON.parse(localStorage.getItem("enrollments")) || [];
      enrollments.push(newEnrollment);
      localStorage.setItem("enrollments", JSON.stringify(enrollments));
  
      // Limpiar el formulario
      enrollmentForm.reset();
  
      // Recargar la lista de matrículas
      loadEnrollments();
    });
  
    // Cargar matrículas al iniciar
    loadEnrollments();
  });
  