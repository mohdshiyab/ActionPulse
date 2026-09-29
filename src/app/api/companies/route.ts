import { NextRequest, NextResponse } from 'next/server';
import { getCompaniesFromDatabase, updateCompanyStatusInDatabase } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const companies = await getCompaniesFromDatabase();
    return NextResponse.json({ success: true, companies });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }
    await updateCompanyStatusInDatabase(id, status);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database update failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
