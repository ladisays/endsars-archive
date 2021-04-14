export const statuses = {
  DISABLED: 0,
  UNVERIFIED: 1,
  VERIFIED: 2,
  APPROVED: 3
};

export const statusTags = [
  { value: 0, label: 'Disabled', actionLabel: 'Disable' },
  { value: 1, label: 'Unverified', actionLabel: 'Unverify' },
  { value: 2, label: 'Verified', actionLabel: 'Verify' },
  { value: 3, label: 'Approved', actionLabel: 'Approve' }
];

export const getStatusTag = (status) =>
  statusTags.find((s) => s.value === status);

export const getStatusLabel = (status) => {
  const tag = getStatusTag(status);

  return tag.actionLabel;
};
