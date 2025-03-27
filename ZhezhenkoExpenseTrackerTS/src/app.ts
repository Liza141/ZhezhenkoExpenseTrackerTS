import * as readline from "readline";
import { Expense, Category } from "./expense";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let expenses: Expense[] = [];
let idCounter = 1;

function addExpense(name: string, amount: number, category: Category) {
    const expense: Expense = {
        id: idCounter++,
        name,
        amount,
        category,
        date: new Date().toISOString()
    };
    expenses.push(expense);
    console.log("Витрату додано успішно!\n");
    mainMenu();
}

function viewExpenses() {
    if (expenses.length === 0) {
        console.log("Немає жодної витрати.\n");
    } else {
        console.log("Список витрат:");
        expenses.forEach(exp => {
            console.log(`${exp.id}. ${exp.name} - ${exp.amount} грн, Категорія: ${exp.category}, Дата: ${exp.date}`);
        });
    }
    mainMenu();
}

function getTotalExpenses() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`Загальна сума витрат: ${total} грн\n`);
    mainMenu();
}

function filterByCategory() {
    console.log("Категорії: Food, Transport, Entertainment, Other");
    rl.question("Введіть категорію: ", (categoryStr: Category) => {
        const category = categoryStr as Category;
        if (!Object.values(Category).includes(category)) {
            console.log("Невірна категорія.\n");
        } else {
            const filtered = expenses.filter(exp => exp.category === category);
            if (filtered.length === 0) {
                console.log("Витрат у цій категорії немає.\n");
            } else {
                console.log(`Витрати у категорії ${category}:`);
                filtered.forEach(exp => console.log(`${exp.id}. ${exp.name} - ${exp.amount} грн, Дата: ${exp.date}`));
            }
        }
        mainMenu();
    });
}

function mainMenu() {
    console.log("\nВиберіть дію:");
    console.log("1. Додати витрату");
    console.log("2. Переглянути всі витрати");
    console.log("3. Підрахувати загальну суму витрат");
    console.log("4. Фільтрувати за категорією");
    console.log("5. Вийти\n");

    rl.question("Оберіть опцію: ", (option: any) => {
        switch (option) {
            case "1":
                rl.question("Введіть назву витрати: ", (name: string) => {
                    rl.question("Введіть суму: ", (amountStr: string) => {
                        const amount = parseFloat(amountStr);
                        console.log("Категорії: Food, Transport, Entertainment, Other");
                        rl.question("Введіть категорію: ", (categoryStr: Category) => {
                            const category = categoryStr as Category;
                            if (!Object.values(Category).includes(category)) {
                                console.log("Невірна категорія.\n");
                                mainMenu();
                            } else {
                                addExpense(name, amount, category);
                            }
                        });
                    });
                });
                break;
            case "2":
                viewExpenses();
                break;
            case "3":
                getTotalExpenses();
                break;
            case "4":
                filterByCategory();
                break;
            case "5":
                console.log("До побачення!");
                rl.close();
                break;
            default:
                console.log("Невірна опція. Спробуйте ще раз.\n");
                mainMenu();
                break;
        }
    });
}

mainMenu();
