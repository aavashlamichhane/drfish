type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  fishSpecies: string;
};

export const UserData: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "ymanoutube@gmail.com",
    password: "password123",
    fishSpecies: "Trout",
  },
  {
    id: 2,
    name: "Bob",
    email: "hello@gmail.com",
    password: "mypassword",
    fishSpecies: "Carp",
  },
];


// Generate random temp, dissolved oxygen,pH, and turbidity values in each 5 seconds
export const generateRandomDataInterval = (callback: (data: any) => void) => {
    setInterval(() => {
        const data = generateRandomData();
        callback(data);
    }, 5000);
}

export const generateRandomData = () => {
    const temp = (Math.random() * 10 + 20).toFixed(2); // 20 to 30
    const dissolvedOxygen = (Math.random() * 5 + 5).toFixed(2); // 5 to 10
    const pH = (Math.random() * 2 + 6).toFixed(2); // 6 to 8
    const turbidity = (Math.random() * 5).toFixed(2); // 0 to 5
    
    return {
        temp,
        dissolvedOxygen,
        pH,
        turbidity,
    };
}
    
