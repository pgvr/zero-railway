import {
	ANYONE_CAN,
	type PermissionsConfig,
	type Row,
	createSchema,
	definePermissions,
	number,
	string,
	table,
} from "@rocicorp/zero";

const post = table("post")
	.columns({
		id: string(),
		title: string(),
		content: string(),
		createdAt: number(),
		updatedAt: number(),
	})
	.primaryKey("id");

const author = table("author")
	.columns({
		id: string(),
		name: string(),
		createdAt: number(),
		updatedAt: number(),
	})
	.primaryKey("id");

// Create schema
export const schema = createSchema({
	tables: [post, author],
	relationships: [],
});

export type Schema = typeof schema;
export type Post = Row<typeof schema.tables.post>;
export type Author = Row<typeof schema.tables.author>;

// The contents of your decoded JWT.
type AuthData = {
	sub: string;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	return {
		post: {
			row: {
				select: ANYONE_CAN,
				insert: ANYONE_CAN,
				update: {
					preMutation: ANYONE_CAN,
					postMutation: ANYONE_CAN,
				},
				delete: ANYONE_CAN,
			},
		},
		author: {
			row: {
				select: ANYONE_CAN,
				insert: ANYONE_CAN,
				update: {
					preMutation: ANYONE_CAN,
					postMutation: ANYONE_CAN,
				},
				delete: ANYONE_CAN,
			},
		},
	} satisfies PermissionsConfig<AuthData, Schema>;
});
