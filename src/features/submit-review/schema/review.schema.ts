import { z } from "zod";

export const submitReviewSchema = z.object({
    title: z.string().min(3, "Title is too short"),
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Please enter a valid email"),
    comment: z
        .string()
        .min(10, "Comment should be at least 10 characters"),
});

export type SubmitReviewValues = z.infer<typeof submitReviewSchema>;
