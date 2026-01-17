import type { PageLoad } from "./$types";
export const load: PageLoad = async () => {
  const r1 = fetch("https://api.github.com/repos/KTibow/m3-svelte");
  const r2 = fetch("https://discord.com/api/v10/invites/sRzVYM9b47?with_counts=true");
  const { stargazers_count } = await (await r1).json();
  const { approximate_member_count } = await (await r2).json();
  return { stars: stargazers_count as number, members: approximate_member_count as number };
};
