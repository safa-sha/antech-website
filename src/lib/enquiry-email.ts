export const ENQUIRY_RECIPIENT = "sales@antechuae.com";

export type EnquiryEmailDetails = {
  name: string;
  email: string;
  service: string;
  message: string;
  phone?: string;
};

function encodeMailtoValue(value: string) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

export function createEnquiryMailto(details: EnquiryEmailDetails) {
  const service = details.service.trim();
  const subject = service
    ? `Website Enquiry - ${service}`
    : "General Website Enquiry";
  const body = [
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone?.trim() || "Not provided"}`,
    `Service: ${service}`,
    "Message:",
    details.message,
  ].join("\n");
  return {
    body,
    url: `mailto:${ENQUIRY_RECIPIENT}?subject=${encodeMailtoValue(subject)}&body=${encodeMailtoValue(body)}`,
  };
}
