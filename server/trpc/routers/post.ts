import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
});
