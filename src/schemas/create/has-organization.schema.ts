import { z } from "zod";

export const HasOrganizationSchema = z.object({
  data: z.object({
    organizations: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        role: z.string(),
      })
    ),
  }),
});

export type HasOrganizationData = z.infer<typeof HasOrganizationSchema>;
