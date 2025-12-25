import { redirect } from 'next/navigation';

// Account features are disabled during pre-order phase
export async function GET() {
  redirect('/');
}
