import { AddTedarikciService } from "@/Services/Supplier.Services";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await AddTedarikciService({ data: body });
  return Response.json({ ...result }, { status: result.statusCode });
}
