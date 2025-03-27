export enum Category {
    Food = "Food",
    Transport = "Transport",
    Entertainment = "Entertainment",
    Other = "Other"
}

export interface Expense {
    id: number;
    name: string;
    amount: number;
    category: Category;
    date: string;
}
