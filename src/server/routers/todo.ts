import { z } from "zod";
import { procedure, router } from "../trpc";
export const todoRouter = router({
  addTodo: procedure
    .input(
      z.object({
        name: z.string().max(20, { message: "Name must be 20 characters max" }),
        priority: z
          .string()
          .max(10, { message: "Priority must be 10 characters max" })
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          name: input.name,
          priority: input.priority
        }
      });
      return todo;
    }),

    getTodos: procedure
       .query(async ({ ctx }) => {
            const todos = await ctx.prisma.todo.findMany()
            return todos
        }),

    // get single todo
    getSingleTodo: procedure
    .input(
            z.object({
                id: z.number()
            })
        )
      .query(async ({ input, ctx }) => {
        // console.log(ctx, 'input');
            const todo = await ctx.prisma.todo.findUnique({
                where: {
                    id: input.id
                }
            })
            return todo
        }),

        // for update todo
        updateTodo: procedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().max(20, { message: "Name must be 20 characters max" }),
                priority: z
                  .string().max(20, { message: "Priority must be 20 characters max" })
            })
          )
          .mutation(async ({ input, ctx }) => {
            const todo = await ctx.prisma.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name,
                    priority: input.priority
                }
            })
            return todo
        }),

        // for delete todo
        deleteTodo: procedure
        .input(
            z.object({
                id: z.number()
            })
          )
          .mutation(async ({ input, ctx }) => {
            const todo = await ctx.prisma.todo.delete({
                where: {
                    id: input.id
                }
            })
            return todo;
          })
});
// export type definition of API
// export type AppRouter = typeof appRouter;
