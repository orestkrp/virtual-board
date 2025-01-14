import { LiveMap } from "@liveblocks/core";

export type PresenceStates = "playing" | "seeking" | "paused";

declare global {
  interface Liveblocks {
    Presence: {
      presence: any;
    };
    Storage: {
      records: LiveMap<string, any>;
    };
    UserMeta: {
      id: string;
      info: {
        name: string;
        color: string;
        avatar: string;
      };
    };
  }
}
