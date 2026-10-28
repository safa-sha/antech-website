import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FloatingEnquiry } from "@/components/FloatingEnquiry";
import { createEnquiryMailto, ENQUIRY_RECIPIENT } from "@/lib/enquiry-email";

const routerState = vi.hoisted(() => ({ pathname: "/services/networking" }));

vi.mock("@tanstack/react-router", () => ({
  useRouterState: () => routerState.pathname,
}));

describe("FloatingEnquiry", () => {
  let clickSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    routerState.pathname = "/services/networking";
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  });

  afterEach(() => {
    clickSpy.mockRestore();
  });

  it("opens with the current service selected and can be closed and reopened", () => {
    render(<FloatingEnquiry />);
    const trigger = screen.getByRole("button", { name: "Open enquiry form" });
    expect(trigger).toHaveClass("size-12");
    expect(trigger.querySelector("svg")).toHaveClass("lucide-message-circle");
    fireEvent.click(trigger);

    expect(screen.getByLabelText(/Service required/)).toHaveValue("Networking");
    fireEvent.click(screen.getByRole("button", { name: "Close enquiry panel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open enquiry form" }));
    expect(screen.getByLabelText(/Service required/)).toHaveValue("Networking");
  });

  it("validates the existing required fields before opening a draft", () => {
    routerState.pathname = "/";
    render(<FloatingEnquiry />);
    fireEvent.click(screen.getByRole("button", { name: "Open enquiry form" }));
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Choose a service.")).toBeInTheDocument();
    expect(screen.getByText("Write a short message.")).toBeInTheDocument();
    expect(clickSpy).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Sam Example" } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText(/Service required/), { target: { value: "Networking" } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it("opens a prepared draft and keeps the entered details visible without claiming it was sent", () => {
    render(<FloatingEnquiry />);
    fireEvent.click(screen.getByRole("button", { name: "Open enquiry form" }));
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Sam O'Neil" } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: "sam@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone number/), { target: { value: "+1 (555) 010-2000" } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "Need help!\nPlease call soon." } });
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(clickSpy).toHaveBeenCalledOnce();
    expect(screen.getByRole("status")).toHaveTextContent("Press Send in your email app");
    expect(screen.getByRole("status")).toHaveTextContent("If it doesn't open, copy the details below");
    expect(screen.getByRole("status")).toHaveTextContent("Name: Sam O'Neil");
    expect(screen.getByRole("status")).toHaveTextContent("Email: sam@example.com");
    expect(screen.getByRole("status")).toHaveTextContent("Phone: +1 (555) 010-2000");
    expect(screen.getByRole("status")).toHaveTextContent("Service: Networking");
    expect(screen.getByText(/Name: Sam O'Neil/).textContent).toContain("Need help!\nPlease call soon.");
    expect(screen.getByRole("button", { name: "Draft prepared" })).toBeDisabled();
    expect(screen.queryByText(/sent successfully/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open email draft" })).toHaveAttribute(
      "href",
      expect.stringContaining(`mailto:${ENQUIRY_RECIPIENT}?`),
    );
  });

  it("shows a copy-and-email fallback if opening the draft throws", () => {
    clickSpy.mockImplementationOnce(() => {
      throw new Error("No email handler");
    });
    render(<FloatingEnquiry />);
    fireEvent.click(screen.getByRole("button", { name: "Open enquiry form" }));
    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Sam Example" } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: "sam@example.com" } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Inquiry" }));

    expect(screen.getByRole("status")).toHaveTextContent("We couldn't open your email draft");
    expect(screen.getByRole("status")).toHaveTextContent("email sales@antechuae.com manually");
    expect(screen.getByRole("status")).toHaveTextContent("Name: Sam Example");
  });
});

describe("createEnquiryMailto", () => {
  it("uses the requested recipient, selected service, all current values, and encodes them", () => {
    const details = {
      name: "Sam O'Neil & Co.",
      email: "sam+test@example.com",
      service: "Network & Wi-Fi",
      message: "Line one: 50% ready?\nLine two & more.",
    };
    const draft = createEnquiryMailto(details);
    const parsed = new URL(draft.url);

    expect(parsed.protocol).toBe("mailto:");
    expect(parsed.pathname).toBe(ENQUIRY_RECIPIENT);
    expect(parsed.searchParams.get("subject")).toBe("Website Enquiry - Network & Wi-Fi");
    expect(parsed.searchParams.get("body")).toBe(
      "Name: Sam O'Neil & Co.\nEmail: sam+test@example.com\nPhone: Not provided\nService: Network & Wi-Fi\nMessage:\nLine one: 50% ready?\nLine two & more.",
    );
    expect(draft.url).not.toContain("Network & Wi-Fi");
    expect(draft.url).toContain("%20");
    expect(draft.url).toContain("%2B");
    expect(draft.url).toContain("%26");
    expect(draft.url).toContain("%0A");
  });

  it("uses the general enquiry subject when no service is selected", () => {
    const draft = createEnquiryMailto({ name: "Sam", email: "sam@example.com", service: "", message: "Hello" });
    expect(new URL(draft.url).searchParams.get("subject")).toBe("General Website Enquiry");
  });
});
