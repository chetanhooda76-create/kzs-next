import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SEOData from '@/models/SEOData';

export async function GET() {
  try {
    await dbConnect();
    const data = await SEOData.find();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { page, title, description, keywords, author, ogImage } = await req.json();

    if (!page || !title || !description) {
      return NextResponse.json(
        { success: false, message: 'Page, title and description are required' },
        { status: 400 }
      );
    }

    const data = await SEOData.findOneAndUpdate(
      { page },
      { title, description, keywords, author, ogImage },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
