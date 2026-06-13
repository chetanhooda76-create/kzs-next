import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return NextResponse.json({
      success: true,
      user: { name: decoded.name, email: decoded.email },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Token expired or invalid' },
      { status: 401 }
    );
  }
}
