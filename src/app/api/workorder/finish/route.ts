import { FinishWorkOrderById } from "@/Services/WorkOrder.Services";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { id, store_id, image } = await req.json();
  const result = await FinishWorkOrderById({
    work_order_id: id,
    store_id,
    image,
  });
  return Response.json({ ...result }, { status: result.statusCode });
}
