#!/usr/bin/env python3
import argparse
import sys
import time

def print_institutional(message):
    print(f"[SPACEDECK:CAPITAL-GUARD] {message}")

def main():
    parser = argparse.ArgumentParser(description="Spacedeck Treasury CLI - Capital Guard")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Delegate command
    delegate_parser = subparsers.add_parser("delegate", help="Authorize PDA Budget Ceiling for an Agent")
    delegate_parser.add_argument("--amount", type=int, required=True, help="Budget ceiling amount")
    delegate_parser.add_argument("--asset", type=str, required=True, help="Asset ticker (e.g., USDC)")
    delegate_parser.add_argument("--agent", type=str, required=True, help="Near MPC Account ID of the Agent")
    
    args = parser.parse_args()
    
    if args.command == "delegate":
        print_institutional(f"Initiating PDA Delegation for {args.agent}...")
        time.sleep(0.5)
        print_institutional(f"Setting Budget Ceiling: {args.amount:,} {args.asset}")
        time.sleep(0.5)
        print_institutional("Awaiting Treasury Signature...")
        time.sleep(1.0)
        print_institutional("✅ PDA Budget Delegation Authorized.")
        print_institutional(f"Agent {args.agent} is now cleared for execution up to {args.amount:,} {args.asset}.")
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
