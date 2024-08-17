"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { FirebaseAppProvider } from 'reactfire';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <FirebaseAppProvider firebaseConfig={{
      apiKey: "AIzaSyBDJE1aPtVJYCKJRuHqcaQ_byQP9TPycfc",
      authDomain: "inventory-management-be1ab.firebaseapp.com",
      projectId: "inventory-management-be1ab",
      storageBucket: "inventory-management-be1ab.appspot.com",
      messagingSenderId: "678580200411",
      appId: "1:678580200411:web:bda33f9183485d1296fdfe",
      measurementId: "G-48L27YD56X"
    }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </FirebaseAppProvider>
  );
}
