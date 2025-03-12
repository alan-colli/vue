import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter, AppRouter } from "~/server/trpc/routers";
import { createContext } from "~/server/trpc/context";

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
