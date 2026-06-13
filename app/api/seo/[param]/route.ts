import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SEOData from '@/models/SEOData';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params;
    await dbConnect();
    
    // Try to find by page name first
    let data = await SEOData.findOne({ page: param });
    
    // If not found and the parameter is a valid Mongoose ObjectId, try by ID
    if (!data && param.match(/^[0-9a-fA-F]{24}$/)) {
      data = await SEOData.findById(param);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  try {
    const { param } = await params;
    await dbConnect();
    
    if (param.match(/^[0-9a-fA-F]{24}$/)) {
      await SEOData.findByIdAndDelete(param);
    } else {
      await SEOData.findOneAndDelete({ page: param });
    }
    
    return NextResponse.json({ success: true, message: 'SEO record deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
