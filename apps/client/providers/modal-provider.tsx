"use client";

import { InviteMembersModal } from "@/modals/invite-members-modal";
import { RenameModal } from "@/modals/rename-modal";
import { FC, useEffect, useState } from "react";

export const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
      <InviteMembersModal />
    </>
  );
};
