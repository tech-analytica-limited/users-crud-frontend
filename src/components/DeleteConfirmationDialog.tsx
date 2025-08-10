"use client";

import * as React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { del } from "@/lib/api/handlers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteConfirmationDialogProps {
  id: string;
  trigger: React.ReactNode;
}

interface DeleteResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string | null;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  id,
  trigger,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<DeleteResponse, Error, string>({
    mutationFn: async (userId) => {
      const response = await del<DeleteResponse>(`/users/${userId}`);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete user");
      }
      return response;
    },
    onSuccess: (data) => {
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message || "User deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[50vh]">
        <DialogTitle className="sr-only"/>
        <div className="mb-5 space-y-3 text-start">
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <p className="text-muted-foreground text-sm">
            You want to delete this user? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-6">
            <Button
              variant="default"
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-200 text-black hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteMutation.mutate(id)}
              variant="destructive"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
