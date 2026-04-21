export interface DeploymentFraction {
  protocolId: string;
  targetContract: string;
  allocationBps: number;
  actionType: "SUPPLY" | "STAKE" | "LP_DEPOSIT";
  calldataPayload: string;
}

export interface OmnichainKineticPayload {
  payloadId: string;
  timestamp: number;
  inboundContext: {
    originChainId: string;
    sourceCapital: { contract: string; amountRaw: string; decimals: number };
  };
  engineParameters: {
    routingRelay: string;
    arciumShieldConfig: { mxeClusterId: string; darkPoolExecution: boolean };
  };
  outboundExecutionMatrix: {
    targetChainId: string;
    expectedBlendedApy: number;
    totalSlippageToleranceBps: number;
    deploymentFractions: DeploymentFraction[];
  };
  settlementTelemetry: {
    estimatedNetworkGasUSD: number;
    projectedMevSavingsUSD: number;
    terminalSiphonFeeUSD: number;
  };
}
