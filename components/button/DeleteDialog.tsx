
"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
    Trash2,
    AlertTriangle,
    Loader2,
    X,
    CheckCircle2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteDialog = ({ eventId }: { eventId: string }) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch(
                `http://localhost:8000/delete-event/${eventId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete event.");
            }

            setSuccess(true);

            setTimeout(() => {
                setOpen(false);
                setSuccess(false);
                router.refresh();
            }, 700);

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (value: boolean) => {
        if (isLoading) return;

        setOpen(value);

        if (!value) {
            setError("");
            setSuccess(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-11 w-full gap-2 rounded-xl border border-red-200 bg-red-50 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white" />
                }
            >
                <Trash2 size={16} />
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-950">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-white px-6 py-7 dark:from-red-950/40 dark:via-slate-900 dark:to-slate-950">

                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-200/30 blur-2xl dark:bg-red-500/10" />

                    <AlertDialogHeader className="relative items-center text-center">

                        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-200 bg-red-100 text-red-600 shadow-sm dark:border-red-900 dark:bg-red-950/60 dark:text-red-400">
                            {success ? (
                                <CheckCircle2 size={30} />
                            ) : (
                                <AlertTriangle size={30} />
                            )}
                        </div>

                        <AlertDialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                            {success
                                ? "Event Deleted!"
                                : "Delete This Event?"}
                        </AlertDialogTitle>

                        <AlertDialogDescription className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            {success
                                ? "Your event has been successfully deleted."
                                : "Are you sure you want to delete this event? This action cannot be undone."}
                        </AlertDialogDescription>

                    </AlertDialogHeader>
                </div>

                {/* Content */}
                <div className="space-y-4 p-6">

                    {error && (
                        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                            <AlertTriangle size={17} className="mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {!success && (
                        <div className="rounded-xl border border-red-100 bg-red-50/70 p-3 text-center dark:border-red-900/50 dark:bg-red-950/20">
                            <p className="text-xs font-medium text-red-600 dark:text-red-400">
                                <span className="font-bold">Warning:</span>{" "}
                                Deleting this event may affect its related
                                registrations depending on your backend logic.
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <AlertDialogFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">

                        {!success && (
                            <AlertDialogCancel
                                disabled={isLoading}
                                className="mt-0 rounded-xl border-slate-200 px-5 dark:border-slate-700"
                            >
                                <X size={16} className="mr-2" />
                                Cancel
                            </AlertDialogCancel>
                        )}

                        {!success && (
                            <Button
                                type="button"
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 text-white shadow-lg shadow-red-500/20 transition hover:from-red-700 hover:to-rose-700"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={17} className="mr-2 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={17} className="mr-2" />
                                        Yes, Delete Event
                                    </>
                                )}
                            </Button>
                        )}

                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
