export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
	id: ItemId;
	timestamp: number;
	text: string;
}
