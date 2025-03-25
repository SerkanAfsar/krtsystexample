import {
  DeleteTedarikciService,
  UpdateTedarikciService,
} from "@/Services/Supplier.Services";

import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const result = await DeleteTedarikciService({ id });
  return Response.json({ ...result }, { status: result.statusCode });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const body = await req.json();
  const result = await UpdateTedarikciService({ id, data: body });
  return Response.json({ ...result }, { status: result.statusCode });
}
