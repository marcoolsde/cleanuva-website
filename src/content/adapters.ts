/**
 * "Works With Your Existing Data" (V4.1 content update, Phase C3).
 * Capability framing only. The PRIMARY units are operational-data CATEGORIES;
 * vendor names are SECONDARY examples — NOT a supported-integrations list,
 * certified-compatibility claim, or vendor partnership. Labels resolve from the
 * Platform.WorksWithData.* namespace.
 */

/** Primary: types of operational data Cleanuva is built to work with. */
export const DATA_SOURCE_CATEGORIES = ["monitoring", "csv", "inspections"] as const;

/** Secondary: example monitoring platforms (illustrative, not partnerships). */
export const VENDOR_EXAMPLES = ["solarman", "huawei", "sungrow", "sma"] as const;
