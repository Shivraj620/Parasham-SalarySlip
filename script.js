function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  // Inputs
  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const location = document.getElementById("location").value;
  const month = document.getElementById("month").value;
  const basic = Number(document.getElementById("basic").value || 0);

  // Calculations
  const pf = (basic * 12) / 100;
  const esic = (basic * 0.75) / 100;
  const net = basic - pf - esic;

  // Font (SAFE)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text("SALARY SLIP", 85, 15);

  doc.text("Name: " + name, 20, 35);
  doc.text("Designation: " + designation, 20, 45);
  doc.text("Location: " + location, 20, 55);
  doc.text("Month: " + month, 20, 65);

  doc.line(20, 70, 190, 70);

  doc.text("Basic & DA: Rs. " + basic.toFixed(2), 20, 85);
  doc.text("PF (12%): Rs. " + pf.toFixed(2), 20, 95);
  doc.text("ESIC (0.75%): Rs. " + esic.toFixed(2), 20, 105);

  doc.line(20, 110, 190, 110);

  doc.text("Net Pay (In Hand): Rs. " + net.toFixed(2), 20, 125);

  doc.save("Salary_Slip.pdf");
}
