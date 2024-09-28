import { AuthMeService } from "@/Services/Auth.Services";

export async function GET() {
  const result = await AuthMeService();
  return Response.json({ ...result }, { status: result.statusCode });
}
