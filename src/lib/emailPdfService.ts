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

  const primaryColor = '#5c0d25'; // Maroon
  const goldColor = '#b8861e'; // Antique Gold
  const darkText = '#1a030b';

  // 1. Decorative Border
  doc.setDrawColor(184, 134, 30);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, 190, 277);

  doc.setDrawColor(92, 13, 37);
  doc.setLineWidth(0.5);
  doc.rect(13, 13, 184, 271);

  // 2. Header Banner
  doc.setFillColor(92, 13, 37);
  doc.rect(13, 13, 184, 28, 'F');

  doc.setTextColor(255, 246, 214);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('RAKSHA BANDHAN 2026', 105, 24, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text("Official Sister Gift Demands & Ceremony Invoice", 105, 33, { align: 'center' });

  // 3. Parties & Date Info Box
  let y = 50;
  doc.setDrawColor(212, 175, 55);
  doc.setFillColor(254, 253, 247);
  doc.roundedRect(20, y, 170, 26, 3, 3, 'FD');

  doc.setTextColor(darkText);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Sister (Claimant):`, 25, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${payload.sisterName}`, 60, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.text(`Brother (Payee):`, 110, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${payload.brotherName}`, 145, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.text(`Submission Date:`, 25, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(`${new Date(payload.submittedAt).toLocaleString('en-IN')}`, 60, y + 18);

  doc.setFont('helvetica', 'bold');
  doc.text(`Ceremony Status:`, 110, y + 18);
  doc.setTextColor(22, 101, 52); // Green
  doc.text(`100% Completed & Verified`, 145, y + 18);

  // 4. Ritual Certification Table
  y += 36;
  doc.setTextColor(92, 13, 37);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('1. Sacred Ceremony Milestones', 20, y);

  y += 6;
  doc.setFillColor(245, 235, 210);
  doc.rect(20, y, 170, 7, 'F');
  doc.setTextColor(darkText);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Ritual', 25, y + 5);
  doc.text('Status', 100, y + 5);
  doc.text('Blessings', 140, y + 5);

  const rituals = [
    { name: 'Sacred Tilak & Akshat', status: 'Applied with Pure Kumkum', blessing: 'Long Life & Joy' },
    { name: 'Devotional Aarti Orbit', status: 'Successfully Revolving Diya', blessing: 'Negative Energies Warded' },
    { name: 'Sacred Rakhi Tying', status: 'Tied Securely on Wrist', blessing: 'Eternal Brotherly Bond' },
  ];

  y += 7;
  rituals.forEach((r, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(254, 252, 245);
      doc.rect(20, y, 170, 6, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.text(r.name, 25, y + 4.5);
    doc.text(r.status, 100, y + 4.5);
    doc.text(r.blessing, 140, y + 4.5);
    y += 6;
  });

  // 5. Approved Demands Table
  y += 8;
  doc.setTextColor(92, 13, 37);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text("2. Didi's Approved Gift Demands", 20, y);

  y += 6;
  doc.setFillColor(245, 235, 210);
  doc.rect(20, y, 170, 7, 'F');
  doc.setTextColor(darkText);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Category', 25, y + 5);
  doc.text('Selected Item / Demand', 75, y + 5);
  doc.text('Obligation Status', 145, y + 5);

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
      doc.text(String(val), 75, y + 4.5);
      doc.setTextColor(180, 83, 9);
      doc.text('Payable by Brother', 145, y + 4.5);
      doc.setTextColor(darkText);
      y += 6.5;
    });

    if (payload.customDemand && payload.customDemand.trim()) {
      doc.setFillColor(255, 241, 242);
      doc.rect(20, y, 170, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOM WISH', 25, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.text(payload.customDemand.trim(), 75, y + 5);
      doc.setTextColor(180, 83, 9);
      doc.text('High Priority ⭐', 145, y + 5);
      doc.setTextColor(darkText);
      y += 8;
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
    '1. As determined by the Sibling Quiz, Didi holds the undisputed Lifetime Trophy as the House Queen.',
    '2. The Brother is strictly prohibited from arguing, canceling food orders, or claiming remote control.',
    '3. All selected gifts, shopping carts, and cash amounts must be settled promptly with zero deductions.',
    '4. This digital certificate is bonded with eternal love, memories, and sacred Rakhi promises.',
  ];

  terms.forEach((term) => {
    doc.text(term, 20, y);
    y += 4;
  });

  // 7. Signature & Seal
  y += 8;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(20, y, 80, y);
  doc.line(130, y, 190, y);

  doc.setFontSize(9);
  doc.setTextColor(darkText);
  doc.setFont('helvetica', 'bold');
  doc.text("Didi's Digital Signature", 50, y + 5, { align: 'center' });
  doc.text("Brother's Acceptance", 160, y + 5, { align: 'center' });

  // Output as Buffer
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

export async function sendRakhiPdfEmail(payload: DemandPayload): Promise<{ success: boolean; messageId?: string }> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const recipient = process.env.RECIPIENT_EMAIL || 'lxakshatseth90@gmail.com';

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

  const mailOptions = {
    from: `"Rakhi Surprise Vault" <${user}>`,
    to: recipient,
    subject: `🎁 [Rakhi 2026] Didi's Official Gift Demands & Ceremony Invoice! ❤️`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #120207; color: #fbf6ea; padding: 25px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #d4af37;">
        <h1 style="color: #ffd700; text-align: center; font-size: 24px; margin-bottom: 5px;">👑 Raksha Bandhan 2026</h1>
        <p style="text-align: center; color: #f4ebd2; font-size: 14px; margin-top: 0;">Official Digital Gift Demand & Ritual Certification</p>
        <hr style="border: 0; height: 1px; background: #d4af37; margin: 20px 0;" />
        
        <p style="font-size: 16px;">Hey <strong>${payload.brotherName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.6;">
          Your sister <strong>${payload.sisterName}</strong> has just completed the interactive Rakhi ceremony (Tilak, Aarti &amp; Rakhi tying) and finalized her official gift demands!
        </p>

        <div style="background-color: #2b0612; border: 1px solid #d4af37; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #ffd700; margin-top: 0;">📋 Quick Demands Summary:</h3>
          <ul style="padding-left: 20px; line-height: 1.8; color: #fff8e7;">
            ${Object.entries(payload.selectedGifts).map(([k, v]) => `<li><strong>${k.toUpperCase()}:</strong> ${v}</li>`).join('')}
            ${payload.customDemand ? `<li style="color: #fb7185;"><strong>SPECIAL WISH:</strong> ${payload.customDemand}</li>` : ''}
          </ul>
        </div>

        <p style="font-size: 13px; color: #e8d7ae;">
          📎 <strong>Attached:</strong> Complete official legal PDF invoice (<code>Rakhi_Demands_Didi_2026.pdf</code>) with all ritual timestamps and signed terms.
        </p>
        
        <p style="margin-top: 25px; font-size: 14px; text-align: center; color: #ffd700;">
          Wishing you both a very Happy Raksha Bandhan! ❤️🪢
        </p>
      </div>
    `,
    attachments: [
      {
        filename: `Rakhi_Demands_${payload.sisterName}_2026.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}
