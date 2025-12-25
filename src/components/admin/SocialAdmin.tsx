import { siteConfig } from "../../config/siteConfig";

export default function SocialAdmin() {
  const { social } = siteConfig;

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Social Links</h3>

      <input disabled value={social.instagram} className="border p-2 rounded w-full" />
      <input disabled value={social.telegram} className="border p-2 rounded w-full" />
      <input disabled value={social.youtube} className="border p-2 rounded w-full" />

      <p className="text-sm text-gray-500">
        Social links will be editable after login is added.
      </p>
    </section>
  );
}
