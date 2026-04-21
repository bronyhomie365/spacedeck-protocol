# Build Stage
FROM rust:1.80-slim as builder

WORKDIR /usr/src/app
COPY . .

# [THERMODYNAMICS]: Multi-threaded build for the Kinetic Heart
RUN cargo build --release

# Production Stage
FROM debian:bookworm-slim

WORKDIR /usr/app
COPY --from=builder /usr/src/app/target/release/spacedeck-kinetic-heart .

# Port for the High-Entropy Valve
EXPOSE 8080

CMD ["./spacedeck-kinetic-heart"]
