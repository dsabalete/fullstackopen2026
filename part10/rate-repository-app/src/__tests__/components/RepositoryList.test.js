import { render, screen } from "@testing-library/react-native";

import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  it("renders a list of repositories", () => {
    const repositories = {
      edges: [
        {
          node: {
            id: "jaredpalmer.formik",
            fullName: "jaredpalmer/formik",
            description: "Build forms in React, without the tears",
            language: "TypeScript",
            forksCount: 3858,
            stargazersCount: 27892,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl:
              "https://avatars2.githubusercontent.com/u/4060187?v=4",
          },
        },
        {
          node: {
            id: "rails.rails",
            fullName: "rails/rails",
            description: "Ruby on Rails",
            language: "Ruby",
            forksCount: 4939,
            stargazersCount: 52894,
            ratingAverage: 73,
            reviewCount: 18,
            ownerAvatarUrl:
              "https://avatars2.githubusercontent.com/u/498507?v=4",
          },
        },
      ],
    };
    render(<RepositoryListContainer repositories={repositories} />);

    // screen.debug();

    expect(screen.getByText("jaredpalmer/formik")).toBeVisible();
    expect(
      screen.getByText("Build forms in React, without the tears"),
    ).toBeVisible();
    expect(screen.getByText("TypeScript")).toBeVisible();
    expect(screen.getByText("27.9k")).toBeVisible();
    expect(screen.getByText("3.9k")).toBeVisible();
    expect(screen.getByText("3")).toBeVisible();
    expect(screen.getByText("88")).toBeVisible();
    expect(screen.getByText("rails/rails")).toBeVisible();
    expect(screen.getByText("Ruby on Rails")).toBeVisible();
    expect(screen.getByText("Ruby")).toBeVisible();
    expect(screen.getByText("52.9k")).toBeVisible();
    expect(screen.getByText("4.9k")).toBeVisible();
    expect(screen.getByText("18")).toBeVisible();
    expect(screen.getByText("73")).toBeVisible();
  });
});
