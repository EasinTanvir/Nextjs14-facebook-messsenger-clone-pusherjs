import { notFound, redirect } from "next/navigation";
import { prisma } from "../prismaClient";
import { getServerCredentials } from "./sersverSession";
import { revalidatePath } from "next/cache";

export const fetchPost = async () => {
  try {
    const posts = await prisma.posts.findMany({
      where: { mode: "PUBLIC" },
      include: {
        user: true,
        like: true,
        comment: {
          include: { User: true, reply: { include: { user: true } } },
          orderBy: { createAt: "desc" },
        },
      },
      orderBy: { time: "desc" },
    });

    return posts;
  } catch (err) {
    throw new Error("Something went wrong! Fetch posts failed");
  }
};
export const fetchMyPost = async (id: string) => {
  const session = await getServerCredentials();

  let posts;

  try {
    if (session) {
      posts = await prisma.posts.findMany({
        where: { userId: id },
        include: {
          user: true,
          like: true,
          comment: {
            include: { User: true, reply: { include: { user: true } } },
            orderBy: { createAt: "desc" },
          },
        },
        orderBy: { time: "desc" },
      });
    } else {
      posts = await prisma.posts.findMany({
        where: { userId: id, mode: "PUBLIC" },
        include: {
          user: true,
          like: true,
          comment: {
            include: { User: true, reply: { include: { user: true } } },
            orderBy: { createAt: "desc" },
          },
        },
        orderBy: { time: "desc" },
      });
    }

    return posts;
  } catch (err) {
    throw new Error("Something went wrong! Fetch individual posts failed");
  }
};

export const fetchUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      notFound();
    }

    return user;
  } catch (err) {
    throw new Error("Something went wrong! Fetch user failed");
  }
};
export const fetchAllUsers = async () => {
  const session = await getServerCredentials();

  let myData = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const alreadyFriend = myData?.friends.map((item) => item.friendId);

  try {
    const user = await prisma.user.findMany({
      where: { NOT: [{ id: session?.user.id }, { id: { in: alreadyFriend } }] },
    });

    return user;
  } catch (err) {
    throw new Error("Something went wrong! Fetch user failed");
  }
};
export const fetchPostbyId = async (id: string) => {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        like: true,
        comment: {
          include: { User: true, reply: { include: { user: true } } },
          orderBy: { createAt: "desc" },
        },
      },
    });

    if (!post) {
      notFound();
    }
    revalidatePath("/");
    return post;
  } catch (err) {
    throw new Error("Something went wrong! Fetch posts failed");
  }
};
