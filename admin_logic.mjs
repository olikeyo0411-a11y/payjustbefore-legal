export function mergeInquiries(...groups) {
  const byId = new Map();
  for (const group of groups) {
    for (const item of group) {
      if (!byId.has(item.id)) byId.set(item.id, item);
    }
  }
  return [...byId.values()];
}

export function sortInquiries(items) {
  return [...items].sort((a, b) => {
    const statusOrder = (a.status === "open" ? 0 : 1) -
      (b.status === "open" ? 0 : 1);
    if (statusOrder !== 0) return statusOrder;
    return (b.createdAtMillis || 0) - (a.createdAtMillis || 0);
  });
}

export function canConfirmPurchase(inquiry) {
  return inquiry.kind === "purchase" &&
    typeof inquiry.uid === "string" && inquiry.uid.length > 0 &&
    typeof inquiry.historyId === "string" &&
    /^[A-Za-z0-9]{20}$/.test(inquiry.historyId);
}
