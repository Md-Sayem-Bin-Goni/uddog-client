// Shared event date formatter — input: "YYYY-MM-DD", output: "15 Oct 2026"
export const formatEventDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);

    if (!year || !month || !day) return date;

    return new Date(year, month - 1, day).toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
