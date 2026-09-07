export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        People&apos;s Change Progress Party
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Welcome to the official website of the PCP. Explore our manifesto,
        join the movement, and support our campaign.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="/join"
          className="inline-flex items-center rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800 transition-colors"
        >
          Join the Party
        </a>
        <a
          href="/campaign"
          className="inline-flex items-center rounded-md border border-green-700 px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-700 hover:text-white transition-colors"
        >
          Support the Campaign
        </a>
        <a
          href="/contact"
          className="inline-flex items-center rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}