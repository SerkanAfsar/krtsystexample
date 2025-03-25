import {
  DeleteProductService,
  UpdateProductService,
} from "@/Services/Product.Services";

import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const result = await DeleteProductService({ id });
  return Response.json({ ...result }, { status: result.statusCode });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const body = await req.json();
  const result = await UpdateProductService({ id, data: body });
  return Response.json({ ...result }, { status: result.statusCode });
}
