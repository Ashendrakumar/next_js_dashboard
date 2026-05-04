// lib/constants.ts

import { User } from "@/types/user";

export const DEMO_CREDENTIALS = {
  email: "demo@example.com",
  password: "password123",
};

export const PAGE_SIZE_OPTIONS = [10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

/**
 * Generate mock users for demo
 */
export function generateMockUsers(count: number = 100): User[] {
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emma",
    "David",
    "Sarah",
    "Robert",
    "Lisa",
    "William",
    "Emily",
    "Richard",
    "Jennifer",
    "James",
    "Patricia",
    "Thomas",
    "Linda",
    "Charles",
    "Barbara",
    "Christopher",
    "Nancy",
    "Daniel",
    "Karen",
    "Matthew",
    "Betty",
    "Anthony",
    "Margaret",
    "Mark",
    "Sandra",
    "Donald",
    "Ashley",
    "Steven",
    "Kimberly",
    "Paul",
    "Donna",
    "Andrew",
    "Carol",
    "Joshua",
    "Michelle",
    "Kenneth",
    "Amanda",
    "Kevin",
    "Melissa",
    "Brian",
    "Deborah",
    "Edward",
    "Stephanie",
    "Ronald",
    "Rebecca",
    "Anthony",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Young",
    "Walker",
    "Allen",
    "King",
    "Scott",
    "Green",
    "Baker",
    "Adams",
    "Nelson",
    "Carter",
    "Roberts",
    "Phillips",
    "Campbell",
    "Parker",
    "Evans",
    "Edwards",
    "Collins",
  ];

  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    users.push({
      id: String(i + 1).padStart(4, "0"),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i > 0 ? i : ""}@example.com`,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      role: ["admin", "user", "editor"][Math.floor(Math.random() * 3)],
    });
  }

  return users;
}

export const MOCK_USERS = generateMockUsers(100);
