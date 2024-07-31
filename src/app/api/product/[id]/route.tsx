import { UpdateProductApiService } from "@/ApiServices/Products.ApiService";
import {
  DeleteProductService,
  GetProductService,
  UpdateProductService,
} from "@/Services/Product.Services";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const result = await DeleteProductService({ id });
  return Response.json({ ...result }, { status: result.statusCode });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const body = await req.json();
  const result = await UpdateProductService({ id, data: body });
  return Response.json({ ...result }, { status: result.statusCode });
}
