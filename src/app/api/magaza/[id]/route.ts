import {
  DeleteMagazaService,
  UpdateMagazaService,
} from "@/Services/Magaza.Services";

import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const result = await DeleteMagazaService({ id });
  return Response.json({ ...result }, { status: result.statusCode });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const body = await req.json();
  const result = await UpdateMagazaService({ id, data: body });
  return Response.json({ ...result }, { status: result.statusCode });
}
