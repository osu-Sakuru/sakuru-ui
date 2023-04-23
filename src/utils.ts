export function buildIconURI(iconPath: string): string {
  return `url('${iconPath}')`;
}

export function detectMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}
