import { MOTOR_BASE_URL } from "@/lib/links";

export type LandingMetric = {
  value: number;
  suffix?: string;
  prefix?: string;
  formatter?: "number" | "brl" | "percent" | "months";
};

type PlatformStatsResponse = {
  counts?: {
    completed?: number;
    transactions?: number;
  };
  volume?: {
    brl?: {
      gross_completed?: number;
      gross_created?: number;
    };
  };
  revenue?: {
    brl_platform_fee_earned?: number;
    brl_platform_fee_completed?: number;
  };
};

const fallbackMetrics: LandingMetric[] = [
  { value: 954000, formatter: "brl" },
  { value: 121000, formatter: "brl" },
  { value: 1345, formatter: "number" },
  { value: 72429, formatter: "brl" },
  { value: 2, formatter: "months" },
  { value: 6753, formatter: "number" },
  { value: 48, formatter: "percent" },
  { value: 2, formatter: "number" },
  { value: 4, formatter: "number" },
  { value: 18, formatter: "number" },
];

export function getFallbackLandingMetrics() {
  return fallbackMetrics;
}

export async function fetchLandingMetrics(signal?: AbortSignal): Promise<LandingMetric[]> {
  const apiKey = import.meta.env.VITE_KAWI_MOTOR_API_KEY;
  const publicStatsUrl = import.meta.env.VITE_KAWI_MOTOR_STATS_URL;

  if (!apiKey && !publicStatsUrl) {
    return fallbackMetrics;
  }

  const [totalStats, monthlyStats] = await Promise.all([
    fetchPlatformStats({ apiKey, publicStatsUrl, signal }),
    fetchPlatformStats({ apiKey, publicStatsUrl, period: "month", signal }),
  ]);

  const totalVolume =
    totalStats.volume?.brl?.gross_completed ??
    totalStats.volume?.brl?.gross_created ??
    fallbackMetrics[0].value;
  const monthlyVolume =
    monthlyStats.volume?.brl?.gross_completed ??
    monthlyStats.volume?.brl?.gross_created ??
    fallbackMetrics[1].value;
  const completedTransactions =
    totalStats.counts?.completed ??
    totalStats.counts?.transactions ??
    fallbackMetrics[2].value;
  const totalRevenue =
    totalStats.revenue?.brl_platform_fee_earned ??
    totalStats.revenue?.brl_platform_fee_completed ??
    fallbackMetrics[3].value;

  return [
    { value: totalVolume, formatter: "brl" },
    { value: monthlyVolume, formatter: "brl" },
    { value: completedTransactions, formatter: "number" },
    { value: totalRevenue, formatter: "brl" },
    fallbackMetrics[4],
    fallbackMetrics[5],
    fallbackMetrics[6],
    fallbackMetrics[7],
    fallbackMetrics[8],
    fallbackMetrics[9],
  ];
}

async function fetchPlatformStats({
  apiKey,
  publicStatsUrl,
  period,
  signal,
}: {
  apiKey?: string;
  publicStatsUrl?: string;
  period?: string;
  signal?: AbortSignal;
}): Promise<PlatformStatsResponse> {
  const url = publicStatsUrl
    ? new URL(publicStatsUrl)
    : new URL("/api/platform/stats", MOTOR_BASE_URL);
  if (period) url.searchParams.set("period", period);

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
    headers["x-api-key"] = apiKey;
  }

  const response = await fetch(url.toString(), {
    headers,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Kawi Motor stats request failed with ${response.status}`);
  }

  return response.json();
}
