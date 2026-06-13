import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ScrapItem from '@/models/ScrapItem';

export async function GET() {
  try {
    await dbConnect();
    const items = await ScrapItem.find().sort({ category: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
