"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";

// async function getData(id) {
//   const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return notFound();
//   }

//   return res.json();
// }

// export async function generateMetadata({ params }) {
//   const post = await getData(params.id);
//   return {
//     title: post.title,
//     description: post.desc,
//   };
// }

const BlogPost =  ({ params }) => {
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts/${params.id}`, {
        cache: "no-store",
      });
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user) fetchPosts();
  }, [session]);
  // const data = await getData();
  console.log(myPosts);
  // const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{myPosts.title}</h1>
          <p className={styles.desc}>{myPosts.desc}</p>
          <div className={styles.author}>
            <Image
              src={myPosts.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{myPosts.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={myPosts.img} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{myPosts.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;

// import React from 'react'

// const Blo = () => {
//   return (
//     <div>Blo</div>
//   )
// }

// export default Blo
