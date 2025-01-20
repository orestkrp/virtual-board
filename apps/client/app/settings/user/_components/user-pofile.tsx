"use client";

import { renameUser } from "@/actions/rename-user";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounce-input";
import { IUser } from "@/types/database";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { FC, useState } from "react";
import { ChangeEmailForm } from "./change-email";
import { ChangePasswordForm } from "./change-password";
import { deleteUser } from "@/actions/delete-user";
import { PictureUploader } from "@/components/picture-uploader";
import { cn } from "@/lib/utils";
import { BACKEND_URL } from "@/lib/constants";

interface UserProfileProps {
  userDetails: IUser;
}

export const UserProfile: FC<UserProfileProps> = ({ userDetails }) => {
  const [opended, setOpened] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <DebouncedInput
          name="team_name"
          placeholder="Write new team name"
          sendRequest={async (value: string) => {
            return await renameUser(value);
          }}
          label="User name"
          type="text"
          value={userDetails.name}
          className={cn(buttonVariants({ variant: "ghost" }))}
        />
        <PictureUploader name={userDetails.name} avatar={userDetails.avatar} />
      </div>
      <div className="mt-6">
        <Accordion
          type="multiple"
          onValueChange={(value) => {
            setOpened(value);
          }}
        >
          <AccordionItem value="email">
            <div className="flex justify-between w-full">
              <AccordionHeader asChild>
                <div>
                  <h2 className="my-4 text-xl font-bold">E-mail</h2>
                  <p className="my-2 text-l font-semibold">
                    {userDetails.email}
                  </p>
                </div>
              </AccordionHeader>
              <AccordionTrigger asChild>
                <Button variant="ghost">
                  {opended.find((item) => item === "email") ? "Hide" : "Show"}
                </Button>
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <ChangeEmailForm />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="password">
            <div className="flex justify-between">
              <AccordionHeader asChild>
                <h2 className="my-4 text-xl font-bold">Password</h2>
              </AccordionHeader>
              <AccordionTrigger asChild>
                <Button variant="ghost">
                  {opended.find((item) => item === "password")
                    ? "Hide"
                    : "Show"}
                </Button>
              </AccordionTrigger>
            </div>
            <AccordionContent>
              {userDetails.isExternal ? (
                <p className="my-t text-l font-semibold">
                  There is no password associated with this email address as
                  you've signed up to Miro using another service
                </p>
              ) : (
                <ChangePasswordForm />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <ConfirmModal
          header="Delete Team?"
          description="Whis will delete all the boards of this team and all of it contents."
          onConfirm={async () => {
            await deleteUser();
          }}
        >
          <Button className="mt-5" variant="destructive">
            Delete account
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
