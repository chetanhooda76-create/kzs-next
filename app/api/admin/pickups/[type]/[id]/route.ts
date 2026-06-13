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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    try {
      verifyAdminToken(req);
    } catch {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { type, id } = await params;

    if (!type || !id) {
      return NextResponse.json({ success: false, message: 'Type and ID are required' }, { status: 400 });
    }

    await dbConnect();
    if (type === 'household') {
      await HouseholdPickup.findByIdAndDelete(id);
    } else {
      await BusinessPickup.findByIdAndDelete(id);
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
