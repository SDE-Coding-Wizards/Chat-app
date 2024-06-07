"use server";

import { getUser } from "@/helpers";

export async function getFriendRequests(): Promise<friend_request[]> {
  const user = await getUser();

  if (!user) return [];

  const conn = await pool.getConnection();
  try {
    const friendRequests: friend_request[] = await conn.query(
      `SELECT * FROM friend_requests WHERE receiver_uuid = ? AND isAccepted IS NULL`,
      [user.uuid]
    );

    const allUsers: user[] = await conn.query(`SELECT * FROM users`);

    friendRequests.forEach((request) => {
      request.sender = allUsers.find(
        ({ uuid }) => uuid === request.sender_uuid
      )!;

      request.receiver = allUsers.find(
        ({ uuid }) => uuid === request.receiver_uuid
      )!;
    });

    return friendRequests;
  } catch (error) {
    console.error(error);

    await conn.rollback();
    throw error;
  } finally {
    await conn.release();
  }
}
