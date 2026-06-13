import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HouseholdPickup from '@/models/HouseholdPickup';
import BusinessPickup from '@/models/BusinessPickup';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

const verifyAdminToken = (req: Request) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) throw new Error('Access Denied');
  return jwt.verify(token, JWT_SECRET);
};

export async function GET(req: Request) {
  try {
    try {
      verifyAdminToken(req);
    } catch {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const household = await HouseholdPickup.find().sort({ createdAt: -1 });
    const business = await BusinessPickup.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: { household, business } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    try {
      verifyAdminToken(req);
    } catch {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id, type, ...updateData } = await req.json();

    if (!id || !type) {
      return NextResponse.json({ success: false, message: 'ID and type are required' }, { status: 400 });
    }

    let updated;
    if (type === 'household') {
      updated = await HouseholdPickup.findByIdAndUpdate(id, updateData, { new: true });
    } else {
      updated = await BusinessPickup.findByIdAndUpdate(id, updateData, { new: true });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
