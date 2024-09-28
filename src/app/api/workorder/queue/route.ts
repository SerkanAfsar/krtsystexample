import { GetNextOrderWorkOrderCode } from "@/Services/WorkOrder.Services";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await GetNextOrderWorkOrderCode({ code: body });

  return Response.json({ ...result }, { status: result.statusCode });
}
