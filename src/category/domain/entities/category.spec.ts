import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Unit test", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });

    const props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    let createdAt = new Date();

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at: createdAt,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at: createdAt,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    createdAt = new Date();
    category = new Category({
      name: "Movie",
      created_at: createdAt,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at: createdAt,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
      if (i.id) {
        expect(category.id).toBe(i.id);
      }
    });
  });

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of name field", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "some description",
    });

    expect(category.description).toBe("some description");

    category = new Category({
      name: "Movie",
    });

    category["description"] = "other description";

    expect(category.description).toBe("other description");

    category["description"] = undefined;

    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });

    expect(category.is_active).toBeFalsy();

    category = new Category({
      name: "Movie",
    });

    category["is_active"] = false;

    expect(category.is_active).toBeFalsy();

    category["is_active"] = null;

    expect(category.is_active).toBeTruthy();

    category["is_active"] = undefined;

    expect(category.is_active).toBeTruthy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let createdAt = new Date();
    category = new Category({ name: "Movie", created_at: createdAt });
    expect(category.created_at).toBe(createdAt);
  });
});
