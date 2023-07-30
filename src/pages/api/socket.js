import verifySetup from "@/models/socket";

export default async function handler(req, res) {
    return await verifySetup(res);
}
