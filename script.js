function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let name = document.getElementById("name").value;
  let designation = document.getElementById("designation").value;
  let location = document.getElementById("location").value;
  let month = document.getElementById("month").value;
  let basic = Number(document.getElementById("basic").value);

  let pf = basic * 0.12;
  let esic = basic * 0.0075;
  let totalDed = pf + esic;
  let net = basic - totalDed;

  doc.text("SALARY SLIP", 80, 10);
  doc.text(`Name: ${name}`, 10, 25);
  doc.text(`Designation: ${designation}`, 10, 35);
  doc.text(`Location: ${location}`, 10, 45);
  doc.text(`Month: ${month}`, 10, 55);

  doc.text(`Basic & DA: ₹${basic}`, 10, 70);
  doc.text(`PF: ₹${pf.toFixed(2)}`, 10, 80);
  doc.text(`ESIC: ₹${esic.toFixed(2)}`, 10, 90);
  doc.text(`Net Pay: ₹${net.toFixed(2)}`, 10, 110);

  doc.save("Salary_Slip.pdf");
}
