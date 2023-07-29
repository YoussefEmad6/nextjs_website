"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

// async function getData() {
//   const res = await fetch(`/app/api/posts`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const Blog = () => {
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts`, {
        cache: "no-store",
      });
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user) fetchPosts();
  }, [session]);
  // const data = await getData();
  console.log(myPosts);
  return (
    <div className={styles.mainContainer}>
      {myPosts.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item._id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;

// import React from 'react'

// const Blog = () => {
//   return (
//     <div>Blog</div>
//   )
// }

// export default Blog
