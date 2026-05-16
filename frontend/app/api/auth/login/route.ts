import { NextRequest, NextResponse } from 'next/server';
import type { User, AuthResponse } from '@/src/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    const data = await response.json();

    // Transformer la réponse backend en réponse frontend
    const authResponse: AuthResponse = {
      user: data.user,
      token: data.token,
      type: 'bearer',
    };

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
