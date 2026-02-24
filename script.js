function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const location = document.getElementById("location").value;
  const month = document.getElementById("month").value;
  const days = document.getElementById("days").value;
  const basic = Number(document.getElementById("basic").value || 0);

  const pf = basic * 0.12;
  const esic = basic * 0.0075;
  const totalDeduction = pf + esic;
  const netPay = basic - totalDeduction;

  doc.setFont("helvetica");
  doc.setFontSize(12);

  doc.text("SALARY SLIP", 85, 15);

  doc.text("Employee Name: " + name, 15, 30);
  doc.text("Designation: " + designation, 15, 38);
  doc.text("Duty Location: " + location, 15, 46);
  doc.text("Month: " + month, 130, 30);
  doc.text("Working Days: " + days, 130, 38);

  doc.line(15, 50, 195, 50);

  doc.text("EARNINGS", 15, 60);
  doc.text("Basic & DA", 15, 68);
  doc.text("Rs. " + basic.toFixed(2), 150, 68);

  doc.text("GROSS SALARY", 15, 80);
  doc.text("Rs. " + basic.toFixed(2), 150, 80);

  doc.line(15, 85, 195, 85);

  doc.text("DEDUCTIONS", 15, 95);
  doc.text("PF (12%)", 15, 103);
  doc.text("Rs. " + pf.toFixed(2), 150, 103);

  doc.text("ESIC (0.75%)", 15, 111);
  doc.text("Rs. " + esic.toFixed(2), 150, 111);

  doc.text("TOTAL DEDUCTION", 15, 123);
  doc.text("Rs. " + totalDeduction.toFixed(2), 150, 123);

  doc.line(15, 128, 195, 128);

  doc.text("NET PAY (IN HAND)", 15, 140);
  doc.text("Rs. " + netPay.toFixed(2), 150, 140);

  doc.line(15, 150, 195, 150);

  doc.text("M/S PARASHAM MANPOWER SERVICES PVT LTD.", 15, 165);
  doc.text("Danapur, Patna (Bihar)", 15, 173);

  doc.text("Authorised Signatory", 150, 185);

  doc.save("Salary_Slip.pdf");
}
