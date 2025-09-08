import axios from "axios";

const LOG_SERVICE_URL = "http://20.244.56.144/evaluation-service/logs";
const LOG_SERVICE_TOKEN = "V4cCI6MTc1NzMyMjY0NSwiaWF0IjoxNzU3MzIxNzQ1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTdhZmEwYTItMDVmMC00MGNjLWIwY2EtODExMTc2YTlhZjkwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmluYXlhayBzaHVrbGEiLCJzdWIiOiJjNWFkZjBlOS0xY2ZkLTRjYjEtOTY1Ny1mMDg0ZGRhZTliODAifSwiZW1haWwiOiJzaHVrbGF2aW5heWFrMTA5QGdtYWlsLmNvbSIsIm5hbWUiOiJ2aW5heWFrIHNodWtsYSIsInJvbGxObyI6IjIyMDE2NDE1NDAxMjciLCJhY2Nlc3NDb2RlIjoic0FXVHVSIiwiY2xpZW50SUQiOiJjNWFkZjBlOS0xY2ZkLTRjYjEtOTY1Ny1mMDg0ZGRhZTliODAiLCJjbGllbnRTZWNyZXQiOiJrUmZCU3d5RXB6eEtIQ3BDIn0.nRh1JRwwDzD6JclBHTdUSHJ9umXC9kVcCo_vBAu2v1Q"; // replace with actual token

export async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      LOG_SERVICE_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: Bearer ${LOG_SERVICE_TOKEN}, // required
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Log sent:", res.data);
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
}