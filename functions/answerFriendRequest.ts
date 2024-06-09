"use server";

export async function answerFriendRequest(uuid: UUID, isAccepted: boolean) {
  const conn = await pool.getConnection();
  try {
    conn.beginTransaction();

    await conn.query(
      `UPDATE friend_requests SET isAccepted = ? WHERE uuid = ?`,
      [isAccepted, uuid]
    );

    if (isAccepted) {
      const [{ receiver_uuid, sender_uuid } = {} as any] = await conn.query(
        `SELECT receiver_uuid, sender_uuid FROM friend_requests WHERE uuid = ?`,
        [uuid]
      );

      await conn.query(
        `INSERT INTO friendships (uuid, user1_uuid, user2_uuid) VALUES (uuid(), ?, ?)`,
        [receiver_uuid, sender_uuid]
      );
    }

    await conn.commit();
  } catch (error) {
    console.error(error);

    await conn.rollback();
    throw error;
  } finally {
    await conn.release();
  }
}
