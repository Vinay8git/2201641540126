import axios from "axios";

const LOG_SERVICE_URL = "http://20.244.56.144/evaluation-service/logs";
const LOG_SERVICE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2aW5heXlkMjc3QGdtYWlsLmNvbSIsImV4cCI6MTc1NzMyMzQ0NCwiaWF0IjoxNzU3MzIyNTQ0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzJkMzdkOTQtOWQ3NC00NmE1LTlkNWUtNDZlYTZlNjFmNTAwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmluYXkgeWFkYXYiLCJzdWIiOiIwODg0ZDk3Mi0xMGE2LTQ1MzItOGQ1ZC02MDA3NWYzZDU0MWMifSwiZW1haWwiOiJ2aW5heXlkMjc3QGdtYWlsLmNvbSIsIm5hbWUiOiJ2aW5heSB5YWRhdiIsInJvbGxObyI6IjIyMDE2NDE1NDAxMjYiLCJhY2Nlc3NDb2RlIjoic0FXVHVSIiwiY2xpZW50SUQiOiIwODg0ZDk3Mi0xMGE2LTQ1MzItOGQ1ZC02MDA3NWYzZDU0MWMiLCJjbGllbnRTZWNyZXQiOiJ2U0RueG5EdE1relRHVVBaIn0.f77YTJVMIY54B9jE5KF_P3ZGWyXK-jq-SUqJjG9zQv8";

export async function Log(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      LOG_SERVICE_URL,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${LOG_SERVICE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Log sent:", res.data); 
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
}
