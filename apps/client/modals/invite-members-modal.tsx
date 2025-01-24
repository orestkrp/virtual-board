"use client";

import { FC, FormEventHandler, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InviteMembersSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import { useInviteModal } from "@/store/use-invite-modal";
import { inviteMembers } from "@/actions/invite-members";
import { toast } from "@/hooks/use-toast";

export const InviteMembersModal: FC = () => {
  const { isOpen, onClose, initialValues } = useInviteModal();
  const [emails, setEmails] = useState<string[]>(initialValues.emails);
  const [error, setError] = useState("");

  useEffect(() => {
    setEmails(initialValues.emails);
  }, [initialValues.emails]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const validationFields = InviteMembersSchema.safeParse({
      emails,
    });

    if (!validationFields.success) {
      const error = validationFields.error.flatten().fieldErrors.emails;
      if (Array.isArray(error)) {
        setError(error[0]);
      }
      return;
    }

    inviteMembers(validationFields.data, initialValues.currentTeamId).then(
      (result) => {
        if (result.error) {
          toast({
            title: result.error,
            variant: "destructive",
          });
        } else {
          toast({ title: "Member was added" });
          onClose();
        }
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setEmails([]);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite new members</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new members emails</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            required
            maxLength={60}
            value={emails.join(", ")}
            onChange={(e) =>
              setEmails(e.target.value.split(",").map((s) => s.trim()))
            }
            placeholder="Add members emails"
          />
          {error && <p className="text-s text-red-500">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
