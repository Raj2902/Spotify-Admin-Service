import { getChannel } from "../../config/rabbitMQ.js";

export const publishSongDeleted = async (
  audio_public_id: string,
  thumbnail_public_id: string | null,
) => {
  const channel = getChannel();
  channel?.publish(
    "song.events", //exchange
    "song.deleted", //routing key
    Buffer.from(JSON.stringify({ audio_public_id, thumbnail_public_id })), //payload in binary format
    { persistent: true },
  );
};
