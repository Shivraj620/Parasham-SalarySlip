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

  const marginTop = 19.05;
  const marginBottom = 19.05;
  const marginLeft = 17.78;
  const marginRight = 17.78;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - marginLeft - marginRight;

  const leftX = marginLeft;
  const rightX = pageWidth - marginRight;
  const centerX = leftX + contentWidth / 2;
  const borderTop = marginTop;

  doc.setLineWidth(0.3);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("M/S PARASHAM MANPOWER SERVICES PVT LTD.", centerX, borderTop + 10, { align: "center" });
  doc.line(leftX, borderTop + 15, rightX, borderTop + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.3);
  doc.text("SHIBU KUNJ ARYA SAMAJ MANDIR ROAD, LANE NO 21 RPS MORE DANAPUR,", leftX + 4, borderTop + 22);
  doc.text("DISTRICT-PATNA (BIHAR)-801503", leftX + 4, borderTop + 27.5);
  doc.text("Mob No- 7070376333", leftX + 4, borderTop + 33);
  doc.line(leftX, borderTop + 36.5, rightX, borderTop + 36.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.8);
  doc.text("Employee Details", leftX + 1.2, borderTop + 43);
  doc.line(leftX, borderTop + 46, rightX, borderTop + 46);

  const colA = leftX;
  const colB = leftX + contentWidth * 0.285;
  const colC = leftX + contentWidth * 0.507;
  const colD = leftX + contentWidth * 0.760;
  const colE = rightX;

  [colB, colC, colD].forEach((x) => {
    doc.line(x, borderTop + 46, x, borderTop + 74);
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.6);

  const row1Y = borderTop + 52.5;
  const row2Y = borderTop + 59.5;
  const row3Y = borderTop + 66.5;

  doc.text("Employee Name :", colA + 4, row1Y);
  doc.text(data.name || "-", colB + 1.2, row1Y, { maxWidth: colC - colB - 2 });
  doc.text("Location :", colC + 22, row1Y);
  doc.text(data.location || "-", colD + 1.2, row1Y, { maxWidth: colE - colD - 2 });
  doc.line(leftX, borderTop + 54.5, rightX, borderTop + 54.5);

  doc.text("Designation :", colA + 4, row2Y);
  doc.text(data.designation || "-", colB + 1.2, row2Y, { maxWidth: colC - colB - 2 });
  doc.line(leftX, borderTop + 61.5, rightX, borderTop + 61.5);

  doc.text("Month :", colA + 4, row3Y);
  doc.text(data.month || "-", colB + 1.2, row3Y, { maxWidth: colC - colB - 2 });
  doc.line(leftX, borderTop + 68.5, rightX, borderTop + 68.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  doc.text("Earnings", (colA + colC) / 2, borderTop + 76.5, { align: "center" });
  doc.text("Deduction", (colC + colE) / 2, borderTop + 76.5, { align: "center" });
  doc.line(colC, borderTop + 68.5, colC, borderTop + 110.5);
  doc.line(leftX, borderTop + 80, rightX, borderTop + 80);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);

  const left = [
    ["Working Day", String(data.days)],
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

  let rowTop = borderTop + 80;
  for (let i = 0; i < left.length; i += 1) {
    const baseY = rowTop + 5.8;
    doc.text(left[i][0], colA + 4, baseY);
    doc.text(left[i][1], colC - 4, baseY, { align: "right" });
    doc.text(right[i][0], colC + 4, baseY);
    doc.text(right[i][1], colE - 4, baseY, { align: "right" });
    rowTop += 8.2;
    doc.line(leftX, rowTop, rightX, rowTop);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const netY = rowTop + 6.6;
  doc.text("Net Pay (In Hand)", (colA + colC) / 2, netY, { align: "center" });
  doc.text(fmt(data.net), (colC + colE) / 2, netY, { align: "center" });

  const borderBottom = rowTop + 10;
  doc.rect(leftX, borderTop, contentWidth, borderBottom - borderTop);
  doc.line(colC, borderTop + 68.5, colC, borderBottom);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const signatureY = Math.min(borderBottom + 26, pageHeight - marginBottom);
  doc.text("Employer Signature / Authrozied Signatory", leftX + 1, signatureY);

  doc.save(`Salary_Slip_${(data.name || "Employee").replace(/\s+/g, "_")}.pdf`);
}

document.getElementById("previewBtn").addEventListener("click", updatePreview);
document.getElementById("pdfBtn").addEventListener("click", generatePDF);

ids.forEach((id) => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

updatePreview();
