const deterministicPartitionKey = require("./dpk");

const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("returns the partition key if it exists", () => {
    const event = { partitionKey: "123" };
    expect(deterministicPartitionKey(event)).toBe("123");
  });

  it("hashes the event if there is no partition key", () => {
    const event = { foo: "bar" };
    const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("handles non-string partition keys", () => {
    const event = { partitionKey: 123 };
    const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("truncates long partition keys", () => {
    const event = { eventType: "Test", timestamp: Date.now() };
    const longKey = "abcdefghijklmnopqrstuvwxyz".repeat(10);
    const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    const expectedKey = crypto.createHash("sha3-512").update(longKey).digest("hex");
    expect(deterministicPartitionKey({ ...event, partitionKey: longKey })).toBe(expectedKey);
    expect(deterministicPartitionKey({ ...event, partitionKey: `${longKey}x` })).toBe(hash);
  });

  it("returns the trivial partition key if there is no event", () => {
    expect(deterministicPartitionKey(null)).toBe("0");
  });
});
