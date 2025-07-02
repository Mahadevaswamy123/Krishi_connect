export default function DashboardCard({
  title,
  description,
  linkText,
  linkHref,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-2">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      <a
        href={linkHref}
        className="text-green-600 dark:text-green-400 font-medium hover:underline"
      >
        {linkText}
      </a>
    </div>
  );
}
