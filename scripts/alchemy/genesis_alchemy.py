import os
import subprocess
from pathlib import Path

# [SOVEREIGN ALCHEMY PROTOCOL]: GENESIS ENGINE V1
# MISSION: Transmute local mess into pristine MentalOS Monorepo

class AlchemyEngine:
    def __init__(self, project_name: str, root_dir: str):
        self.project_name = project_name
        self.root = Path(root_dir)
        self.apps = self.root / "apps"
        self.services = self.root / "services"
        self.packages = self.root / "packages"

    def scaffold(self):
        print(f"[GENESIS] Igniting {self.project_name} manifold...")
        
        # Create Sephirotic Folders
        for folder in [self.apps, self.services, self.packages, self.root / "docs", self.root / "tests"]:
            folder.mkdir(parents=True, exist_ok=True)
            print(f"[SHARD] Manifested: {folder.name}")

        # [TETRYONICS]: Initialize Workspace
        self._write_file(self.root / "package.json", self._root_package_json())
        self._write_file(self.root / "turbo.json", self._turbo_json())
        
        print("[SUCCESS] Scaffolding Complete. The vessel is ready for transplantation.")

    def _write_file(self, path: Path, content: str):
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

    def _root_package_json(self):
        return """{
  "name": "@%s/root",
  "private": true,
  "workspaces": [
    "apps/*",
    "services/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}""" % self.project_name.lower()

    def _turbo_json(self):
        return """{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}"""

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="MentalOS Alchemy Engine")
    parser.add_argument("name", help="Name of the project")
    parser.add_argument("--path", default=".", help="Root path for the new production vessel")
    
    args = parser.parse_args()
    engine = AlchemyEngine(args.name, args.path)
    engine.scaffold()
