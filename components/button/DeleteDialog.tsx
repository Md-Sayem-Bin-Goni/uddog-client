
"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteDialog = ({ eventId }: { eventId: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);

        const res = await fetch(
            `http://localhost:8000/delete-event/${eventId}`,
            {
                method: "DELETE",
            }
        );

        const data = await res.json();

        if (res.ok) {
            router.refresh();
            window.location.reload();
        } else {
            alert(data.message || "Failed to delete event");
        }

        setIsLoading(false);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2 border-none bg-red-50 text-red-600 shadow-none hover:bg-red-100"
                    />
                }
            >
                <Trash2 size={16} />
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete this event?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete this event?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        {isLoading ? "Deleting..." : "Yes, Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
