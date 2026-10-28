import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ReviewPage from "./ReviewPage";

describe("ReviewPage", () => {
  it("shows the exact validation message and sends no request for a short prompt", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    render(
      <QueryClientProvider client={queryClient}>
        <ReviewPage />
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Review my project" }));
    expect(screen.getByText("Describe your project in at least 20 characters.")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
