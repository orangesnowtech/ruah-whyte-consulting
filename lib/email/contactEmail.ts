type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

const ZEPTOMAIL_API_KEY = process.env.ZEPTOMAIL_API_KEY;
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS;
const TO_ADDRESS = process.env.EMAIL_TO_ADDRESS;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendContactEmail(params: ContactEmailInput) {
  if (!ZEPTOMAIL_API_KEY || !FROM_ADDRESS || !TO_ADDRESS) {
    throw new Error("Email environment variables are not configured.");
  }

  const response = await fetch("https://api.zeptomail.com/v1.1/email", {
    method: "POST",
    headers: {
      Authorization: `Zoho-enczapikey ${ZEPTOMAIL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { address: FROM_ADDRESS, name: "Ruah Whyte Consulting" },
      to: [{ email_address: { address: TO_ADDRESS } }],
      subject: `New contact form submission from ${params.name}`,
      htmlbody: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 12px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(params.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
          <p><strong>Message:</strong><br/>${escapeHtml(params.message).replaceAll("\n", "<br/>")}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`ZeptoMail error: ${response.status} ${details}`);
  }
}
