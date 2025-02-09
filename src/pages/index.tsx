'use client'
import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { trpc } from "../../utils/trpc";
import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  // const {data: allTodo, isPending} = trpc.todo.getTodos.useQuery();
  // console.log(allTodo);
  // if (isPending) {
  //   return <div>Loading...</div>;
  // }
  // console.log(hello.data);
  return (
    <>
      <h1>Simple Todo App</h1>
      {/* <p>{hello.data.greeting}</p> */}
      {/* {
        allTodo?.map((todo) => (
          <div key={todo.id}>
            <h1>{todo.name}</h1>
            <p>{todo.priority}</p>
          </div>
        ))
      } */}
      <AddTodo />
      <Todos />
    </>
  );
}
