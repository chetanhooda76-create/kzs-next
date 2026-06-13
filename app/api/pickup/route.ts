import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HouseholdPickup from '@/models/HouseholdPickup';
import BusinessPickup from '@/models/BusinessPickup';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary only if environment variables exist
const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const email = formData.get('email') as string || '';
    const service = formData.get('service') as string || '';
    const coordsStr = formData.get('coords') as string;

    if (!name || !phone || !address || !type) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    let coords = null;
    if (coordsStr) {
      try {
        coords = JSON.parse(coordsStr);
      } catch (e) {
        console.error('Error parsing coords:', e);
      }
    }

    // Process uploaded images
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        if (hasCloudinary) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          const uploadPromise = new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload_stream({
              folder: 'kzs_pickups',
            }, (error, result) => {
              if (error) reject(error);
              else resolve(result?.secure_url || '');
            }).end(buffer);
          });
          
          const secureUrl = await uploadPromise;
          if (secureUrl) imageUrls.push(secureUrl);
        } else {
          // If no Cloudinary config, save a placeholder or use data URL (not recommended for large files but good for tests)
          imageUrls.push('https://via.placeholder.com/150');
        }
      }
    }

    const saveData = {
      name,
      phone,
      address,
      email,
      service,
      images: imageUrls,
      coords,
    };

    let pickup;
    if (type === 'household') {
      pickup = await HouseholdPickup.create(saveData);
    } else if (type === 'business') {
      pickup = await BusinessPickup.create(saveData);
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid pickup type' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: pickup });
  } catch (error: any) {
    console.error('SERVER ERROR DURING PICKUP CREATION:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
