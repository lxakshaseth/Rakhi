import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sisterName, brotherName, selectedGifts, cashAmount, customDemand, submittedAt } = body;

    if (!clientPromise) {
      // If MongoDB is not configured, return success with local acknowledgment
      return NextResponse.json({
        success: true,
        savedToDb: false,
        message: 'Saved locally (MongoDB not configured)',
      });
    }

    const client = await clientPromise;
    const db = client.db('rakhi_surprise');
    const collection = db.collection('gift_demands');

    const result = await collection.insertOne({
      sisterName: sisterName || 'Didi',
      brotherName: brotherName || 'Brother',
      selectedGifts: selectedGifts || [],
      cashAmount: cashAmount || 0,
      customDemand: customDemand || '',
      submittedAt: submittedAt || new Date().toISOString(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      savedToDb: true,
      insertedId: result.insertedId,
      message: 'Gift demand successfully registered in the Sister Wishlist Vault! 🎁',
    });
  } catch (error) {
    console.error('Error saving gift demand:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Could not connect to database, but request is processed.',
      },
      { status: 500 }
    );
  }
}
