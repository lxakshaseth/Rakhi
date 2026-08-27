import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendRakhiPdfEmail } from '@/lib/emailPdfService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sisterName, brotherName, selectedGifts, cashAmount, customDemand, submittedAt } = body;

    const payload = {
      sisterName: sisterName || 'Didi',
      brotherName: brotherName || 'Akshat',
      selectedGifts: selectedGifts || {},
      customDemand: customDemand || '',
      submittedAt: submittedAt || new Date().toISOString(),
    };

    // 1. Save to MongoDB if available
    let insertedId = null;
    let savedToDb = false;

    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db('rakhi_surprise');
        const collection = db.collection('gift_demands');

        const result = await collection.insertOne({
          ...payload,
          cashAmount: cashAmount || 0,
          createdAt: new Date(),
        });
        insertedId = result.insertedId;
        savedToDb = true;
      } catch (dbError) {
        console.error('MongoDB error (continuing with email):', dbError);
      }
    }

    // 2. Generate PDF and send automated email via Gmail SMTP
    let emailSent = false;
    let emailMessage = '';

    try {
      await sendRakhiPdfEmail(payload);
      emailSent = true;
      emailMessage = 'PDF demand report successfully emailed to Brother!';
    } catch (emailError) {
      console.error('Email error:', emailError);
      emailMessage = 'Could not send email automatically (check SMTP credentials).';
    }

    return NextResponse.json({
      success: true,
      savedToDb,
      emailSent,
      insertedId,
      message: emailSent
        ? 'Gift demand registered & official PDF invoice emailed to brother! 💌'
        : 'Gift demand registered successfully! 🎁',
    });
  } catch (error) {
    console.error('Error processing gift demand:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal error processing gift demand.',
      },
      { status: 500 }
    );
  }
}
