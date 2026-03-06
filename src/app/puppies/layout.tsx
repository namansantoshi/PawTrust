import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse Puppies for Sale in India",
    description: "Find verified puppies for sale across Delhi, Mumbai, Bangalore and more cities in India. Filter by breed, city, age, and price.",
};

export default function PuppiesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
