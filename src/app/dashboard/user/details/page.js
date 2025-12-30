"use client";
import React from "react";
import {
  IconSeo,
  IconTrendingUp,
  IconChecklist,
  IconUser,
  IconMail,
  IconBrandGithub,
  IconCalendar,
  IconCircleCheck,
  IconClock,
  IconX,
} from "@tabler/icons-react";

const SEODetails = () => {
  /* ---------------- Dummy Stats Cards ---------------- */
  const statsCards = [
    {
      icon: <IconSeo className="h-8 w-8 text-blue-600" />,
      title: "Total SEO Projects",
      value: "24",
      description: "Active SEO campaigns",
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: <IconTrendingUp className="h-8 w-8 text-green-600" />,
      title: "Optimization Score",
      value: "87%",
      description: "Average across all projects",
      color: "bg-green-50 border-green-200",
    },
    {
      icon: <IconChecklist className="h-8 w-8 text-purple-600" />,
      title: "Issues Fixed",
      value: "156",
      description: "This month",
      color: "bg-purple-50 border-purple-200",
    },
  ];

  /* ---------------- Dummy Table Data ---------------- */
  const seoData = [
    {
      id: 1,
      user: { name: "Talha Ahmed", email: "talha@gmail.com" },
      repo_url: "https://github.com/example/seo-project",
      site_base: "https://example.com",
      status: "Completed",
      createdAt: "2025-01-12",
    },
    {
      id: 2,
      user: { name: "Ali Raza", email: "ali@gmail.com" },
      repo_url: "https://github.com/example/marketing-seo",
      site_base: "https://marketing.com",
      status: "In Progress",
      createdAt: "2025-02-03",
    },
  ];

  /* ---------------- Status Badge ---------------- */
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Completed: {
        color: "bg-green-100 text-green-800",
        icon: <IconCircleCheck className="h-4 w-4" />,
      },
      "In Progress": {
        color: "bg-blue-100 text-blue-800",
        icon: <IconClock className="h-4 w-4" />,
      },
      Failed: {
        color: "bg-red-100 text-red-800",
        icon: <IconX className="h-4 w-4" />,
      },
    };

    const config = statusConfig[status];

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Detection Details
        </h1>
        <p className="text-gray-600">
          Monitor and manage all your Detected optimization projects in one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} border rounded-xl p-6 hover:shadow-lg transition-all`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {card.title}
              </h3>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              {card.value}
            </p>
            <p className="text-sm text-gray-600">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Detection Projects List</h3>
          <p className="text-sm text-gray-500">
            All your SEO optimization projects
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["User", "Email", "Repo URL", "Site URL", "Status", "Date"].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y">
              {seoData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconUser className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {item.user.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    {/* <IconMail className="inline h-4 w-4 mr-2" /> */}
                    {item.user.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    <IconBrandGithub className="inline h-4 w-4 mr-2" />
                    {item.repo_url}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800">{item.site_base}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    <IconCalendar className="inline h-4 w-4 mr-2" />
                    {item.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 text-gray-800 text-sm">
          Showing <strong>{seoData.length}</strong> of{" "}
          <strong>{seoData.length}</strong> projects
        </div>
      </div>
    </div>
  );
};

export default SEODetails;
