function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get values
  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const location = document.getElementById("location").value;
  const month = document.getElementById("month").value;
  const basic = Number(document.getElementById("basic").value || 0);

  // Calculations
  const pf = (basic * 12) / 100;
  const esic = (basic * 0.75) / 100;
  const totalDeduction = pf + esic;
  const netPay = basic - totalDeduction;

  // Clean PDF (NO SYMBOL ISSUE)
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);

  doc.text("SALARY SLIP", 80, 15);

  doc.text(`Name: ${name}`, 15, 30);
  doc.text(`Designation: ${designation}`, 15, 40);
  doc.text(`Location: ${location}`, 15, 50);
  doc.text(`Month: ${month}`, 15, 60);

  doc.line(15, 65, 195, 65);

  doc.text(`Basic & DA: Rs. ${basic.toFixed(2)}`, 15, 75);
  doc.text(`PF (12%): Rs. ${pf.toFixed(2)}`, 15, 85);
  doc.text(`ESIC (0.75%): Rs. ${esic.toFixed(2)}`, 15, 95);

  doc.line(15, 100, 195, 100);

  doc.text(`Net Pay (In Hand): Rs. ${netPay.toFixed(2)}`, 15, 115);

  doc.save("Salary_Slip.pdf");
}
