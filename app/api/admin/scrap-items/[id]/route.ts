import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ScrapItem from '@/models/ScrapItem';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

const JWT_SECRET = process.env.JWT_SECRET!;

const verifyAdminToken = (req: Request) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) throw new Error('Access Denied');
  return jwt.verify(token, JWT_SECRET);
};

const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    try {
      verifyAdminToken(req);
    } catch {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const unit = formData.get('unit') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const file = formData.get('image') as File;

    const updateData: any = { name, unit, price, category };
    
    if (file && file.size > 0) {
      if (hasCloudinary) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const uploadPromise = new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload_stream({
            folder: 'kzs_scrap_items',
          }, (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || '');
          }).end(buffer);
        });
        
        const imageUrl = await uploadPromise;
        if (imageUrl) {
          updateData.image = imageUrl;
        }
      } else {
        updateData.image = 'https://via.placeholder.com/150';
      }
    }

    const updated = await ScrapItem.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    try {
      verifyAdminToken(req);
    } catch {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    await ScrapItem.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
