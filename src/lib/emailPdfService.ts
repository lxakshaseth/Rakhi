import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

interface DemandPayload {
  sisterName: string;
  brotherName: string;
  selectedGifts: Record<string, string>;
  customDemand?: string;
  submittedAt: string;
}

export function generateRakhiPdf(payload: DemandPayload): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const darkText = '#1a030b';
  const sisterNameDisplay = (payload.sisterName || 'Didi').toUpperCase();
  const brotherNameDisplay = payload.brotherName || 'Akshat';

  // 1. Decorative Double Gold Border
  doc.setDrawColor(184, 134, 30);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, 190, 277);

  doc.setDrawColor(92, 13, 37);
  doc.setLineWidth(0.5);
  doc.rect(13, 13, 184, 271);

  // 2. Header Royal Banner
  doc.setFillColor(92, 13, 37);
  doc.rect(13, 13, 184, 32, 'F');

  doc.setTextColor(255, 246, 214);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('RAKSHA BANDHAN 2026', 105, 23, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(242, 203, 99);
  doc.text(`OFFICIAL DEMAND INVOICE OF: ${sisterNameDisplay}`, 105, 31, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(255, 246, 214);
  doc.setFont('helvetica', 'normal');
  doc.text("Legally Bonded by Sibling Court & Eternal Sacred Promises", 105, 39, { align: 'center' });

  // 3. Prominent User & Party Identification Box
  let y = 52;
  doc.setDrawColor(212, 175, 55);
  doc.setFillColor(254, 253, 247);
  doc.roundedRect(20, y, 170, 30, 3, 3, 'FD');

  doc.setTextColor(darkText);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Claimant / Sister Name:`, 25, y + 8);
  doc.setFontSize(11);
  doc.setTextColor(153, 27, 27); // Deep Red
  doc.text(`${payload.sisterName || 'Didi'} (Verified User)`, 72, y + 8);

  doc.setTextColor(darkText);
  doc.setFontSize(10);
  doc.text(`Payee / Brother:`, 25, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${brotherNameDisplay}`, 72, y + 16);

  doc.setFont('helvetica', 'bold');
  doc.text(`Submission Timestamp:`, 25, y + 24);
  doc.setFont('helvetica', 'normal');
  doc.text(`${new Date(payload.submittedAt).toLocaleString('en-IN')}`, 72, y + 24);

  // Status Badge
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(128, y + 6, 56, 18, 2, 2, 'FD');
  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('CEREMONY STATUS:', 156, y + 12, { align: 'center' });
  doc.text('100% COMPLETED', 156, y + 18, { align: 'center' });

  // 4. Ritual Certification Table
  y += 38;
  doc.setTextColor(92, 13, 37);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Sacred Ceremony Milestones Performed', 20, y);

  y += 5;
  doc.setFillColor(245, 235, 210);
  doc.rect(20, y, 170, 7, 'F');
  doc.setTextColor(darkText);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Ritual Step', 25, y + 5);
  doc.text('Performed By User', 95, y + 5);
  doc.text('Sacred Blessing', 140, y + 5);

  const rituals = [
    { name: 'Sacred Tilak & Akshat', status: `${payload.sisterName} applied kumkum & rice`, blessing: 'Long Life & Joy' },
    { name: 'Devotional Aarti Orbit', status: `${payload.sisterName} completed Diya rotation`, blessing: 'Auspicious Protection' },
    { name: 'Sacred Rakhi Tying', status: `${payload.sisterName} tied thread on wrist`, blessing: 'Eternal Brotherly Bond' },
  ];

  y += 7;
  rituals.forEach((r, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(254, 252, 245);
      doc.rect(20, y, 170, 6, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.text(r.name, 25, y + 4.5);
    doc.text(r.status, 95, y + 4.5);
    doc.text(r.blessing, 140, y + 4.5);
    y += 6;
  });

  // 5. Approved Demands Table
  y += 8;
  doc.setTextColor(92, 13, 37);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`2. Selected Gift Demands by ${payload.sisterName}`, 20, y);

  y += 5;
  doc.setFillColor(245, 235, 210);
  doc.rect(20, y, 170, 7, 'F');
  doc.setTextColor(darkText);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Category', 25, y + 5);
  doc.text('Selected Item / Demand', 80, y + 5);
  doc.text('Settlement Obligation', 145, y + 5);

  y += 7;
  const entries = Object.entries(payload.selectedGifts);

  if (entries.length === 0 && !payload.customDemand) {
    doc.setFont('helvetica', 'italic');
    doc.text('No specific items selected (All-inclusive Brother Love)', 25, y + 5);
    y += 8;
  } else {
    entries.forEach(([cat, val], idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(254, 252, 245);
        doc.rect(20, y, 170, 6, 'F');
      }
      doc.setFont('helvetica', 'bold');
      doc.text(cat.toUpperCase(), 25, y + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.text(String(val), 80, y + 4.5);
      doc.setTextColor(180, 83, 9);
      doc.text('Payable by Brother', 145, y + 4.5);
      doc.setTextColor(darkText);
      y += 6;
    });

    if (payload.customDemand && payload.customDemand.trim()) {
      doc.setFillColor(255, 241, 242);
      doc.rect(20, y, 170, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOM WISH', 25, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.text(payload.customDemand.trim(), 80, y + 5);
      doc.setTextColor(180, 83, 9);
      doc.text('High Priority ⭐', 145, y + 5);
      doc.setTextColor(darkText);
      y += 7;
    }
  }

  // 6. Terms & Binding Agreement
  y += 6;
  doc.setTextColor(92, 13, 37);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('3. Sibling Tribunal Legal Terms', 20, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70, 70, 70);
  const terms = [
    `1. ${payload.sisterName} holds the official Lifetime Trophy as the House Queen with 100% immunity.`,
    '2. The Brother is strictly prohibited from arguing, canceling food orders, or claiming remote control.',
    '3. All selected gifts, shopping carts, and cash amounts must be settled promptly with zero deductions.',
    '4. This digital certificate is bonded with eternal love, memories, and sacred Rakhi promises.',
  ];

  terms.forEach((term) => {
    doc.text(term, 20, y);
    y += 4;
  });

  // 7. Signature & Seal
  y += 7;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(20, y, 80, y);
  doc.line(130, y, 190, y);

  doc.setFontSize(9);
  doc.setTextColor(darkText);
  doc.setFont('helvetica', 'bold');
  doc.text(`${payload.sisterName}'s Digital Signature`, 50, y + 5, { align: 'center' });
  doc.text(`${brotherNameDisplay}'s Acceptance`, 160, y + 5, { align: 'center' });

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

export async function sendRakhiPdfEmail(payload: DemandPayload): Promise<{ success: boolean; messageId?: string }> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const recipient = process.env.RECIPIENT_EMAIL || 'lxakshatseth90@gmail.com';
  const sister = payload.sisterName || 'Didi';

  if (!user || !pass) {
    throw new Error('Email credentials (EMAIL_USER, EMAIL_PASS) not configured in .env');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });

  const pdfBuffer = generateRakhiPdf(payload);
  const safeFilename = `Rakhi_Demands_${sister.replace(/[^a-zA-Z0-9_-]/g, '_')}_2026.pdf`;

  const mailOptions = {
    from: `"Rakhi Surprise Vault" <${user}>`,
    to: recipient,
    subject: `🎁 [Rakhi 2026] ${sister}'s Official Gift Demands & Ceremony Invoice! ❤️`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #120207; color: #fbf6ea; padding: 25px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #d4af37;">
        <h1 style="color: #ffd700; text-align: center; font-size: 24px; margin-bottom: 5px;">👑 Raksha Bandhan 2026</h1>
        <p style="text-align: center; color: #f4ebd2; font-size: 15px; margin-top: 0; font-weight: bold;">
          Official Demand Report for: <span style="color: #ffd700;">${sister}</span>
        </p>
        <hr style="border: 0; height: 1px; background: #d4af37; margin: 20px 0;" />
        
        <p style="font-size: 16px;">Hey <strong>${payload.brotherName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6;">
          Your sister <strong style="color: #ffd700; font-size: 16px;">${sister}</strong> has successfully completed the digital Rakhi ceremony and finalized her official demands!
        </p>

        <div style="background-color: #2b0612; border: 1px solid #d4af37; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #ffd700; margin-top: 0;">📋 Demands Submitted by ${sister}:</h3>
          <ul style="padding-left: 20px; line-height: 1.8; color: #fff8e7;">
            ${Object.entries(payload.selectedGifts).map(([k, v]) => `<li><strong>${k.toUpperCase()}:</strong> ${v}</li>`).join('')}
            ${payload.customDemand ? `<li style="color: #fb7185;"><strong>SPECIAL WISH:</strong> ${payload.customDemand}</li>` : ''}
          </ul>
        </div>

        <p style="font-size: 13px; color: #e8d7ae;">
          📎 <strong>Attached:</strong> Official legal PDF invoice (<code>${safeFilename}</code>) registered in the name of <strong>${sister}</strong>.
        </p>
        
        <p style="margin-top: 25px; font-size: 14px; text-align: center; color: #ffd700;">
          Wishing ${sister} and you a very Happy Raksha Bandhan! ❤️🪢
        </p>
      </div>
    `,
    attachments: [
      {
        filename: safeFilename,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}
