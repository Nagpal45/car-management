"use client";
import Link from "next/link";
import { useUser } from "@/lib/authContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const {isLoggedIn, setIsLoggedIn} = useUser();
  
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="fixed top-0 w-full flex justify-between items-center py-4 px-10 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">
        <Link href="/">CarSambhalo</Link>
      </h1>
      <div className="space-x-8">
        {isLoggedIn ? (
          <>
            <Link href="/productList">Product List</Link>
            <Link href="/productCreate">Product Create</Link>
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;