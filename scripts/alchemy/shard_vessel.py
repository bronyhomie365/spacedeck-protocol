import os
import shutil
import subprocess
import logging
from pathlib import Path

# [INSTITUTIONAL SHARDING ENGINE]: Spacedeck Protocol
# Logic: Holographic Projection of Public Shards via Deterministic Whitelisting.

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger("shard_vessel")

class ShardingEngine:
    def __init__(self, root: str, target_dir: str = "_SHARD"):
        self.root = Path(root).resolve()
        self.target = self.root / target_dir
        
        # [THE WHITELIST]: Public Frequencies approved for market manifestation
        self.whitelist = [
            "apps/web",
            "packages/sdk",
            "packages/sdk-python",
            "packages/eliza-plugin",
            "packages/zerebro-harness",
            "packages/contracts",
            "packages/schema/openapi.yaml",
            "scripts/install_spacedeck.sh",
            "docs/strategic_library/05_clarity_manifesto_and_glossary.md",
            "docs",
            "llms.txt",
            ".cursorrules",
            "README.md",
            "LICENSE",
            "package.json"
        ]
        
        # [THE BLACKLIST]: Internal Sovereignty shards (Sealed IP)
        self.blacklist = [
            "services/engine",
            "services/api",
            ".env*",
            "node_modules",
            ".git",
            ".gemini",
            ".next",
            "__pycache__",
            ".DS_Store",
            "dist",
            "target",
            "MAINNET_ENGINEERING_PLAN.md",
            "DEPLOYMENT_PLAYBOOK.md",
            "SOVEREIGN_ALCHEMY_PROTOCOL.md"
        ]

    def clear_target(self):
        if self.target.exists():
            logger.info(f"[ALCHEMY] Syncing shard vessel: {self.target}")
            # Instead of rmtree, we clear all items EXCEPT .git to preserve history
            for item in self.target.iterdir():
                if item.name == ".git":
                    continue
                if item.is_dir():
                    shutil.rmtree(item, onexc=self._remove_readonly)
                else:
                    item.unlink()
        else:
            self.target.mkdir(parents=True, exist_ok=True)

    def _remove_readonly(self, func, path, excinfo):
        """Error handler for shutil.rmtree to handle read-only files on Windows."""
        import stat
        os.chmod(path, stat.S_IWRITE)
        func(path)

    def _sanitize_file(self, file_path: Path):
        """Scrubs internal meta-directives and status blocks from public docs."""
        if file_path.suffix not in ['.md', '.txt', '.tsx', '.ts']:
            return
            
        try:
            content = file_path.read_text(encoding='utf-8')
            lines = content.splitlines()
            new_lines = []
            
            for line in lines:
                # Remove Status Blocks
                if any(x in line for x in ["📡 PHYSICAL", "🏗️ BUILD", "💎 PHASE_LOCK"]):
                    continue
                
                # Replace internal metaphors
                line = line.replace("Organism", "Protocol")
                line = line.replace("Manifesting", "Deploying")
                line = line.replace("Vessel", "Terminal") # Contextual replacement
                
                new_lines.append(line)
            
            file_path.write_text("\n".join(new_lines), encoding='utf-8')
        except Exception as e:
            logger.error(f"[ERROR] Failed to sanitize {file_path}: {e}")

    def manifest_shard(self):
        logger.info("--- [Ω-CTO]: STARTING PROFESSIONAL SHARDING ---")
        self.clear_target()
        
        for item in self.whitelist:
            source_path = self.root / item
            if not source_path.exists():
                logger.warning(f"[STOCHASTIC] Path missing from SSOT: {item}")
                continue
            
            dest_path = self.target / item
            dest_path.parent.mkdir(parents=True, exist_ok=True)
            
            if source_path.is_dir():
                logger.info(f"[SYNC] Projecting Directory: {item}")
                shutil.copytree(source_path, dest_path, ignore=shutil.ignore_patterns(*self.blacklist), dirs_exist_ok=True)
                # Recursive sanitization
                for p in dest_path.rglob("*"):
                    if p.is_file():
                        self._sanitize_file(p)
            else:
                logger.info(f"[SYNC] Projecting File: {item}")
                shutil.copy2(source_path, dest_path)
                self._sanitize_file(dest_path)
                
        logger.info(f"[Ω-CTO]: SHARDING COMPLETE. Vessel manifested at {self.target}")

    def git_init_shard(self):
        """Initializes a fresh git history in the shard for public consumption."""
        logger.info("[KINEMATICS] Initializing Public Git Manifold...")
        subprocess.run(["git", "init"], cwd=self.target)
        subprocess.run(["git", "add", "."], cwd=self.target)
        subprocess.run(["git", "commit", "-m", "chore: Spacedeck Interface Shard [AUTO]"], cwd=self.target)

if __name__ == "__main__":
    engine = ShardingEngine(root=".")
    engine.manifest_shard()
    # engine.git_init_shard() # Uncomment to finalize manifold
