import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FloatingEnquiry } from "@/components/FloatingEnquiry";

const routerState = vi.hoisted(() => ({ pathname: "/services/networking" }));

vi.mock("@tanstack/react-router", () => ({
  useRouterState: () => routerState.pathname,
}));

describe("FloatingEnquiry", () => {
  beforeEach(() => {
    routerState.pathname = "/services/networking";
  });

  it("opens with the current service selected and can be closed and reopened", () => {
    render(<FloatingEnquiry />);
    const trigger = screen.getByRole("button", { name: "Open enquiry form" });
    expect(trigger).toHaveClass("size-12");
    expect(trigger.querySelector("svg")).toHaveClass("lucide-message-circle");
    expect(trigger).not.toHaveTextContent("Enquire");
    fireEvent.click(trigger);

    const service = screen.getByLabelText(/Service required/);
    expect(service).toHaveValue("Networking");

    fireEvent.click(screen.getByRole("button", { name: "Close enquiry panel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open enquiry form" }));
    expect(screen.getByLabelText(/Service required/)).toHaveValue("Networking");
  });

  it("validates required fields and never claims an unconfigured enquiry was sent", () => {
    render(<FloatingEnquiry />);
    fireEvent.click(screen.getByRole("button", { name: "Open enquiry form" }));
    fireEvent.click(screen.getByRole("button", { name: /Submit enquiry/ }));

    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Write a short message.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Sam Example" } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText(/Service required/), { target: { value: "Networking" } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "Please contact me about a network setup." } });
    fireEvent.click(screen.getByRole("button", { name: /Submit enquiry/ }));
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: "sam@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Submit enquiry/ }));

    expect(screen.getByRole("alert")).toHaveTextContent("your message was not sent");
    expect(screen.getByLabelText(/Full name/)).toHaveValue("Sam Example");
    expect(screen.getByLabelText(/Email address/)).toHaveValue("sam@example.com");
  });
});
