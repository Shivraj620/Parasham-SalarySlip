const ids = [
  "name",
  "designation",
  "location",
  "month",
  "days",
  "basic",
  "uniformAllowance",
  "relievingCharge",
  "uniformDeduction",
  "advance",
];

function asNumber(id) {
  return Number(document.getElementById(id).value || 0);
}

function fmt(value) {
  return Number(value).toFixed(2);
}

function calculateSlip() {
  const data = {
    name: document.getElementById("name").value.trim(),
    designation: document.getElementById("designation").value.trim(),
    location: document.getElementById("location").value.trim(),
    month: document.getElementById("month").value.trim(),
    days: asNumber("days"),
    basic: asNumber("basic"),
    uniformAllowance: asNumber("uniformAllowance"),
    relievingCharge: asNumber("relievingCharge"),
    uniformDeduction: asNumber("uniformDeduction"),
    advance: asNumber("advance"),
  };

  data.pf = Math.min(data.basic, 15000) * 0.12;
  data.esic = data.basic * 0.0075;
  data.gross = data.basic + data.uniformAllowance + data.relievingCharge;
  data.totalDeduction = data.pf + data.esic + data.uniformDeduction + data.advance;
  data.net = data.gross - data.totalDeduction;

  return data;
}

function updatePreview() {
  const data = calculateSlip();

  document.getElementById("sName").textContent = data.name || "-";
  document.getElementById("sDesignation").textContent = data.designation || "-";
  document.getElementById("sLocation").textContent = data.location || "-";
  document.getElementById("sMonth").textContent = data.month || "-";

  document.getElementById("sDays").textContent = data.days;
  document.getElementById("sBasic").textContent = fmt(data.basic);
  document.getElementById("sUniformAllowance").textContent = fmt(data.uniformAllowance);
  document.getElementById("sRelievingCharge").textContent = fmt(data.relievingCharge);
  document.getElementById("sGross").textContent = fmt(data.gross);

  document.getElementById("sPf").textContent = fmt(data.pf);
  document.getElementById("sEsic").textContent = fmt(data.esic);
  document.getElementById("sUniformDeduction").textContent = fmt(data.uniformDeduction);
  document.getElementById("sAdvance").textContent = fmt(data.advance);
  document.getElementById("sTotalDeduction").textContent = fmt(data.totalDeduction);

  document.getElementById("sNet").textContent = fmt(data.net);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const data = calculateSlip();
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("M/S PARASHAM MANPOWER SERVICES PVT LTD.", 15, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("SHIBU KUNJ ARYA SAMAJ MANDIR ROAD, LANE NO 21 RPS MORE", 15, 20);
  doc.text("DANAPUR, DISTRICT-PATNA (BIHAR)-801503", 15, 25);
  doc.text("Mob No- 7070376333", 15, 30);

  doc.setLineWidth(0.3);
  doc.rect(12, 8, 186, 188);
  doc.line(12, 34, 198, 34);

  doc.setFont("helvetica", "bold");
  doc.text("Employee Details", 15, 41);
  doc.setFont("helvetica", "normal");
  doc.text(`Employee Name: ${data.name || "-"}`, 15, 48);
  doc.text(`Location: ${data.location || "-"}`, 120, 48);
  doc.text(`Designation: ${data.designation || "-"}`, 15, 55);
  doc.text(`Month: ${data.month || "-"}`, 15, 62);
  doc.line(12, 66, 198, 66);

  doc.setFont("helvetica", "bold");
  doc.text("Earnings", 55, 73);
  doc.text("Deduction", 145, 73);
  doc.line(105, 66, 105, 170);

  doc.setFont("helvetica", "normal");
  const left = [
    ["Working Day", data.days],
    ["Basic & DA", fmt(data.basic)],
    ["Uniform Allowance", fmt(data.uniformAllowance)],
    ["Relieving Charge", fmt(data.relievingCharge)],
    ["Gross Salary", fmt(data.gross)],
  ];
  const right = [
    ["PF", fmt(data.pf)],
    ["ESIC", fmt(data.esic)],
    ["Uniform", fmt(data.uniformDeduction)],
    ["Advance", fmt(data.advance)],
    ["Total Deduction", fmt(data.totalDeduction)],
  ];

  let y = 82;
  for (let i = 0; i < left.length; i += 1) {
    doc.text(String(left[i][0]), 15, y);
    doc.text(String(left[i][1]), 95, y, { align: "right" });
    doc.text(String(right[i][0]), 110, y);
    doc.text(String(right[i][1]), 195, y, { align: "right" });
    y += 10;
    doc.line(12, y - 4, 198, y - 4);
  }

  doc.setFont("helvetica", "bold");
  doc.text("Net Pay (In Hand)", 15, 140);
  doc.text(fmt(data.net), 195, 140, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.text("Employer Signature / Authorized Signatory", 15, 188);

  doc.save(`Salary_Slip_${(data.name || "Employee").replace(/\s+/g, "_")}.pdf`);
}

document.getElementById("previewBtn").addEventListener("click", updatePreview);
document.getElementById("pdfBtn").addEventListener("click", generatePDF);

ids.forEach((id) => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

updatePreview();
