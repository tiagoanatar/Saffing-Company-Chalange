const crypto = require("crypto");

function deterministicPartitionKey(event) {
  const MAX_PARTITION_KEY_LENGTH = 256;
  const TRIVIAL_PARTITION_KEY = "0";

  let candidate = event?.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  if (typeof candidate !== "string") candidate = JSON.stringify(candidate);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");

  return candidate || TRIVIAL_PARTITION_KEY;
}

module.exports = deterministicPartitionKey;
