"use client";
import { createTeam } from "@/actions/create-team";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useState } from "react";

export const CreateTeam = () => {
  const { toast } = useToast();
  const [teamName, setTeamName] = useState("");
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="flex w-full p-2 gap-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="text-muted-foreground text-[14px]">Add team</div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
        </DialogHeader>
        <Label htmlFor="Name">Name</Label>
        <Input
          id="name"
          name="name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Name of your team"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                createTeam(teamName).then((result) => {
                  if (result.error) {
                    toast({
                      title: result.error,
                      variant: "destructive",
                    });
                  } else {
                    toast({ title: "Team was created" });
                  }
                });
              }}
              type="submit"
            >
              Create team
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
