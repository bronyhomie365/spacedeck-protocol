#!/bin/bash
set -e

echo "[INIT] Bootstrapping Spacedeck Kinetic Protocol..."

# [SIMULATION LOCK PURGE]: Destroying the forced Shadow State.
# Generating physical reality configurations.

echo "[CONFIG] Writing Physical Manifest Constraints..."
cat <<EOF > apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8005
NEXT_PUBLIC_MODE=PHYSICAL_MAINNET
SPACEDECK_SIMULATION_ENABLED=false
EOF

cat <<EOF > services/api/.env
KINETIC_ENGINE_URL=http://kinetic-heart:8080
NEAR_SIGNER_ID=v1.signer.near
EOF

echo "[BUILD] Compiling the Fabric..."
docker-compose build

echo "[SUCCESS] Kinetic Pillar Stabilized. Ready for Ignition via: docker-compose up -d"
