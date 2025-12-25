export default function HomepageAdmin() {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Homepage Content</h3>

      <input
        disabled
        value="Our Story"
        className="border p-2 rounded w-full"
      />

      <textarea
        disabled
        value="We believe that true learning happens when you bridge the gap between theory and reality."
        className="border p-2 rounded w-full h-32"
      />

      <p className="text-sm text-gray-500">
        Homepage editing will be enabled later.
      </p>
    </section>
  );
}
