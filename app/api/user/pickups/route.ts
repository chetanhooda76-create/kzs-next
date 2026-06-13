import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import jwt from 'jsonwebtoken';
import HouseholdPickup from '@/models/HouseholdPickup';
import BusinessPickup from '@/models/BusinessPickup';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Access Denied' },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid Token' },
        { status: 400 }
      );
    }

    await dbConnect();
    const email = decoded.email;

    const household = await HouseholdPickup.find({ email }).sort({ createdAt: -1 });
    const business = await BusinessPickup.find({ email }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: { household, business }
    });
  } catch (error: any) {
    console.error('User Pickups API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
