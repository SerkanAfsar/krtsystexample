import { AddCustomerService } from "@/Services/Customer.Service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await AddCustomerService({ data: body });
  return Response.json({ ...result }, { status: result.statusCode });
}
