import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("users").filter((q) => q.eq(q.field("taskListId"), args.email)).first();
    }
})

export const createUser = mutation({
    args: {
        email: v.string(),
        password: v.string(),
        username: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.insert('users', { email: args.email, password: args.password, username: args.username });
        
        return await ctx.db.query("users").filter((q) => q.eq(q.field("id"), user)).first();
    }
})