function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  // INPUTS
  const name = document.getElementById("name").value || "";
  const designation = document.getElementById("designation").value || "";
  const location = document.getElementById("location").value || "";
  const month = document.getElementById("month").value || "";
  const days = document.getElementById("days").value || "";
  const basic = Number(document.getElementById("basic").value || 0);

  // EPF CALCULATION (MAX 15000)
  const pfBase = Math.min(basic, 15000);
  const pf = pfBase * 0.12;

  // ESIC (0.75%)
  const esic = basic * 0.0075;

  const totalDeduction = pf + esic;
  const netPay = basic - totalDeduction;

  // FONT SAFE
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  // HEADER
  doc.text("SALARY SLIP", 90, 15);

  // EMPLOYEE DETAILS
  doc.text("Name: " + name, 15, 30);
  doc.text("Designation: " + designation, 15, 38);
  doc.text("Location: " + location, 15, 46);
  doc.text("Month: " + month, 130, 30);
  doc.text("Working Days: " + days, 130, 38);

  doc.line(15, 50, 195, 50);

  // EARNINGS
  doc.text("EARNINGS", 15, 60);
  doc.text("Basic & DA", 15, 70);
  doc.text("Rs. " + basic.toFixed(2), 160, 70);

  doc.text("GROSS SALARY", 15, 82);
  doc.text("Rs. " + basic.toFixed(2), 160, 82);

  doc.line(15, 88, 195, 88);

  // DEDUCTIONS
  doc.text("DEDUCTIONS", 15, 98);
  doc.text("PF (12% max 15000)", 15, 108);
  doc.text("Rs. " + pf.toFixed(2), 160, 108);

  doc.text("ESIC (0.75%)", 15, 118);
  doc.text("Rs. " + esic.toFixed(2), 160, 118);

  doc.text("TOTAL DEDUCTION", 15, 130);
  doc.text("Rs. " + totalDeduction.toFixed(2), 160, 130);

  doc.line(15, 135, 195, 135);

  // NET PAY
  doc.text("NET PAY (IN HAND)", 15, 148);
  doc.text("Rs. " + netPay.toFixed(2), 160, 148);

  doc.line(15, 155, 195, 155);

  // COMPANY
  doc.text("M/S PARASHAM MANPOWER SERVICES PVT LTD.", 15, 170);
  doc.text("Danapur, Patna (Bihar)", 15, 178);

  doc.text("Authorised Signatory", 150, 190);

  doc.save("Salary_Slip.pdf");
}
